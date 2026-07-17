import { OMAN_CODE } from "./constants";

/**
 * Build a wa.me deep link from a raw phone number. Strips everything that is
 * not a digit, then ensures the Oman country-code prefix so a stray space or a
 * leading +968 in the source data can't produce a broken link.
 */
export function buildWaUrl(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  const number = digits.startsWith(OMAN_CODE) ? digits : `${OMAN_CODE}${digits}`;
  return `https://wa.me/${number}`;
}
