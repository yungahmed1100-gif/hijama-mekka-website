// Site-wide constants. Centralized so the phone number, social links and
// section list have a single source of truth instead of being repeated across
// components.

export const SITE_URL = "https://hijamamekka.com";

/** Oman international dialling code, used to normalize WhatsApp links. */
export const OMAN_CODE = "968";

/** Head-doctor line, shown in the header/footer tel: links. */
export const PHONE_MAIN = "+96899351374";
export const PHONE_MAIN_DISPLAY = "+968 9935 1374";

export const INSTAGRAM_URL = "https://instagram.com/makkah_cupping";

/**
 * In-page section ids, in navigation order. Labels are resolved per-language
 * from `t.nav`, so both the navbar and footer derive their links from this
 * single list.
 */
export const NAV_SECTIONS = [
  "home",
  "about",
  "benefits",
  "gallery",
  "branches",
  "contact",
] as const;

export type NavSection = (typeof NAV_SECTIONS)[number];
