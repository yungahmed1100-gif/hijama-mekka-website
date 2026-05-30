import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";

const images = Array.from({ length: 9 }, (_, i) => `/gallery/gallery-0${i + 1}.jpg`);

export default function Gallery() {
  const { t } = useLang();
  const [lb, setLb] = useState<number | null>(null);

  const prev = () => setLb((l) => (l !== null ? (l - 1 + images.length) % images.length : null));
  const next = () => setLb((l) => (l !== null ? (l + 1) % images.length : null));

  return (
    <section id="gallery" className="py-28 lg:py-36 bg-snow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="reveal">
            <span className="section-label text-bordeaux border-bordeaux/30">{t.gallery.eyebrow}</span>
          </div>
          <h2 className="reveal reveal-delay-1 font-black text-bordeaux-dark mt-4 mb-3"
            style={{ fontSize: "clamp(1.8rem,4.5vw,2.9rem)" }}>
            {t.gallery.title}
          </h2>
          <p className="reveal reveal-delay-2 text-bordeaux-dark/50 text-base">{t.gallery.subtitle}</p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setLb(i)}
              className={`reveal group relative overflow-hidden rounded-2xl focus-visible:ring-2 focus-visible:ring-bordeaux focus-visible:outline-none ${
                i === 0 ? "col-span-2 md:col-span-1 row-span-2" : ""
              }`}
              style={{ transitionDelay: `${i * 55}ms` }}
              aria-label={`Open image ${i + 1}`}
            >
              <img
                src={src}
                alt={`Clinic ${i + 1}`}
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.07] ${
                  i === 0 ? "h-60 md:h-full" : "h-44 md:h-52"
                }`}
              />
              {/* hover overlay */}
              <div className="absolute inset-0 bg-bordeaux-dark/0 group-hover:bg-bordeaux-dark/40 transition-all duration-300 flex items-center justify-center">
                <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-4.5 h-4.5">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                    <path d="M11 8v6M8 11h6" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lb !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: "rgba(20,0,8,0.95)" }}
          onClick={() => setLb(null)}
        >
          {/* Close */}
          <button onClick={() => setLb(null)}
            className="absolute top-4 end-4 w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            aria-label={t.gallery.close}>
            <X className="w-4.5 h-4.5" />
          </button>

          {/* Prev */}
          <button onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute start-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10">
            <ChevronLeft className="w-5 h-5" />
          </button>

          <img src={images[lb]} alt="" onClick={(e) => e.stopPropagation()}
            className="max-h-[88vh] max-w-[88vw] object-contain rounded-2xl"
            style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.6)" }} />

          {/* Next */}
          <button onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute end-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10">
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dot strip */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button key={i} onClick={(e) => { e.stopPropagation(); setLb(i); }}
                className={`rounded-full transition-all duration-200 ${i === lb ? "w-5 h-1.5 bg-gold" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/50"}`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
