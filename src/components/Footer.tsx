import { useLang } from "../contexts/LanguageContext";
import { useBranchPicker } from "../contexts/BranchPickerContext";
import { INSTAGRAM_URL, PHONE_MAIN, PHONE_MAIN_DISPLAY, NAV_SECTIONS } from "../lib/constants";
import WhatsAppIcon from "./icons/WhatsAppIcon";

const IG = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function Footer() {
  const { t } = useLang();
  const { open } = useBranchPicker();
  const year = new Date().getFullYear();

  const links = NAV_SECTIONS.map((id) => ({ href: `#${id}`, label: t.nav[id] }));

  return (
    <footer className="bg-bordeaux-dark border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid md:grid-cols-3 gap-12 pb-12 border-b border-white/[0.06]">

          {/* Brand */}
          <div>
            <a href="#home" className="inline-block mb-5">
              <img src="/logo.png" alt="Mekka Hijama" className="h-14 w-auto opacity-90" />
            </a>
            <p className="text-snow/60 text-sm leading-relaxed max-w-xs mb-6">{t.footer.tagline}</p>
            <div className="flex gap-2.5">
              <button type="button" onClick={open}
                className="w-9 h-9 rounded-full bg-white/7 border border-white/10 flex items-center justify-center text-snow/60 hover:text-white hover:bg-[#25d366]/80 hover:border-[#25d366]/40 transition-all"
                aria-label={t.contact.whatsappLabel}>
                <WhatsAppIcon className="w-4.5 h-4.5 fill-current" />
              </button>
              <a href={`tel:${PHONE_MAIN}`}
                className="w-9 h-9 rounded-full bg-white/7 border border-white/10 flex items-center justify-center text-snow/60 hover:text-white hover:bg-bordeaux/80 hover:border-bordeaux/50 transition-all"
                aria-label={t.contact.phoneLabel}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.5 10.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012.41 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z"/>
                </svg>
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/7 border border-white/10 flex items-center justify-center text-snow/60 hover:text-white hover:bg-gradient-to-tr hover:from-[#feda75] hover:via-[#d62976] hover:to-[#4f5bd5] hover:border-transparent transition-all"
                aria-label="Instagram">
                {IG}
              </a>
            </div>

            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] shadow-[0_4px_18px_rgba(214,41,118,0.35)] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(214,41,118,0.5)] transition-all duration-200">
              {IG}
              {t.footer.follow}
            </a>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-snow/80 font-bold text-xs uppercase tracking-widest mb-5">{t.footer.links}</h4>
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href}
                    className="text-snow/60 hover:text-gold text-sm transition-colors duration-200">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-snow/80 font-bold text-xs uppercase tracking-widest mb-5">{t.footer.contact}</h4>
            <ul className="space-y-3 text-snow/60 text-sm">
              <li>
                <a href={`tel:${PHONE_MAIN}`} className="flex items-center gap-2 hover:text-gold transition-colors">
                  <span className="text-gold text-base">📞</span>
                  {PHONE_MAIN_DISPLAY}
                </a>
              </li>
              <li>
                <button type="button" onClick={open}
                  className="flex items-center gap-2 hover:text-gold transition-colors">
                  <span className="text-gold text-base">💬</span>
                  {t.contact.whatsappLabel}
                </button>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold text-base mt-0.5">📍</span>
                <span>{t.footer.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-7 text-snow/60 text-xs">
          <span>© {year} {t.footer.clinic} · {t.footer.rights}</span>
          <span className="flex items-center gap-1.5">
            <span className="text-gold text-sm">☪</span>
            {t.footer.verse}
          </span>
        </div>
      </div>
    </footer>
  );
}
