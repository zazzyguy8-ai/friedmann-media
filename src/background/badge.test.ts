import { describe, expect, it } from "vitest";
import { formatBadgeText } from "./badge";

describe("formatBadgeText", () => {
  it("shows nothing at zero", () => {
    expect(formatBadgeText(0)).toBe("");
  });

  it("shows nothing for a negative count", () => {
    expect(formatBadgeText(-1)).toBe("");
  });

  it("shows the exact count under the cap", () => {
    expect(formatBadgeText(1)).toBe("1");
    expect(formatBadgeText(42)).toBe("42");
    expect(formatBadgeText(999)).toBe("999");
  });

  it("caps display at 999+", () => {
    expect(formatBadgeText(1000)).toBe("999+");
    expect(formatBadgeText(1_000_000)).toBe("999+");
  });
});
