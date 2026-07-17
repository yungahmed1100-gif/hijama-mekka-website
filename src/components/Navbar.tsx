import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { useBranchPicker } from "../contexts/BranchPickerContext";
import { NAV_SECTIONS } from "../lib/constants";
import WhatsAppIcon from "./icons/WhatsAppIcon";

export default function Navbar() {
  const { t, lang, setLang } = useLang();
  const { open } = useBranchPicker();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = NAV_SECTIONS.map((id) => ({ href: `#${id}`, label: t.nav[id] }));

  const langs: Array<{ code: "ar" | "en" | "ur"; label: string }> = [
    { code: "ar", label: "ع" },
    { code: "en", label: "EN" },
    { code: "ur", label: "اردو" },
  ];

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
      scrolled
        ? "bg-bordeaux-dark/95 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06),0_8px_32px_rgba(76,4,26,0.35)]"
        : "bg-transparent"
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between gap-4">

        {/* Logo */}
        <a href="#home" className="shrink-0 relative group">
          <div className="absolute -inset-2 rounded-xl bg-gold/0 group-hover:bg-gold/8 transition-all duration-300 blur-sm" />
          <img src="/logo.png" alt="Mekka Hijama" className="relative h-10 w-auto" />
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-0.5">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setActive(l.href)}
                className={`relative px-3.5 py-2 text-[13px] font-semibold rounded-lg transition-all duration-200 ${
                  active === l.href
                    ? "text-gold"
                    : "text-snow/65 hover:text-snow/90 hover:bg-white/6"
                }`}
              >
                {active === l.href && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold" />
                )}
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Lang switcher */}
          <div className="hidden sm:flex items-center gap-0.5 rounded-full bg-white/7 border border-white/10 p-1">
            {langs.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                className={`px-3 py-[5px] text-[11px] font-bold rounded-full transition-all duration-200 ${
                  lang === code
                    ? "bg-gold text-bordeaux-dark shadow-sm"
                    : "text-snow/55 hover:text-snow/80"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Book CTA */}
          <button
            type="button"
            onClick={open}
            className="hidden sm:inline-flex btn-gold gap-1.5 px-4 py-2 text-xs"
          >
            <WhatsAppIcon className="w-4 h-4 fill-current shrink-0" />
            {t.nav.book}
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-white/8 border border-white/12 text-snow hover:bg-white/14 transition-all"
            aria-label={t.nav.menuLabel}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden bg-bordeaux-dark/97 backdrop-blur-xl border-t border-white/6 ${
        menuOpen ? "max-h-[520px]" : "max-h-0"
      }`}>
        <div className="px-4 pt-2 pb-6 space-y-0.5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => { setMenuOpen(false); setActive(l.href); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                active === l.href
                  ? "bg-bordeaux/60 text-gold"
                  : "text-snow/65 hover:text-snow hover:bg-white/6"
              }`}
            >
              {active === l.href && (
                <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
              )}
              {l.label}
            </a>
          ))}
          <div className="flex gap-2 px-4 pt-3">
            {langs.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                  lang === code
                    ? "bg-gold text-bordeaux-dark"
                    : "bg-white/8 text-snow/55 hover:text-snow"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="px-4 pt-2">
            <button
              type="button"
              onClick={() => { setMenuOpen(false); open(); }}
              className="flex w-full items-center justify-center btn-whatsapp"
            >
              {t.nav.book}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
