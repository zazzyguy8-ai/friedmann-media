import type { RuntimeMessage } from "@/types/messages";

const params = new URLSearchParams(window.location.search);
const domain = params.get("domain") ?? "";
const name = params.get("name") ?? "";

const siteNameEl = document.getElementById("site-name");
const siteDomainEl = document.getElementById("site-domain");

if (siteNameEl) siteNameEl.textContent = name || domain || "this site";
if (siteDomainEl) siteDomainEl.textContent = domain;

if (domain) {
  const message: RuntimeMessage = { type: "SITE_BLOCKED", domain, url: window.location.href };
  void chrome.runtime.sendMessage(message);
}

document.getElementById("go-back")?.addEventListener("click", () => {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.close();
  }
});

document.getElementById("open-settings")?.addEventListener("click", () => {
  chrome.runtime.openOptionsPage();
});
