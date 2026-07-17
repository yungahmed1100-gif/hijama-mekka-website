import { describe, it, expect } from "vitest";
import { buildWaUrl } from "./whatsapp";

describe("buildWaUrl", () => {
  it("prefixes an 8-digit local number with the Oman country code", () => {
    expect(buildWaUrl("99351374")).toBe("https://wa.me/96899351374");
  });

  it("keeps a number that already includes the country code", () => {
    expect(buildWaUrl("96899351374")).toBe("https://wa.me/96899351374");
  });

  it("strips spaces, plus signs and other separators", () => {
    expect(buildWaUrl("+968 9935 1374")).toBe("https://wa.me/96899351374");
    expect(buildWaUrl("968-9935-1374")).toBe("https://wa.me/96899351374");
  });
});
