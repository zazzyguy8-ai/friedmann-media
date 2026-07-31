export type BlocklistCategoryId =
  | "ai-chatbots"
  | "ai-search"
  | "ai-writing"
  | "ai-coding"
  | "ai-image-generation"
  | "ai-video-generation";

export interface BlocklistCategory {
  id: BlocklistCategoryId;
  label: string;
  description: string;
}

export interface BlocklistEntry {
  /** Hostname to block, e.g. "chatgpt.com". Subdomains are blocked too. */
  domain: string;
  /**
   * Optional path prefix, e.g. "/chat", used when only a section of a
   * larger multi-purpose site (not the whole domain) is the AI product.
   */
  path?: string;
  /** Human-readable site name shown on the block page and in settings. */
  name: string;
  category: BlocklistCategoryId;
}
