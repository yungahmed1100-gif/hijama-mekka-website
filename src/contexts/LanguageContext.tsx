import { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from "react";
import { ar } from "../i18n/ar";
import { en } from "../i18n/en";
import { ur } from "../i18n/ur";
import type { Translations } from "../i18n/ar";

type Lang = "ar" | "en" | "ur";

const translations: Record<Lang, Translations> = { ar, en, ur };

const isLang = (value: string | null): value is Lang =>
  value === "ar" || value === "en" || value === "ur";

// Each language gets its own shareable, indexable URL: Arabic at "/", English
// at "/en", Urdu at "/ur". The prerender build emits static HTML for /en and
// /ur so crawlers see localized content. Legacy "?lang=" links still resolve
// here (and are 308-redirected to the path URLs by vercel.json).
const langFromUrl = (): Lang => {
  const seg = window.location.pathname.split("/")[1];
  if (isLang(seg)) return seg;
  const param = new URLSearchParams(window.location.search).get("lang");
  return isLang(param) ? param : "ar";
};

const pathFor = (lang: Lang): string => (lang === "ar" ? "/" : `/${lang}`);

const syncUrlAndCanonical = (lang: Lang) => {
  // Move to the language's path URL, dropping any legacy ?lang= query param.
  const url = new URL(window.location.href);
  url.pathname = pathFor(lang);
  url.searchParams.delete("lang");
  window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);

  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (canonical) {
    canonical.href = `${url.origin}${pathFor(lang)}`;
  }
};

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "ar",
  setLang: () => {},
  t: ar,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(langFromUrl);

  // Keep document language, direction, URL and SEO tags in sync with the
  // active language so each locale gets its own crawlable URL, <title> and
  // description (matching the static hreflang links in index.html).
  useEffect(() => {
    const t = translations[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
    document.title = t.seo.title;

    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t.seo.description);

    syncUrlAndCanonical(lang);
  }, [lang]);

  const value = useMemo(
    () => ({ lang, setLang, t: translations[lang] }),
    [lang],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
