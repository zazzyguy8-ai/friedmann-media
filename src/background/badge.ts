const BADGE_COLOR = "#4f46e5";
const BADGE_CAP = 999;

/** Formats a block count for the toolbar badge, capping display at "999+". */
export function formatBadgeText(count: number): string {
  if (count <= 0) return "";
  if (count > BADGE_CAP) return `${BADGE_CAP}+`;
  return String(count);
}

export async function updateBadge(totalBlocked: number): Promise<void> {
  await chrome.action.setBadgeText({ text: formatBadgeText(totalBlocked) });
  await chrome.action.setBadgeBackgroundColor({ color: BADGE_COLOR });
}
