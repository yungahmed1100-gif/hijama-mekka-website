import { useLang } from "../contexts/LanguageContext";
import { useBranchPicker } from "../contexts/BranchPickerContext";

const badges = [
  { icon: "🌿", label: "طبيعي 100٪" },
  { icon: "☪️",  label: "سنة نبوية" },
  { icon: "🏅", label: "معتمد طبياً" },
  { icon: "🛡️", label: "آمن ومعقم" },
];

export default function About() {
  const { t } = useLang();
  const { open } = useBranchPicker();

  return (
    <section id="about" className="py-28 lg:py-36 bg-snow overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ── Image column ── */}
          <div className="relative order-2 lg:order-1">
            {/* subtle bg shape */}
            <div className="absolute -inset-6 rounded-[3rem] opacity-40 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 60% 40%, rgba(201,168,76,0.12), transparent 70%)" }} />

            {/* main photo */}
            <div className="relative rounded-3xl overflow-hidden"
              style={{ boxShadow: "0 24px 72px rgba(76,4,26,0.2)" }}>
              <img src="/gallery/gallery-02.jpg"
                alt="جلسة حجامة نبوية في عيادة مكة حجامة بعُمان — Hijama cupping session at Mekka Hijama clinic Oman"
                loading="lazy" decoding="async" width="600" height="500"
                className="w-full object-cover"
                style={{ height: "clamp(320px,45vw,500px)" }} />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(76,4,26,0.6) 0%, transparent 55%)" }} />
            </div>

            {/* Hadith card */}
            <div className="absolute -bottom-6 start-5 lg:start-8 max-w-[270px] rounded-2xl bg-white px-5 py-4"
              style={{ boxShadow: "0 8px 36px rgba(76,4,26,0.14)", border: "1px solid rgba(184,171,172,0.2)" }}>
              <span className="gold-rule mb-3 block" />
              <p className="text-bordeaux font-bold text-sm leading-snug mb-1.5">"{t.about.quote}"</p>
              <p className="text-silver text-xs font-medium">{t.about.quoteAttr}</p>
            </div>

            {/* Inset thumbnail */}
            <div className="absolute top-5 end-5 w-24 h-24 rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 0 0 3px #faf6f7, 0 8px 28px rgba(76,4,26,0.2)" }}>
              <img src="/gallery/gallery-04.jpg"
                alt="العلاج بالحجامة والعلاج الطبيعي — cupping and physiotherapy treatment"
                loading="lazy" decoding="async" width="200" height="200"
                className="w-full h-full object-cover" />
            </div>

            {/* blobs */}
            <div className="absolute -top-10 -end-10 w-48 h-48 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
          </div>

          {/* ── Text column ── */}
          <div className="order-1 lg:order-2">
            <div className="reveal">
              <span className="section-label text-bordeaux border-bordeaux/30">
                {t.about.eyebrow}
              </span>
            </div>

            <h2 className="reveal reveal-delay-1 font-black text-bordeaux-dark leading-[1.1] mt-4 mb-7"
              style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)" }}>
              {t.about.title}
            </h2>

            <div className="space-y-5 text-bordeaux-dark/60 leading-[1.9]"
              style={{ fontSize: "clamp(0.88rem,1.5vw,1rem)" }}>
              <p className="reveal reveal-delay-2">{t.about.p1}</p>

              {/* hadith callout */}
              <div className="reveal reveal-delay-3 relative ps-5 py-3 border-s-[3px] border-gold/60 bg-gold/6 rounded-e-xl">
                <p className="italic text-bordeaux-dark/75 text-sm leading-relaxed">{t.about.p2}</p>
              </div>

              <p className="reveal reveal-delay-4">{t.about.p3}</p>
            </div>

            {/* Badge grid */}
            <div className="reveal reveal-delay-4 grid grid-cols-2 gap-3 mt-9">
              {badges.map((b) => (
                <div key={b.label}
                  className="flex items-center gap-3 rounded-xl bg-alabaster/70 hover:bg-bordeaux/6 border border-transparent hover:border-bordeaux/10 px-4 py-3 transition-all duration-200 group cursor-default">
                  <span className="text-xl leading-none">{b.icon}</span>
                  <span className="text-[13px] font-bold text-bordeaux-dark">{b.label}</span>
                </div>
              ))}
            </div>

            <div className="reveal reveal-delay-5 mt-9">
              <button type="button" onClick={open} className="btn-primary">
                {t.about.cta}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
