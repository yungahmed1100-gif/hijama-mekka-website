import { useLang } from "../contexts/LanguageContext";

const PhoneIcon = () => (
  <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 fill-current shrink-0">
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
  </svg>
);

const PinIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.003 3.5-4.697 3.5-8.327a8 8 0 10-16 0c0 3.63 1.556 6.324 3.5 8.327a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" clipRule="evenodd"/>
  </svg>
);

export default function Branches() {
  const { t } = useLang();

  return (
    <section id="branches" className="py-28 lg:py-36 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #faf6f7 0%, #f0e8eb 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-lg mx-auto mb-14">
          <div className="reveal">
            <span className="section-label text-bordeaux border-bordeaux/30">{t.branches.eyebrow}</span>
          </div>
          <h2 className="reveal reveal-delay-1 font-black text-bordeaux-dark mt-4 mb-3"
            style={{ fontSize: "clamp(1.8rem,4.5vw,2.9rem)" }}>
            {t.branches.title}
          </h2>
          <p className="reveal reveal-delay-2 text-bordeaux-dark/50">{t.branches.subtitle}</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
          {t.branches.items.map((branch, i) => (
            <a
              key={i}
              href={`tel:${branch.phone}`}
              className="reveal group card-base p-5 flex flex-col items-center text-center gap-3 no-underline"
              style={{ transitionDelay: `${i * 45}ms` }}
            >
              {/* Icon circle */}
              <div className="w-11 h-11 rounded-2xl bg-bordeaux/8 group-hover:bg-bordeaux flex items-center justify-center text-bordeaux group-hover:text-snow transition-all duration-300">
                <PinIcon />
              </div>

              {/* Name */}
              <div className="font-bold text-bordeaux-dark group-hover:text-bordeaux text-sm leading-tight transition-colors duration-200">
                {branch.name}
              </div>

              {/* Number */}
              <div className="font-mono text-[13px] text-bordeaux/60 group-hover:text-bordeaux font-semibold tracking-wider transition-colors duration-200">
                {branch.phone}
              </div>

              {/* Call chip */}
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-bordeaux/6 group-hover:bg-bordeaux/12 text-bordeaux/50 group-hover:text-bordeaux text-[10px] font-bold uppercase tracking-widest transition-all duration-200">
                <PhoneIcon />
                اتصل
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
