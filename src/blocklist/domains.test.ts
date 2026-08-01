import { describe, expect, it } from "vitest";
import { BLOCKLIST } from "./domains";
import { BLOCKLIST_CATEGORIES } from "./categories";

const knownCategoryIds = new Set(BLOCKLIST_CATEGORIES.map((c) => c.id));
const HOSTNAME_RE = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/;

describe("BLOCKLIST", () => {
  it("is non-trivially sized", () => {
    expect(BLOCKLIST.length).toBeGreaterThanOrEqual(50);
  });

  it("only references known categories", () => {
    for (const entry of BLOCKLIST) {
      expect(knownCategoryIds.has(entry.category), `${entry.domain} has unknown category`).toBe(
        true,
      );
    }
  });

  it("has no duplicate domain+path entries", () => {
    const seen = new Set<string>();
    for (const entry of BLOCKLIST) {
      const key = `${entry.domain}${entry.path ?? ""}`;
      expect(seen.has(key), `duplicate blocklist entry: ${key}`).toBe(false);
      seen.add(key);
    }
  });

  it("uses well-formed hostnames", () => {
    for (const entry of BLOCKLIST) {
      expect(HOSTNAME_RE.test(entry.domain), `not a valid hostname: ${entry.domain}`).toBe(true);
    }
  });

  it("gives every entry a non-empty display name", () => {
    for (const entry of BLOCKLIST) {
      expect(entry.name.trim().length).toBeGreaterThan(0);
    }
  });

  it("every category has at least one entry", () => {
    for (const category of BLOCKLIST_CATEGORIES) {
      const count = BLOCKLIST.filter((e) => e.category === category.id).length;
      expect(count, `category ${category.id} has no blocklist entries`).toBeGreaterThan(0);
    }
  });
});
