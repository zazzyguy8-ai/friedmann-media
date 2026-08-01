import { describe, expect, it } from "vitest";
import { installChromeMock } from "@/test/chrome-mock";

installChromeMock();

const { buildRules, ALL_RULE_IDS, MAX_DYNAMIC_RULES } = await import("./rules");
const { BLOCKLIST } = await import("@/blocklist/domains");
const { DEFAULT_SETTINGS } = await import("@/types/settings");

describe("ALL_RULE_IDS", () => {
  it("has one unique id per blocklist entry", () => {
    expect(ALL_RULE_IDS.length).toBe(BLOCKLIST.length);
    expect(new Set(ALL_RULE_IDS).size).toBe(BLOCKLIST.length);
  });
});

describe("buildRules", () => {
  it("returns no rules when the extension is disabled", () => {
    const rules = buildRules({ ...DEFAULT_SETTINGS, enabled: false });
    expect(rules).toEqual([]);
  });

  it("returns one rule per blocklist entry when every category is enabled", () => {
    const rules = buildRules(DEFAULT_SETTINGS);
    expect(rules.length).toBe(BLOCKLIST.length);
  });

  it("only includes entries from enabled categories", () => {
    const rules = buildRules({
      ...DEFAULT_SETTINGS,
      categories: {
        "ai-chatbots": true,
        "ai-search": false,
        "ai-writing": false,
        "ai-coding": false,
        "ai-image-generation": false,
        "ai-video-generation": false,
      },
    });
    const expectedCount = BLOCKLIST.filter((e) => e.category === "ai-chatbots").length;
    expect(rules.length).toBe(expectedCount);
  });

  it("builds a domain-anchored urlFilter, scoped to a path when the entry has one", () => {
    const rules = buildRules(DEFAULT_SETTINGS);

    const chatgpt = BLOCKLIST.findIndex((e) => e.domain === "chatgpt.com");
    const chatgptRule = rules.find((r) => r.id === 1000 + chatgpt)!;
    expect(chatgptRule.condition.urlFilter).toBe("||chatgpt.com^");

    const huggingChatIndex = BLOCKLIST.findIndex((e) => e.domain === "huggingface.co");
    const huggingChatRule = rules.find((r) => r.id === 1000 + huggingChatIndex)!;
    expect(huggingChatRule.condition.urlFilter).toBe("||huggingface.co/chat");
  });

  it("redirects only main_frame navigations to the blocked page with domain + name", () => {
    const rules = buildRules(DEFAULT_SETTINGS);
    for (const rule of rules) {
      expect(rule.condition.resourceTypes).toEqual(["main_frame"]);
      expect(rule.action.type).toBe("redirect");
      expect(rule.action.redirect?.extensionPath).toMatch(/^\/blocked\/blocked\.html\?/);
    }
  });

  it("produces rule ids that are a subset of ALL_RULE_IDS", () => {
    const rules = buildRules(DEFAULT_SETTINGS);
    const allowed = new Set(ALL_RULE_IDS);
    for (const rule of rules) {
      expect(allowed.has(rule.id)).toBe(true);
    }
  });

  it("truncates instead of exceeding Chrome's dynamic rule ceiling", () => {
    const oversizedBlocklist = Array.from({ length: MAX_DYNAMIC_RULES + 50 }, (_, i) => ({
      domain: `example-${i}.test`,
      name: `Example ${i}`,
      category: "ai-chatbots" as const,
    }));

    const rules = buildRules(DEFAULT_SETTINGS, oversizedBlocklist);
    expect(rules.length).toBe(MAX_DYNAMIC_RULES);
  });
});
