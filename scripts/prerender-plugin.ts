import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";
import { en } from "../src/i18n/en";
import { ur } from "../src/i18n/ur";
import type { Translations } from "../src/i18n/ar";

const SITE_URL = "https://hijamamekka.com";

const HEAD_START = "<!-- i18n:head:start -->";
const HEAD_END = "<!-- i18n:head:end -->";
const NOSCRIPT_START = "<!-- i18n:noscript:start -->";
const NOSCRIPT_END = "<!-- i18n:noscript:end -->";

type LocaleCode = "en" | "ur";

const OG_LOCALE: Record<LocaleCode, string> = {
  en: "en_US",
  ur: "ur_PK",
};

/** Minimal HTML-attribute escape for interpolated translation strings. */
function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Rebuild the language-dependent <head> region for a non-default locale. */
function buildHead(code: LocaleCode, t: Translations): string {
  const url = `${SITE_URL}/${code}`;
  const title = esc(t.seo.title);
  const description = esc(t.seo.description);

  return `${HEAD_START}
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="author" content="Mekka Hijama Clinic" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <link rel="canonical" href="${url}" />

    <link rel="alternate" hreflang="ar" href="${SITE_URL}/" />
    <link rel="alternate" hreflang="en" href="${SITE_URL}/en" />
    <link rel="alternate" hreflang="ur" href="${SITE_URL}/ur" />
    <link rel="alternate" hreflang="x-default" href="${SITE_URL}/" />
    <meta name="geo.region" content="OM" />
    <meta name="geo.placename" content="Muscat, Oman" />
    <meta name="ICBM" content="23.5880, 58.3829" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="مكة حجامة | Mekka Hijama Clinic" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${SITE_URL}/og-image.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:alt" content="مكة حجامة | Mekka Hijama Clinic — Oman" />
    <meta property="og:locale" content="${OG_LOCALE[code]}" />
    <meta property="og:locale:alternate" content="ar_OM" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${SITE_URL}/og-image.jpg" />
    ${HEAD_END}`;
}

/** Rebuild the crawlable <noscript> fallback for a non-default locale. */
function buildNoscript(t: Translations): string {
  const branchNames = t.branches.items.map((b) => esc(b.name)).join("، ");

  return `${NOSCRIPT_START}
      <main>
        <h1>${esc(t.seo.title)}</h1>
        <p>${esc(t.about.p1)}</p>
        <h2>${esc(t.benefits.title)}</h2>
        <ul>
          <li>${esc(t.trust.items[1])}</li>
          <li>${esc(t.trust.items[2])}</li>
          <li>${esc(t.trust.items[3])}</li>
        </ul>
        <h2>${esc(t.branches.title)}</h2>
        <p>${branchNames}</p>
        <p>${esc(t.contact.subtitle)} <a href="tel:+96899351374">+968 9935 1374</a>.</p>
      </main>
      ${NOSCRIPT_END}`;
}

function replaceRegion(html: string, start: string, end: string, replacement: string): string {
  const from = html.indexOf(start);
  const to = html.indexOf(end);
  if (from === -1 || to === -1) {
    throw new Error(
      `prerender: markers ${start} / ${end} not found in index.html — cannot generate localized pages`,
    );
  }
  return html.slice(0, from) + replacement + html.slice(to + end.length);
}

/**
 * Vite build plugin. After the bundle is written, copies dist/index.html into
 * dist/en/index.html and dist/ur/index.html with the <html> tag, <head> SEO
 * region and <noscript> fallback rewritten for each language. This gives
 * crawlers real localized HTML at /en and /ur without adding SSR/SSG frameworks.
 */
export function prerenderLocales(): Plugin {
  return {
    name: "prerender-locales",
    apply: "build",
    closeBundle() {
      const outDir = "dist";
      const indexPath = path.join(outDir, "index.html");
      const source = readFileSync(indexPath, "utf8");

      const locales: Array<[LocaleCode, Translations]> = [
        ["en", en],
        ["ur", ur],
      ];

      for (const [code, t] of locales) {
        let html = source.replace(
          '<html lang="ar" dir="rtl">',
          `<html lang="${code}" dir="${t.dir}">`,
        );
        html = replaceRegion(html, HEAD_START, HEAD_END, buildHead(code, t));
        html = replaceRegion(html, NOSCRIPT_START, NOSCRIPT_END, buildNoscript(t));

        const dir = path.join(outDir, code);
        mkdirSync(dir, { recursive: true });
        writeFileSync(path.join(dir, "index.html"), html, "utf8");
        console.log(`prerender: dist/${code}/index.html`);
      }
    },
  };
}
