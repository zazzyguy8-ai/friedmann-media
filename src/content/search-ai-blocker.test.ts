// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { installChromeMock } from "@/test/chrome-mock";
import { STORAGE_KEYS } from "@/shared/constants";
import { DEFAULT_SETTINGS } from "@/types/settings";

function renderSearchResultsPage(): void {
  document.body.innerHTML = `
    <div id="answer-box"><span>AI Overview</span><p>Generated summary text.</p></div>
    <div id="organic-result">A normal, human-written search result.</div>
  `;
}

async function flush(times = 3): Promise<void> {
  for (let i = 0; i < times; i++) {
    await Promise.resolve();
  }
}

interface ContentScriptModule {
  disable: () => void;
}

let activeModule: ContentScriptModule | undefined;

async function loadContentScript(): Promise<ContentScriptModule> {
  vi.resetModules();
  activeModule = await import("./search-ai-blocker");
  return activeModule;
}

describe("search-ai-blocker content script", () => {
  beforeEach(() => {
    renderSearchResultsPage();
  });

  afterEach(() => {
    // Disconnect this test's MutationObserver so it can't fire against the
    // next test's DOM once beforeEach mutates document.body again.
    activeModule?.disable();
    activeModule = undefined;
  });

  it("hides the AI Overview panel but leaves organic results alone", async () => {
    installChromeMock();
    await loadContentScript();
    await flush();

    expect(getComputedStyle(document.getElementById("answer-box")!).display).toBe("none");
    expect(getComputedStyle(document.getElementById("organic-result")!).display).not.toBe("none");
  });

  it("does nothing when hideSearchAiFeatures is off", async () => {
    installChromeMock();
    await chrome.storage.local.set({
      [STORAGE_KEYS.settings]: { ...DEFAULT_SETTINGS, hideSearchAiFeatures: false },
    });
    await loadContentScript();
    await flush();

    expect(getComputedStyle(document.getElementById("answer-box")!).display).not.toBe("none");
  });

  it("un-hides the panel immediately when the setting is turned off, without a reload", async () => {
    installChromeMock();
    await loadContentScript();
    await flush();
    expect(getComputedStyle(document.getElementById("answer-box")!).display).toBe("none");

    await chrome.storage.local.set({
      [STORAGE_KEYS.settings]: { ...DEFAULT_SETTINGS, hideSearchAiFeatures: false },
    });
    await flush();

    expect(getComputedStyle(document.getElementById("answer-box")!).display).not.toBe("none");
  });

  it("starts hiding once the setting is turned back on", async () => {
    installChromeMock();
    await chrome.storage.local.set({
      [STORAGE_KEYS.settings]: { ...DEFAULT_SETTINGS, hideSearchAiFeatures: false },
    });
    await loadContentScript();
    await flush();
    expect(getComputedStyle(document.getElementById("answer-box")!).display).not.toBe("none");

    await chrome.storage.local.set({
      [STORAGE_KEYS.settings]: { ...DEFAULT_SETTINGS, hideSearchAiFeatures: true },
    });
    await flush();

    expect(getComputedStyle(document.getElementById("answer-box")!).display).toBe("none");
  });
});
