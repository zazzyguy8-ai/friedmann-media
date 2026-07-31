import { BLOCKLIST_CATEGORIES } from "@/blocklist/categories";
import { BLOCKLIST } from "@/blocklist/domains";
import type { RuntimeMessage, RuntimeResponse } from "@/types/messages";
import type { Settings } from "@/types/settings";
import type { Stats } from "@/types/stats";

function sendMessage<T extends RuntimeResponse>(message: RuntimeMessage): Promise<T> {
  return chrome.runtime.sendMessage(message) as Promise<T>;
}

const enabledToggle = document.getElementById("enabled-toggle") as HTMLInputElement;
const searchAiToggle = document.getElementById("search-ai-toggle") as HTMLInputElement;
const totalBlockedEl = document.getElementById("total-blocked") as HTMLElement;
const domainsBlockedEl = document.getElementById("domains-blocked") as HTMLElement;
const installedSinceEl = document.getElementById("installed-since") as HTMLElement;
const resetStatsBtn = document.getElementById("reset-stats") as HTMLButtonElement;
const categoryListEl = document.getElementById("category-list") as HTMLElement;
const versionInfoEl = document.getElementById("version-info") as HTMLElement;

const categoryCounts = BLOCKLIST.reduce<Record<string, number>>((counts, entry) => {
  counts[entry.category] = (counts[entry.category] ?? 0) + 1;
  return counts;
}, {});

let currentSettings: Settings | null = null;

function renderStats(stats: Stats): void {
  totalBlockedEl.textContent = String(stats.totalBlocked);
  domainsBlockedEl.textContent = String(Object.keys(stats.blockedByDomain).length);
  installedSinceEl.textContent = new Date(stats.installedAt).toLocaleDateString();
}

async function updateSettings(next: Settings): Promise<void> {
  currentSettings = next;
  await sendMessage({ type: "UPDATE_SETTINGS", settings: next });
}

function renderCategories(settings: Settings): void {
  categoryListEl.innerHTML = "";
  for (const category of BLOCKLIST_CATEGORIES) {
    const item = document.createElement("li");
    item.className = "category-item";

    const info = document.createElement("div");
    const name = document.createElement("p");
    name.className = "category-name";
    name.textContent = `${category.label} (${categoryCounts[category.id] ?? 0})`;
    const desc = document.createElement("p");
    desc.className = "category-desc";
    desc.textContent = category.description;
    info.append(name, desc);

    const label = document.createElement("label");
    label.className = "switch";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = settings.categories[category.id];
    input.addEventListener("change", () => {
      if (!currentSettings) return;
      const next: Settings = {
        ...currentSettings,
        categories: {
          ...currentSettings.categories,
          [category.id]: input.checked,
        },
      };
      void updateSettings(next);
    });
    const track = document.createElement("span");
    track.className = "switch-track";
    label.append(input, track);

    item.append(info, label);
    categoryListEl.append(item);
  }
}

async function init(): Promise<void> {
  const [settingsRes, statsRes] = await Promise.all([
    sendMessage<{ ok: true; settings: Settings }>({ type: "GET_SETTINGS" }),
    sendMessage<{ ok: true; stats: Stats }>({ type: "GET_STATS" }),
  ]);

  currentSettings = settingsRes.settings;
  enabledToggle.checked = currentSettings.enabled;
  searchAiToggle.checked = currentSettings.hideSearchAiFeatures;
  renderCategories(currentSettings);
  renderStats(statsRes.stats);

  const manifest = chrome.runtime.getManifest();
  versionInfoEl.textContent = `AI Blocker v${manifest.version}`;
}

enabledToggle.addEventListener("change", () => {
  if (!currentSettings) return;
  void updateSettings({ ...currentSettings, enabled: enabledToggle.checked });
});

searchAiToggle.addEventListener("change", () => {
  if (!currentSettings) return;
  void updateSettings({ ...currentSettings, hideSearchAiFeatures: searchAiToggle.checked });
});

resetStatsBtn.addEventListener("click", () => {
  void sendMessage<{ ok: true; stats: Stats }>({ type: "RESET_STATS" }).then((res) =>
    renderStats(res.stats),
  );
});

void init();
