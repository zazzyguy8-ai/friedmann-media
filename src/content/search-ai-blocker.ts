import { SEARCH_AI_SELECTORS } from "./search-selectors";
import { getSettings } from "@/utils/storage";

const HIDDEN_ATTR = "data-ai-blocker-hidden";

function applyStaticCss(selectors: string[]): void {
  if (selectors.length === 0) return;
  const style = document.createElement("style");
  style.textContent = `${selectors.join(", ")} { display: none !important; }`;
  document.documentElement.appendChild(style);
}

function hideElement(el: Element): void {
  if (el.hasAttribute(HIDDEN_ATTR)) return;
  el.setAttribute(HIDDEN_ATTR, "true");
  (el as HTMLElement).style.setProperty("display", "none", "important");
}

/** Finds AI answer panels by their marker text when a redesign outruns the selector list. */
function heuristicSweep(markers: string[]): void {
  if (markers.length === 0) return;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const seen = new Set<Element>();
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const text = node.textContent?.trim();
    if (!text || !markers.some((marker) => text.startsWith(marker))) continue;

    const container = node.parentElement?.closest("[data-hveid], [data-testid], section, div");
    if (container && !seen.has(container)) {
      seen.add(container);
      hideElement(container);
    }
  }
}

async function main(): Promise<void> {
  const config = SEARCH_AI_SELECTORS.find((entry) =>
    entry.hostnames.includes(window.location.hostname),
  );
  if (!config) return;

  const settings = await getSettings();
  if (!settings.enabled || !settings.hideSearchAiFeatures) return;

  // Inject the CSS immediately (documentElement exists at document_start) so
  // known AI panels never flash on screen; defer the DOM-walking heuristic
  // until document.body exists.
  applyStaticCss(config.selectors);

  const startSweeping = () => {
    heuristicSweep(config.markers);
    const observer = new MutationObserver(() => heuristicSweep(config.markers));
    observer.observe(document.body, { childList: true, subtree: true });
  };

  if (document.body) {
    startSweeping();
  } else {
    document.addEventListener("DOMContentLoaded", startSweeping, { once: true });
  }
}

void main();
