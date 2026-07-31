import type { BlocklistCategoryId } from "./blocklist";

export interface Settings {
  /** Master switch for the whole extension. */
  enabled: boolean;
  /** Per-category toggles for the site blocklist. */
  categories: Record<BlocklistCategoryId, boolean>;
  /** Hide AI features (AI Overview, Copilot answers, etc.) on search engines. */
  hideSearchAiFeatures: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
  enabled: true,
  categories: {
    "ai-chatbots": true,
    "ai-search": true,
    "ai-writing": true,
    "ai-coding": true,
    "ai-image-generation": true,
    "ai-video-generation": true,
  },
  hideSearchAiFeatures: true,
};
