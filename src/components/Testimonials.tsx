import { useLang } from "../contexts/LanguageContext";

const Star = () => (
  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-gold shrink-0">
    <path d="M7.612 1.37a.44.44 0 0 1 .776 0l1.613 3.268 3.604.524a.44.44 0 0 1 .244.75l-2.608 2.542.616 3.59a.44.44 0 0 1-.638.463L8 10.704l-3.22 1.693a.44.44 0 0 1-.637-.464l.615-3.59L2.15 5.913a.44.44 0 0 1 .244-.75l3.604-.524z"/>
  </svg>
);

const AVATAR_COLORS = ["bg-bordeaux", "bg-gold", "bg-bordeaux-light"];

const QuoteIcon = () => (
  <svg viewBox="0 0 32 32" className="w-8 h-8 fill-bordeaux/10">
    <path d="M9.333 18.667H6.667C5.195 18.667 4 17.472 4 16V10.667C4 9.195 5.195 8 6.667 8h4C12.14 8 13.333 9.195 13.333 10.667v9.333a8 8 0 0 1-8 8v-2.667a5.333 5.333 0 0 0 4-5.333zm16 0H22.667C21.195 18.667 20 17.472 20 16V10.667C20 9.195 21.195 8 22.667 8h4C28.14 8 29.333 9.195 29.333 10.667v9.333a8 8 0 0 1-8 8v-2.667a5.333 5.333 0 0 0 4-5.333z"/>
  </svg>
);

export default function Testimonials() {
  const { t } = useLang();

  return (
    <section id="testimonials" className="py-28 lg:py-36 bg-snow-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="reveal">
            <span className="section-label text-bordeaux border-bordeaux/30">{t.testimonials.eyebrow}</span>
          </div>
          <h2 className="reveal reveal-delay-1 font-black text-bordeaux-dark mt-4"
            style={{ fontSize: "clamp(1.8rem,4.5vw,2.9rem)" }}>
            {t.testimonials.title}
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {t.testimonials.items.map((item, i) => (
            <div
              key={i}
              className="reveal card-base group p-8 flex flex-col gap-5"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Quote + stars */}
              <div className="flex items-start justify-between gap-3">
                <QuoteIcon />
                <div className="flex gap-0.5 mt-1">
                  {Array.from({ length: item.rating }).map((_, j) => <Star key={j} />)}
                </div>
              </div>

              {/* Text */}
              <p className="text-bordeaux-dark/60 text-sm leading-[1.9] flex-1">{item.text}</p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-alabaster">
                <div className={`w-10 h-10 rounded-full ${AVATAR_COLORS[i]} flex items-center justify-center text-snow font-bold text-sm shrink-0`}>
                  {item.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-bordeaux-dark text-sm">{item.name}</div>
                  <div className="text-silver text-xs flex items-center gap-1 mt-0.5">
                    <svg viewBox="0 0 16 16" className="w-3 h-3 fill-current shrink-0">
                      <path fillRule="evenodd" d="M8 1.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zM2 6a6 6 0 1 1 10.174 4.31c-.203.196-.43.379-.66.36C10.4 12 10 13 10 13H6s-.4-1-1.514-2.32a.997.997 0 0 1-.032-.03A6.016 6.016 0 0 1 2 6zm6 2a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" clipRule="evenodd"/>
                    </svg>
                    {item.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall rating */}
        <div className="reveal mt-14 flex justify-center">
          <div className="inline-flex items-center gap-5 rounded-2xl px-8 py-5 border border-bordeaux/10 bg-bordeaux"
            style={{ boxShadow: "0 8px 32px rgba(76,4,26,0.25)" }}>
            <div>
              <div className="font-black text-gold leading-none" style={{ fontSize: "2.5rem" }}>5.0</div>
              <div className="flex gap-0.5 mt-1.5">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} />)}
              </div>
            </div>
            <div className="w-px h-10 bg-white/15" />
            <div className="text-snow/65 text-sm leading-relaxed">
              <div className="text-snow font-bold mb-0.5">تقييم العملاء</div>
              +500 مراجعة
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
