import { BLOCKLIST } from "@/blocklist/domains";
import { DNR_RULE_ID_BASE, BLOCKED_PAGE_PATH } from "@/shared/constants";
import type { Settings } from "@/types/settings";

function ruleIdFor(index: number): number {
  return DNR_RULE_ID_BASE + index;
}

/** Every rule id this extension could ever register, for clean removal. */
export const ALL_RULE_IDS: number[] = BLOCKLIST.map((_, index) => ruleIdFor(index));

function buildRedirectUrl(domain: string, name: string): string {
  const params = new URLSearchParams({ domain, name });
  return `/${BLOCKED_PAGE_PATH}?${params.toString()}`;
}

/** Builds the declarativeNetRequest rules that should be active for the given settings. */
export function buildRules(settings: Settings): chrome.declarativeNetRequest.Rule[] {
  if (!settings.enabled) return [];

  const rules: chrome.declarativeNetRequest.Rule[] = [];

  BLOCKLIST.forEach((entry, index) => {
    if (!settings.categories[entry.category]) return;

    const urlFilter = entry.path ? `||${entry.domain}${entry.path}` : `||${entry.domain}^`;

    rules.push({
      id: ruleIdFor(index),
      priority: 1,
      action: {
        type: chrome.declarativeNetRequest.RuleActionType.REDIRECT,
        redirect: { extensionPath: buildRedirectUrl(entry.domain, entry.name) },
      },
      condition: {
        urlFilter,
        resourceTypes: [chrome.declarativeNetRequest.ResourceType.MAIN_FRAME],
      },
    });
  });

  return rules;
}

export async function syncRules(settings: Settings): Promise<void> {
  const addRules = buildRules(settings);
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: ALL_RULE_IDS,
    addRules,
  });
}
