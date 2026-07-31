import type { Settings } from "./settings";
import type { Stats } from "./stats";

export type RuntimeMessage =
  | { type: "SITE_BLOCKED"; domain: string; url: string }
  | { type: "GET_STATS" }
  | { type: "RESET_STATS" }
  | { type: "GET_SETTINGS" }
  | { type: "UPDATE_SETTINGS"; settings: Settings };

export type RuntimeResponse =
  | { ok: true; stats: Stats }
  | { ok: true; settings: Settings }
  | { ok: true }
  | { ok: false; error: string };
