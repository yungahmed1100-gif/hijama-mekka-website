import { describe, it, expect } from "vitest";
import { ar } from "./ar";
import { en } from "./en";
import { ur } from "./ur";

/**
 * Returns a normalized "shape" of a value: objects become sorted key maps of
 * their nested shapes, arrays become the shape of their first element wrapped in
 * a marker, primitives collapse to their typeof. This lets us assert that two
 * translation trees are structurally identical regardless of the actual copy.
 */
type Shape = string | { [key: string]: Shape } | [Shape];

function shapeOf(value: unknown): Shape {
  if (Array.isArray(value)) {
    return [value.length > 0 ? shapeOf(value[0]) : "empty"];
  }
  if (value !== null && typeof value === "object") {
    const out: Record<string, Shape> = {};
    for (const key of Object.keys(value).sort()) {
      out[key] = shapeOf((value as Record<string, unknown>)[key]);
    }
    return out;
  }
  return typeof value;
}

describe("i18n structural parity", () => {
  it("en matches the ar source-of-truth shape", () => {
    expect(shapeOf(en)).toEqual(shapeOf(ar));
  });

  it("ur matches the ar source-of-truth shape", () => {
    expect(shapeOf(ur)).toEqual(shapeOf(ar));
  });

  it("each locale declares the correct text direction", () => {
    expect(ar.dir).toBe("rtl");
    expect(en.dir).toBe("ltr");
    expect(ur.dir).toBe("rtl");
  });

  it("each locale has the same number of branches", () => {
    expect(en.branches.items.length).toBe(ar.branches.items.length);
    expect(ur.branches.items.length).toBe(ar.branches.items.length);
  });

  it("branch phone numbers are 8 digits across every locale", () => {
    for (const locale of [ar, en, ur]) {
      for (const branch of locale.branches.items) {
        expect(branch.phone).toMatch(/^\d{8}$/);
      }
    }
  });

  it("the head-doctor phone is 8 digits across every locale", () => {
    for (const locale of [ar, en, ur]) {
      expect(locale.branchPicker.doctorPhone).toMatch(/^\d{8}$/);
    }
  });

  it("branch phone numbers are identical across locales", () => {
    const arPhones = ar.branches.items.map((b) => b.phone);
    expect(en.branches.items.map((b) => b.phone)).toEqual(arPhones);
    expect(ur.branches.items.map((b) => b.phone)).toEqual(arPhones);
  });
});
