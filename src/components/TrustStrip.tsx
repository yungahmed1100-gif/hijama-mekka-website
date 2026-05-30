import { useLang } from "../contexts/LanguageContext";

const DOT = <span className="w-1 h-1 rounded-full bg-gold/60 shrink-0 mx-1" />;

export default function TrustStrip() {
  const { t } = useLang();
  const items = [...t.trust.items, ...t.trust.items, ...t.trust.items];

  return (
    <div className="relative overflow-hidden bg-bordeaux-dark border-y border-white/[0.06] py-3.5">
      {/* left/right fade masks */}
      <div className="absolute inset-y-0 start-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to end, #4c041a, transparent)" }} />
      <div className="absolute inset-y-0 end-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to start, #4c041a, transparent)" }} />

      <div className="flex items-center whitespace-nowrap animate-ticker">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-8 text-snow/75 text-[13px] font-semibold tracking-wide">
            {DOT}
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
