import {
  getSettings,
  getStats,
  onSettingsChanged,
  recordBlock,
  resetStats,
  setSettings,
} from "@/utils/storage";
import { syncRules } from "./rules";
import type { RuntimeMessage, RuntimeResponse } from "@/types/messages";

async function init(): Promise<void> {
  const settings = await getSettings();
  await syncRules(settings);
}

chrome.runtime.onInstalled.addListener(() => {
  void init();
});

chrome.runtime.onStartup.addListener(() => {
  void init();
});

onSettingsChanged((settings) => {
  void syncRules(settings);
});

function handleMessage(
  message: RuntimeMessage,
  sendResponse: (response: RuntimeResponse) => void,
): void {
  switch (message.type) {
    case "SITE_BLOCKED":
      void recordBlock(message.domain).then((stats) => sendResponse({ ok: true, stats }));
      return;
    case "GET_STATS":
      void getStats().then((stats) => sendResponse({ ok: true, stats }));
      return;
    case "RESET_STATS":
      void resetStats().then((stats) => sendResponse({ ok: true, stats }));
      return;
    case "GET_SETTINGS":
      void getSettings().then((settings) => sendResponse({ ok: true, settings }));
      return;
    case "UPDATE_SETTINGS":
      void setSettings(message.settings)
        .then(() => syncRules(message.settings))
        .then(() => sendResponse({ ok: true }));
      return;
  }
}

chrome.runtime.onMessage.addListener((message: RuntimeMessage, _sender, sendResponse) => {
  handleMessage(message, sendResponse);
  return true;
});
