import type { RuntimeMessage, RuntimeResponse } from "@/types/messages";
import type { Settings } from "@/types/settings";

function sendMessage<T extends RuntimeResponse>(message: RuntimeMessage): Promise<T> {
  return chrome.runtime.sendMessage(message) as Promise<T>;
}

const toggle = document.getElementById("enabled-toggle") as HTMLInputElement;
const statusLine = document.getElementById("status-line") as HTMLElement;
const blockedCount = document.getElementById("blocked-count") as HTMLElement;
const openOptionsBtn = document.getElementById("open-options") as HTMLButtonElement;

function renderStatus(enabled: boolean): void {
  toggle.checked = enabled;
  statusLine.textContent = enabled ? "AI Blocker is on." : "AI Blocker is off.";
}

async function loadState(): Promise<void> {
  const [settingsRes, statsRes] = await Promise.all([
    sendMessage<{ ok: true; settings: Settings }>({ type: "GET_SETTINGS" }),
    sendMessage<{ ok: true; stats: { totalBlocked: number } }>({ type: "GET_STATS" }),
  ]);
  renderStatus(settingsRes.settings.enabled);
  blockedCount.textContent = String(statsRes.stats.totalBlocked);
}

toggle.addEventListener("change", () => {
  void (async () => {
    const { settings } = await sendMessage<{ ok: true; settings: Settings }>({
      type: "GET_SETTINGS",
    });
    const next: Settings = { ...settings, enabled: toggle.checked };
    await sendMessage({ type: "UPDATE_SETTINGS", settings: next });
    renderStatus(next.enabled);
  })();
});

openOptionsBtn.addEventListener("click", () => {
  chrome.runtime.openOptionsPage();
});

void loadState();
