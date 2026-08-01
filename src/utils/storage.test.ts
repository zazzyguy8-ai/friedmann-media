import { beforeEach, describe, expect, it } from "vitest";
import { installChromeMock } from "@/test/chrome-mock";

beforeEach(() => {
  installChromeMock();
});

const importStorage = () => import("./storage");

describe("getSettings", () => {
  it("returns defaults when nothing is stored", async () => {
    const { getSettings } = await importStorage();
    const settings = await getSettings();
    expect(settings.enabled).toBe(true);
    expect(settings.categories["ai-chatbots"]).toBe(true);
  });

  it("merges partial stored settings over the defaults instead of replacing them", async () => {
    const { getSettings, setSettings } = await importStorage();
    const current = await getSettings();
    await setSettings({
      ...current,
      enabled: false,
      categories: { ...current.categories, "ai-coding": false },
    });

    const settings = await getSettings();
    expect(settings.enabled).toBe(false);
    // Categories not explicitly disabled must survive the merge.
    expect(settings.categories["ai-coding"]).toBe(false);
    expect(settings.categories["ai-chatbots"]).toBe(true);
  });
});

describe("stats", () => {
  it("starts at zero", async () => {
    const { getStats } = await importStorage();
    const stats = await getStats();
    expect(stats.totalBlocked).toBe(0);
    expect(Object.keys(stats.blockedByDomain)).toHaveLength(0);
  });

  it("recordBlock increments the total and the per-domain count", async () => {
    const { recordBlock } = await importStorage();
    await recordBlock("chatgpt.com");
    const stats = await recordBlock("chatgpt.com");
    expect(stats.totalBlocked).toBe(2);
    expect(stats.blockedByDomain["chatgpt.com"]).toBe(2);
  });

  it("tracks distinct domains independently", async () => {
    const { recordBlock } = await importStorage();
    await recordBlock("chatgpt.com");
    const stats = await recordBlock("claude.ai");
    expect(stats.totalBlocked).toBe(2);
    expect(stats.blockedByDomain["chatgpt.com"]).toBe(1);
    expect(stats.blockedByDomain["claude.ai"]).toBe(1);
  });

  it("resetStats zeroes counts but refreshes installedAt", async () => {
    const { recordBlock, resetStats, getStats } = await importStorage();
    await recordBlock("chatgpt.com");
    const before = await getStats();

    const reset = await resetStats();
    expect(reset.totalBlocked).toBe(0);
    expect(Object.keys(reset.blockedByDomain)).toHaveLength(0);
    expect(reset.installedAt).toBeGreaterThanOrEqual(before.installedAt);
  });
});

describe("onSettingsChanged", () => {
  it("fires with the freshly merged settings when settings are written", async () => {
    const { onSettingsChanged, getSettings, setSettings } = await importStorage();

    let received: Awaited<ReturnType<typeof getSettings>> | undefined;
    onSettingsChanged((settings) => {
      received = settings;
    });

    const current = await getSettings();
    await setSettings({ ...current, enabled: false });
    // storage.onChanged listeners run synchronously in the mock, but
    // onSettingsChanged re-reads via a promise, so flush microtasks.
    await Promise.resolve();
    await Promise.resolve();

    expect(received?.enabled).toBe(false);
  });

  it("ignores writes to unrelated storage keys", async () => {
    const { onSettingsChanged } = await importStorage();
    let calls = 0;
    onSettingsChanged(() => {
      calls += 1;
    });

    await chrome.storage.local.set({ "some.other.key": 1 });
    await Promise.resolve();

    expect(calls).toBe(0);
  });
});
