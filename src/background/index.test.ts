import { beforeEach, describe, expect, it, vi } from "vitest";
import { installChromeMock } from "@/test/chrome-mock";

async function loadBackground() {
  vi.resetModules();
  const mock = installChromeMock();
  await import("./index");
  // Flush the async init() kicked off by module load.
  await new Promise((resolve) => setTimeout(resolve, 0));
  await new Promise((resolve) => setTimeout(resolve, 0));
  return mock;
}

describe("background entrypoint", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("leaves the badge clear on load when there are no prior stats", async () => {
    const mock = await loadBackground();
    expect(mock.badge.text).toBe("");
  });

  it("opens the options page on first install, not on update", async () => {
    const mock = await loadBackground();

    mock.onInstalled.dispatch({ reason: "install" } as chrome.runtime.InstalledDetails);
    expect(mock.openOptionsPageCalls.count).toBe(1);

    mock.onInstalled.dispatch({ reason: "update" } as chrome.runtime.InstalledDetails);
    expect(mock.openOptionsPageCalls.count).toBe(1);
  });

  it("answers GET_SETTINGS over the message port", async () => {
    const mock = await loadBackground();

    const response = await new Promise((resolve) => {
      mock.onMessage.dispatch(
        { type: "GET_SETTINGS" },
        {} as chrome.runtime.MessageSender,
        resolve,
      );
    });

    expect(response).toMatchObject({ ok: true, settings: { enabled: true } });
  });

  it("records a block, updates the badge, and answers with fresh stats", async () => {
    const mock = await loadBackground();

    const response = await new Promise((resolve) => {
      mock.onMessage.dispatch(
        { type: "SITE_BLOCKED", domain: "chatgpt.com", url: "https://chatgpt.com/" },
        {} as chrome.runtime.MessageSender,
        resolve,
      );
    });

    expect(response).toMatchObject({ ok: true, stats: { totalBlocked: 1 } });
    expect(mock.badge.text).toBe("1");
  });

  it("re-syncs rules when settings are updated through the message port", async () => {
    const mock = await loadBackground();

    const response = await new Promise((resolve) => {
      mock.onMessage.dispatch(
        {
          type: "UPDATE_SETTINGS",
          settings: {
            enabled: false,
            categories: {
              "ai-chatbots": true,
              "ai-search": true,
              "ai-writing": true,
              "ai-coding": true,
              "ai-image-generation": true,
              "ai-video-generation": true,
            },
            hideSearchAiFeatures: true,
          },
        },
        {} as chrome.runtime.MessageSender,
        resolve,
      );
    });

    expect(response).toEqual({ ok: true });

    const settingsResponse = await new Promise((resolve) => {
      mock.onMessage.dispatch(
        { type: "GET_SETTINGS" },
        {} as chrome.runtime.MessageSender,
        resolve,
      );
    });
    expect(settingsResponse).toMatchObject({ ok: true, settings: { enabled: false } });
  });
});
