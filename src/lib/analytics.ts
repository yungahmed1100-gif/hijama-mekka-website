// Meta Pixel event tracking. The base pixel (init + PageView) is loaded in
// index.html; this module fires conversion events for the site's CTAs.

type FbqParams = Record<string, string | number | boolean>;
type Fbq = (command: "track" | "trackCustom", event: string, params?: FbqParams) => void;

declare global {
  interface Window {
    fbq?: Fbq;
  }
}

/** Fire a standard Meta Pixel event; no-ops safely if the pixel is blocked. */
export function trackEvent(event: string, params?: FbqParams): void {
  window.fbq?.("track", event, params);
}

/**
 * Delegated click tracking for the whole document. Phone-number (`tel:`) clicks
 * count as Contact; any stray WhatsApp link counts as a Lead. The primary
 * WhatsApp flow fires its own per-branch Lead event from the branch picker
 * modal, so it is not handled here. Returns a cleanup function.
 */
export function initClickTracking(): () => void {
  const onClick = (e: MouseEvent) => {
    const link = (e.target as HTMLElement | null)?.closest("a");
    if (!link) return;

    const href = link.getAttribute("href") ?? "";

    if (href.includes("wa.me") || href.includes("whatsapp")) {
      trackEvent("Lead", { content_name: "WhatsApp CTA" });
    } else if (href.startsWith("tel:")) {
      trackEvent("Contact", { content_name: "Phone Call" });
    }
  };

  document.addEventListener("click", onClick);
  return () => document.removeEventListener("click", onClick);
}
