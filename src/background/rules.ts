import { BLOCKLIST } from "@/blocklist/domains";
import { DNR_RULE_ID_BASE, BLOCKED_PAGE_PATH } from "@/shared/constants";
import type { BlocklistEntry } from "@/types/blocklist";
import type { Settings } from "@/types/settings";

/**
 * Chrome's ceiling on dynamic declarativeNetRequest rules. The blocklist
 * (currently ~70 entries) is nowhere near this, but v1.1's planned remote
 * blocklist sync could grow it a lot — guard against ever silently exceeding
 * the API limit instead of finding out via a rejected updateDynamicRules call.
 */
export const MAX_DYNAMIC_RULES = 5000;

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
export function buildRules(
  settings: Settings,
  blocklist: BlocklistEntry[] = BLOCKLIST,
): chrome.declarativeNetRequest.Rule[] {
  if (!settings.enabled) return [];

  const rules: chrome.declarativeNetRequest.Rule[] = [];

  blocklist.forEach((entry, index) => {
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

  if (rules.length > MAX_DYNAMIC_RULES) {
    console.error(
      `AI Blocker: blocklist produced ${rules.length} rules, above the ${MAX_DYNAMIC_RULES} ` +
        "dynamic rule limit — truncating. Some sites will not be blocked.",
    );
    return rules.slice(0, MAX_DYNAMIC_RULES);
  }

  return rules;
}

export async function syncRules(settings: Settings): Promise<void> {
  const addRules = buildRules(settings);
  try {
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: ALL_RULE_IDS,
      addRules,
    });
  } catch (error) {
    console.error("AI Blocker: failed to sync blocking rules", error);
  }
}
