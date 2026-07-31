export interface Stats {
  /** Total number of times a blocked site navigation was intercepted. */
  totalBlocked: number;
  /** Per-domain block counts, keyed by registrable domain. */
  blockedByDomain: Record<string, number>;
  /** Epoch ms when the extension was first installed. */
  installedAt: number;
}

export const DEFAULT_STATS: Stats = {
  totalBlocked: 0,
  blockedByDomain: {},
  installedAt: Date.now(),
};
