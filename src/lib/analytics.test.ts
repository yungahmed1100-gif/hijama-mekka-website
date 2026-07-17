// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { trackEvent, initClickTracking } from "./analytics";

describe("trackEvent", () => {
  afterEach(() => {
    delete window.fbq;
  });

  it("forwards the event to window.fbq when the pixel is present", () => {
    const fbq = vi.fn();
    window.fbq = fbq as unknown as typeof window.fbq;

    trackEvent("Lead", { content_name: "Test" });

    expect(fbq).toHaveBeenCalledWith("track", "Lead", { content_name: "Test" });
  });

  it("no-ops safely when the pixel is blocked", () => {
    expect(() => trackEvent("Lead")).not.toThrow();
  });
});

describe("initClickTracking", () => {
  let fbq: ReturnType<typeof vi.fn>;
  let cleanup: () => void;

  beforeEach(() => {
    fbq = vi.fn();
    window.fbq = fbq as unknown as typeof window.fbq;
    cleanup = initClickTracking();
  });

  afterEach(() => {
    cleanup();
    delete window.fbq;
    document.body.innerHTML = "";
  });

  const clickAnchor = (href: string) => {
    const a = document.createElement("a");
    a.setAttribute("href", href);
    document.body.appendChild(a);
    a.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  };

  it("classifies wa.me links as a Lead", () => {
    clickAnchor("https://wa.me/96899351374");
    expect(fbq).toHaveBeenCalledWith("track", "Lead", { content_name: "WhatsApp CTA" });
  });

  it("classifies tel: links as a Contact", () => {
    clickAnchor("tel:+96899351374");
    expect(fbq).toHaveBeenCalledWith("track", "Contact", { content_name: "Phone Call" });
  });

  it("ignores unrelated links", () => {
    clickAnchor("https://example.com");
    expect(fbq).not.toHaveBeenCalled();
  });

  it("stops tracking after cleanup", () => {
    cleanup();
    clickAnchor("tel:+96899351374");
    expect(fbq).not.toHaveBeenCalled();
  });
});
