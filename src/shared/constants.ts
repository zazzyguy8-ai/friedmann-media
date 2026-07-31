export const STORAGE_KEYS = {
  settings: "aiBlocker.settings",
  stats: "aiBlocker.stats",
} as const;

export const BLOCKED_PAGE_PATH = "blocked/blocked.html";

/** Base rule id offset for dynamic declarativeNetRequest blocklist rules. */
export const DNR_RULE_ID_BASE = 1000;
