import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { useBranchPicker } from "../contexts/BranchPickerContext";

const WA_ICON = (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.114 1.523 5.843L0 24l6.335-1.498A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.013-1.373l-.36-.213-3.731.882.93-3.634-.234-.373A9.818 9.818 0 1112 21.818z"/>
  </svg>
);

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

  const links = [
    { href: "#home",     label: t.nav.home },
    { href: "#about",    label: t.nav.about },
    { href: "#benefits", label: t.nav.benefits },
    { href: "#gallery",  label: t.nav.gallery },
    { href: "#branches", label: t.nav.branches },
    { href: "#contact",  label: t.nav.contact },
  ];

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
            {WA_ICON}
            {t.nav.book}
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-white/8 border border-white/12 text-snow hover:bg-white/14 transition-all"
            aria-label="Menu"
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
