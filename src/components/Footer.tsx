import { useLang } from "../contexts/LanguageContext";

const WA = (
  <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-current">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.114 1.523 5.843L0 24l6.335-1.498A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.013-1.373l-.36-.213-3.731.882.93-3.634-.234-.373A9.818 9.818 0 1112 21.818z"/>
  </svg>
);

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  const links = [
    { href: "#home",     label: t.nav.home },
    { href: "#about",    label: t.nav.about },
    { href: "#benefits", label: t.nav.benefits },
    { href: "#gallery",  label: t.nav.gallery },
    { href: "#branches", label: t.nav.branches },
    { href: "#contact",  label: t.nav.contact },
  ];

  return (
    <footer className="bg-bordeaux-dark border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid md:grid-cols-3 gap-12 pb-12 border-b border-white/[0.06]">

          {/* Brand */}
          <div>
            <a href="#home" className="inline-block mb-5">
              <img src="/logo.png" alt="Mekka Hijama" className="h-14 w-auto opacity-90" />
            </a>
            <p className="text-snow/40 text-sm leading-relaxed max-w-xs mb-6">{t.footer.tagline}</p>
            <div className="flex gap-2.5">
              <a href="https://wa.me/96899351374" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/7 border border-white/10 flex items-center justify-center text-snow/60 hover:text-white hover:bg-[#25d366]/80 hover:border-[#25d366]/40 transition-all"
                aria-label="WhatsApp">
                {WA}
              </a>
              <a href="tel:+96899351374"
                className="w-9 h-9 rounded-full bg-white/7 border border-white/10 flex items-center justify-center text-snow/60 hover:text-white hover:bg-bordeaux/80 hover:border-bordeaux/50 transition-all"
                aria-label="Phone">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.5 10.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012.41 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-snow/80 font-bold text-xs uppercase tracking-widest mb-5">{t.footer.links}</h4>
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href}
                    className="text-snow/40 hover:text-gold text-sm transition-colors duration-200">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-snow/80 font-bold text-xs uppercase tracking-widest mb-5">{t.footer.contact}</h4>
            <ul className="space-y-3 text-snow/40 text-sm">
              <li>
                <a href="tel:+96899351374" className="flex items-center gap-2 hover:text-gold transition-colors">
                  <span className="text-gold text-base">📞</span>
                  +968 9935 1374
                </a>
              </li>
              <li>
                <a href="https://wa.me/96899351374" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-gold transition-colors">
                  <span className="text-gold text-base">💬</span>
                  WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold text-base mt-0.5">📍</span>
                <span>مسقط، سلطنة عُمان</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-7 text-snow/25 text-xs">
          <span>© {year} {t.footer.clinic} · {t.footer.rights}</span>
          <span className="flex items-center gap-1.5">
            <span className="text-gold text-sm">☪</span>
            علاج سنة النبي ﷺ
          </span>
        </div>
      </div>
    </footer>
  );
}
