import { ChevronDown } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";

const WA = (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.114 1.523 5.843L0 24l6.335-1.498A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.013-1.373l-.36-.213-3.731.882.93-3.634-.234-.373A9.818 9.818 0 1112 21.818z"/>
  </svg>
);

export default function Hero() {
  const { t } = useLang();

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center overflow-hidden"
      style={{ background: "#3F0013" }}
    >
      {/* ── BG.JPEG — full bleed, faded, text sits on top ── */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/bg.jpeg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.12 }}
        />
        {/* dark wash on top of bg image so text is always readable */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(160deg, rgba(63,0,19,0.72) 0%, rgba(63,0,19,0.55) 50%, rgba(63,0,19,0.80) 100%)" }} />
      </div>

      {/* Subtle dot-grid texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      {/* Gold ambient glow */}
      <div className="absolute top-0 start-0 w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(circle at 30% 30%, rgba(201,168,76,0.10) 0%, transparent 70%)" }} />

      {/* ── Main two-column grid ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-32 lg:pt-32 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-6 items-center">

          {/* ── LEFT: text content ── */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-start order-2 lg:order-1">

            {/* Eyebrow pill */}
            <div className="reveal mb-5">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/12 border border-gold/25 text-gold eyebrow tracking-[0.2em]">
                <span className="relative flex w-2 h-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-50" />
                  <span className="relative inline-flex rounded-full w-2 h-2 bg-gold" />
                </span>
                {t.hero.eyebrow}
              </span>
            </div>

            {/* Headline */}
            <h1
              className="reveal reveal-delay-1 font-black text-snow leading-[1.05] mb-5 w-full"
              style={{ fontSize: "clamp(2.4rem,6.5vw,4.6rem)" }}
            >
              <span className="block">{t.hero.h1a}</span>
              <span className="block text-gold-shimmer">{t.hero.h1b}</span>
              <span className="block text-snow/35 font-light mt-1"
                style={{ fontSize: "clamp(1.2rem,3vw,2.2rem)" }}>
                {t.hero.h1c}
              </span>
            </h1>

            {/* Hadith callout */}
            <div className="reveal reveal-delay-2 mb-6 w-full max-w-md">
              <div className="rounded-xl px-5 py-4 border border-gold/20"
                style={{ background: "rgba(201,168,76,0.07)", backdropFilter: "blur(8px)" }}>
                <p className="text-gold font-bold leading-relaxed mb-1"
                  style={{ fontSize: "clamp(0.85rem,1.5vw,1rem)" }}>
                  «{t.hero.hadith}»
                </p>
                <p className="text-snow/40 text-xs font-semibold">{t.hero.hadithAttr}</p>
              </div>
            </div>

            {/* Tagline */}
            <p
              className="reveal reveal-delay-3 text-snow/55 leading-[1.8] mb-8 max-w-md"
              style={{ fontSize: "clamp(0.86rem,1.4vw,0.97rem)" }}
            >
              {t.hero.tagline}
            </p>

            {/* CTA buttons */}
            <div className="reveal reveal-delay-4 flex flex-wrap gap-3 justify-center lg:justify-start mb-10">
              <a
                href="https://wa.me/96899351374"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                {WA}
                {t.hero.ctaBook}
              </a>
              <a href="#about" className="btn-ghost text-sm">
                {t.hero.ctaLearn}
              </a>
            </div>

            {/* Stats row */}
            <div
              className="reveal reveal-delay-5 grid grid-cols-3 divide-x divide-snow/10 border border-snow/10 rounded-2xl overflow-hidden w-full max-w-xs"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              {[
                { v: t.hero.stat1, l: t.hero.stat1Label },
                { v: t.hero.stat2, l: t.hero.stat2Label },
                { v: t.hero.stat3, l: t.hero.stat3Label },
              ].map((s, i) => (
                <div key={i} className="text-center py-4 px-2">
                  <div className="font-black text-gold" style={{ fontSize: "clamp(1.3rem,2.5vw,1.8rem)" }}>{s.v}</div>
                  <div className="text-snow/38 mt-0.5 text-[10px] leading-tight">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: hero.png — edges dissolve into #3F0013 ── */}
          <div className="reveal order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px] lg:max-w-none lg:w-[90%]">

              <img
                src="/hero.png"
                alt="Hijama therapy"
                className="w-full h-auto object-contain relative z-10 block"
                style={{
                  filter: "drop-shadow(0 20px 60px rgba(63,0,19,0.7))",
                  maxHeight: "75vh",
                }}
              />

              {/* Fade all four edges into #3F0013 */}
              <div className="absolute inset-0 z-20 pointer-events-none">
                {/* top */}
                <div className="absolute top-0 inset-x-0 h-[30%]"
                  style={{ background: "linear-gradient(to bottom, #3F0013 0%, transparent 100%)" }} />
                {/* bottom */}
                <div className="absolute bottom-0 inset-x-0 h-[35%]"
                  style={{ background: "linear-gradient(to top, #3F0013 0%, transparent 100%)" }} />
                {/* left */}
                <div className="absolute inset-y-0 start-0 w-[30%]"
                  style={{ background: "linear-gradient(to end, #3F0013 0%, transparent 100%)" }} />
                {/* right */}
                <div className="absolute inset-y-0 end-0 w-[20%]"
                  style={{ background: "linear-gradient(to start, #3F0013 0%, transparent 100%)" }} />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom fade to page background color */}
      <div className="absolute bottom-0 inset-x-0 h-28 pointer-events-none"
        style={{ background: "linear-gradient(to top, #faf6f7 0%, transparent 100%)" }} />

      {/* Scroll cue */}
      <a
        href="#trust"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-snow/25 hover:text-gold/70 transition-colors"
      >
        <span className="eyebrow text-[8px] tracking-[0.4em]">{t.hero.scrollCue}</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
}
