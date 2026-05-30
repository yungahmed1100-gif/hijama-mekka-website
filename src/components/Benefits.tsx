import { useLang } from "../contexts/LanguageContext";

const ICONS = [
  /* Blood */ (
    <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
      <path d="M20 4C20 4 9 16 9 24a11 11 0 0022 0C31 16 20 4 20 4Z" fill="currentColor" fillOpacity=".18" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M14 26q3-4 6-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity=".7"/>
    </svg>
  ),
  /* Pain */ (
    <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
      <rect x="17" y="7" width="6" height="26" rx="3" fill="currentColor" fillOpacity=".18" stroke="currentColor" strokeWidth="2"/>
      <rect x="7" y="17" width="26" height="6" rx="3" fill="currentColor" fillOpacity=".18" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  /* Circ */ (
    <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
      <path d="M20 33C20 33 7 24 7 15A8 8 0 0120 11a8 8 0 0113 4c0 9-13 18-13 18Z" fill="currentColor" fillOpacity=".18" stroke="currentColor" strokeWidth="2"/>
      <polyline points="10,21 15,21 18,15 22,27 26,21 30,21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  /* Immunity */ (
    <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
      <path d="M20 5L33 10v13c0 7-6 12-13 14C13 35 7 30 7 23V10Z" fill="currentColor" fillOpacity=".18" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <polyline points="14,20 18,24 26,16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  /* Stress */ (
    <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
      <path d="M20 34C20 34 8 26 8 15c0-7 5-11 12-9 7-2 12 2 12 9 0 11-12 19-12 19Z" fill="currentColor" fillOpacity=".18" stroke="currentColor" strokeWidth="2"/>
      <line x1="20" y1="34" x2="20" y2="13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity=".6"/>
    </svg>
  ),
  /* Skin */ (
    <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
      <path d="M20 5l2.5 12L35 20l-12.5 3L20 35l-2.5-12L5 20l12.5-3Z" fill="currentColor" fillOpacity=".2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M30 7l1 4 4 1-4 1-1 4-1-4-4-1 4-1Z" fill="currentColor" fillOpacity=".5"/>
    </svg>
  ),
];

export default function Benefits() {
  const { t } = useLang();

  return (
    <section id="benefits" className="py-28 lg:py-36 bg-snow-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="reveal">
            <span className="section-label text-bordeaux border-bordeaux/30">{t.benefits.eyebrow}</span>
          </div>
          <h2 className="reveal reveal-delay-1 font-black text-bordeaux-dark leading-tight mt-4 mb-4"
            style={{ fontSize: "clamp(1.8rem,4.5vw,2.9rem)" }}>
            {t.benefits.title}
          </h2>
          <p className="reveal reveal-delay-2 text-bordeaux-dark/50 leading-relaxed"
            style={{ fontSize: "clamp(0.9rem,1.5vw,1.05rem)" }}>
            {t.benefits.subtitle}
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.benefits.items.map((b, i) => (
            <div
              key={i}
              className="reveal card-base group p-8 flex flex-col gap-5"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-bordeaux bg-bordeaux/8 group-hover:bg-bordeaux group-hover:text-snow transition-all duration-300 shrink-0">
                {ICONS[i]}
              </div>

              <div>
                <h3 className="font-bold text-bordeaux-dark text-lg mb-2">{b.title}</h3>
                <p className="text-bordeaux-dark/55 text-sm leading-[1.8]">{b.desc}</p>
              </div>

              {/* Gold accent line */}
              <span className="gold-rule mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
