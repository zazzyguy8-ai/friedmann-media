# AI Blocker

A Manifest V3 Chrome/Edge extension that gives users full control over AI on
the web — it blocks AI chatbots, search-engine AI features, and AI generation
tools.

## Features

- **Site blocking** — a local, categorized blocklist (chatbots, search,
  writing, coding, image generation, video generation) redirects blocked
  domains to a clean "Blocked by AI Blocker" page.
- **Search engine cleanup** — a content script hides Google AI Overview and
  Bing Copilot/AI answer panels.
- **Popup** — quick enable/disable toggle and a live blocked-sites counter.
- **Options page** — master toggle, search-AI toggle, per-category blocklist
  toggles with counts, statistics, and version info.

## Project layout

```
src/
  background/   service worker: builds & syncs declarativeNetRequest rules, message handling
  content/      content script that hides AI features on search result pages
  popup/        toolbar popup UI
  options/      full settings page
  blocklist/    structured local AI domain list, grouped by category
  utils/        chrome.storage wrapper (settings + stats)
  types/        shared TypeScript types
  shared/       constants and the shared light/dark theme stylesheet
public/         manifest.json, icons, and static HTML shells (copied as-is to dist/)
```

## Development

```bash
npm install
npm run build      # generates icons, bundles src/ + public/ into dist/
npm run watch      # rebuild on change
npm run typecheck
```

Load `dist/` as an unpacked extension at `chrome://extensions` (Developer
mode → "Load unpacked").

## How blocking works

The background service worker builds `declarativeNetRequest` redirect rules
from `src/blocklist/domains.ts`, filtered by which categories are enabled in
settings. A blocked top-level navigation is redirected to the bundled block
page, which reports the block back to the service worker to update the
statistics shown in the popup and options page.
