/**
 * Best-effort hooks for AI features on search engine result pages. Search
 * engines change markup often, so this list combines targeted CSS selectors
 * with text markers used as a heuristic fallback — update both when a
 * redesign slips past the selectors.
 */
export interface SearchAiSelectors {
  hostnames: string[];
  /** CSS selectors known to target AI-generated answer containers. */
  selectors: string[];
  /** Marker phrases used to find AI panels the selectors miss. */
  markers: string[];
}

export const SEARCH_AI_SELECTORS: SearchAiSelectors[] = [
  {
    hostnames: ["www.google.com", "google.com"],
    selectors: [
      'div[data-attrid="AIOverview"]',
      "#Odp5De",
      "div.M8OgIe",
      "div.RTaUke",
      'g-accordion-expander[jsname="rTGpce"]',
    ],
    markers: ["AI Overview", "Generative AI is experimental"],
  },
  {
    hostnames: ["www.bing.com", "bing.com"],
    selectors: [
      "#b_topAnswerCopilot",
      ".cib-serp-main",
      "#cib_scope_maincontent",
      'div[data-testid="copilot-answer-card"]',
    ],
    markers: ["Copilot answer"],
  },
];
