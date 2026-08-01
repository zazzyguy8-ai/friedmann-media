/** Minimal in-memory chrome.* mock covering only what this codebase calls. */

type Listener<T extends unknown[]> = (...args: T) => void;

function fakeEvent<T extends unknown[]>() {
  const listeners: Listener<T>[] = [];
  return {
    addListener: (listener: Listener<T>) => {
      listeners.push(listener);
    },
    dispatch: (...args: T) => {
      for (const listener of listeners) listener(...args);
    },
  };
}

export function installChromeMock() {
  const store: Record<string, unknown> = {};
  const storageChanged = fakeEvent<[Record<string, chrome.storage.StorageChange>, string]>();
  const onInstalled = fakeEvent<[chrome.runtime.InstalledDetails]>();
  const onStartup = fakeEvent<[]>();
  const onMessage =
    fakeEvent<[RuntimeMessageLike, chrome.runtime.MessageSender, (response: unknown) => void]>();

  const badge = { text: "", color: "" };
  const openOptionsPage = () => {
    openOptionsPageCalls.count += 1;
  };
  const openOptionsPageCalls = { count: 0 };

  const mock = {
    storage: {
      local: {
        get: (key: string) => Promise.resolve(key in store ? { [key]: store[key] } : {}),
        set: (items: Record<string, unknown>) => {
          for (const [key, value] of Object.entries(items)) {
            const oldValue = store[key];
            store[key] = value;
            storageChanged.dispatch({ [key]: { oldValue, newValue: value } }, "local");
          }
          return Promise.resolve();
        },
      },
      onChanged: storageChanged,
    },
    declarativeNetRequest: {
      RuleActionType: { REDIRECT: "redirect" },
      ResourceType: { MAIN_FRAME: "main_frame" },
      updateDynamicRules: () => Promise.resolve(),
    },
    action: {
      setBadgeText: ({ text }: { text: string }) => {
        badge.text = text;
        return Promise.resolve();
      },
      setBadgeBackgroundColor: ({ color }: { color: string }) => {
        badge.color = color;
        return Promise.resolve();
      },
    },
    runtime: {
      getManifest: () => ({ version: "0.0.0-test" }),
      openOptionsPage,
      onInstalled,
      onStartup,
      onMessage,
    },
  };

  globalThis.chrome = mock as unknown as typeof chrome;

  return { store, badge, onInstalled, onStartup, onMessage, openOptionsPageCalls };
}

// Structural stand-in for this codebase's RuntimeMessage union, kept local so
// the test mock doesn't need to import application types.
type RuntimeMessageLike = { type: string; [key: string]: unknown };
