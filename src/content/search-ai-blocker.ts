import { SEARCH_AI_SELECTORS, type SearchAiSelectors } from "./search-selectors";
import { getSettings, onSettingsChanged } from "@/utils/storage";
import type { Settings } from "@/types/settings";

const HIDDEN_ATTR = "data-ai-blocker-hidden";
const STYLE_ID = "ai-blocker-search-css";

let observer: MutationObserver | null = null;

function shouldRun(settings: Settings): boolean {
  return settings.enabled && settings.hideSearchAiFeatures;
}

function applyStaticCss(selectors: string[]): void {
  if (selectors.length === 0 || document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `${selectors.join(", ")} { display: none !important; }`;
  document.documentElement.appendChild(style);
}

function removeStaticCss(): void {
  document.getElementById(STYLE_ID)?.remove();
}

function hideElement(el: Element): void {
  if (el.hasAttribute(HIDDEN_ATTR)) return;
  el.setAttribute(HIDDEN_ATTR, "true");
  (el as HTMLElement).style.setProperty("display", "none", "important");
}

function unhideAll(): void {
  document.querySelectorAll(`[${HIDDEN_ATTR}]`).forEach((el) => {
    el.removeAttribute(HIDDEN_ATTR);
    (el as HTMLElement).style.removeProperty("display");
  });
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

function startSweeping(config: SearchAiSelectors): void {
  if (observer) return;
  heuristicSweep(config.markers);
  observer = new MutationObserver(() => heuristicSweep(config.markers));
  observer.observe(document.body, { childList: true, subtree: true });
}

function stopSweeping(): void {
  observer?.disconnect();
  observer = null;
}

function enable(config: SearchAiSelectors): void {
  // Inject the CSS immediately (documentElement exists at document_start) so
  // known AI panels never flash on screen; defer the DOM-walking heuristic
  // until document.body exists.
  applyStaticCss(config.selectors);

  if (document.body) {
    startSweeping(config);
  } else {
    document.addEventListener("DOMContentLoaded", () => startSweeping(config), { once: true });
  }
}

/** Stops hiding and reverts the page. Exported so tests can tear down cleanly. */
export function disable(): void {
  removeStaticCss();
  stopSweeping();
  unhideAll();
}

async function main(): Promise<void> {
  const config = SEARCH_AI_SELECTORS.find((entry) =>
    entry.hostnames.includes(window.location.hostname),
  );
  if (!config) return;

  const settings = await getSettings();
  if (shouldRun(settings)) enable(config);

  // React to the setting being flipped without requiring a page reload.
  onSettingsChanged((next) => {
    if (shouldRun(next)) enable(config);
    else disable();
  });
}

void main();
