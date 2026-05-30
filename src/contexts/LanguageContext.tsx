import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { ar } from "../i18n/ar";
import { en } from "../i18n/en";
import { ur } from "../i18n/ur";
import type { Translations } from "../i18n/ar";

type Lang = "ar" | "en" | "ur";

const translations: Record<Lang, Translations> = { ar, en, ur };

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
  const [lang, setLangState] = useState<Lang>("ar");

  const setLang = (l: Lang) => {
    setLangState(l);
    document.documentElement.lang = l;
    document.documentElement.dir = translations[l].dir;
  };

  useEffect(() => {
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
