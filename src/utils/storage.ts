import { STORAGE_KEYS } from "@/shared/constants";
import { DEFAULT_SETTINGS, type Settings } from "@/types/settings";
import { DEFAULT_STATS, type Stats } from "@/types/stats";

async function get<T>(key: string, fallback: T): Promise<T> {
  const result = await chrome.storage.local.get(key);
  return (result[key] as T | undefined) ?? fallback;
}

async function set(key: string, value: unknown): Promise<void> {
  await chrome.storage.local.set({ [key]: value });
}

export async function getSettings(): Promise<Settings> {
  const stored = await get<Partial<Settings>>(STORAGE_KEYS.settings, {});
  return {
    ...DEFAULT_SETTINGS,
    ...stored,
    categories: { ...DEFAULT_SETTINGS.categories, ...stored.categories },
  };
}

export async function setSettings(settings: Settings): Promise<void> {
  await set(STORAGE_KEYS.settings, settings);
}

export async function getStats(): Promise<Stats> {
  return get<Stats>(STORAGE_KEYS.stats, DEFAULT_STATS);
}

export async function setStats(stats: Stats): Promise<void> {
  await set(STORAGE_KEYS.stats, stats);
}

export async function recordBlock(domain: string): Promise<Stats> {
  const stats = await getStats();
  const next: Stats = {
    ...stats,
    totalBlocked: stats.totalBlocked + 1,
    blockedByDomain: {
      ...stats.blockedByDomain,
      [domain]: (stats.blockedByDomain[domain] ?? 0) + 1,
    },
  };
  await setStats(next);
  return next;
}

export async function resetStats(): Promise<Stats> {
  const fresh: Stats = { ...DEFAULT_STATS, installedAt: Date.now() };
  await setStats(fresh);
  return fresh;
}

export function onSettingsChanged(callback: (settings: Settings) => void): void {
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== "local" || !changes[STORAGE_KEYS.settings]) return;
    void getSettings().then(callback);
  });
}
