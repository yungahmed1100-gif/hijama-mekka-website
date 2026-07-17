import { Phone, MapPin, Clock } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { useBranchPicker } from "../contexts/BranchPickerContext";
import { PHONE_MAIN } from "../lib/constants";
import WhatsAppIcon from "./icons/WhatsAppIcon";

export default function Contact() {
  const { t } = useLang();
  const { open } = useBranchPicker();

  const details = [
    { Icon: Phone, label: t.contact.phoneLabel, value: t.contact.phone, href: `tel:${PHONE_MAIN}` },
    { Icon: MapPin, label: t.contact.locationLabel, value: t.contact.location, href: "https://maps.google.com/?q=Muscat,Oman" },
    { Icon: Clock, label: t.contact.hoursLabel, value: t.contact.hours, href: null },
  ];

  return (
    <section id="contact" className="relative py-28 lg:py-36 overflow-hidden noise-overlay"
      style={{ background: "linear-gradient(150deg, #350011 0%, #6a0720 55%, #4c041a 100%)" }}>
      {/* ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 end-0 w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(201,168,76,0.25), transparent 70%)" }} />
        <div className="absolute bottom-0 start-0 w-80 h-80 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, rgba(250,246,247,0.1), transparent 70%)" }} />
      </div>

      {/* dot grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left — info */}
          <div>
            <div className="reveal">
              <span className="section-label text-gold border-gold/30">{t.contact.eyebrow}</span>
            </div>
            <h2 className="reveal reveal-delay-1 font-black text-snow leading-tight mt-4 mb-4"
              style={{ fontSize: "clamp(1.8rem,4.5vw,2.9rem)" }}>
              {t.contact.title}
            </h2>
            <p className="reveal reveal-delay-2 text-snow/50 mb-10 leading-relaxed max-w-md"
              style={{ fontSize: "clamp(0.88rem,1.5vw,1rem)" }}>
              {t.contact.subtitle}
            </p>

            {/* Details */}
            <div className="reveal reveal-delay-2 space-y-4">
              {details.map(({ Icon, label, value, href }, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-white/8 border border-white/10 flex items-center justify-center text-gold shrink-0">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="text-snow/65 text-[11px] font-bold uppercase tracking-wider mb-0.5">{label}</div>
                    {href ? (
                      <a href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="text-snow font-semibold text-sm hover:text-gold transition-colors">
                        {value}
                      </a>
                    ) : (
                      <span className="text-snow font-semibold text-sm">{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Response badge */}
            <div className="reveal reveal-delay-3 mt-8 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/7 border border-white/10">
              <span className="relative flex w-2 h-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex rounded-full w-2 h-2 bg-green-400" />
              </span>
              <span className="text-snow/65 text-sm">{t.contact.disclaimer}</span>
            </div>
          </div>

          {/* Right — CTA card */}
          <div className="reveal reveal-delay-2">
            <div className="rounded-3xl p-8 lg:p-10 text-center"
              style={{
                background: "rgba(255,255,255,0.07)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 32px 80px rgba(76,4,26,0.3)",
              }}>

              {/* WA icon */}
              <div className="w-20 h-20 mx-auto mb-6 rounded-3xl flex items-center justify-center"
                style={{ background: "rgba(37,211,102,0.15)", border: "1px solid rgba(37,211,102,0.2)", color: "#25d366" }}>
                <WhatsAppIcon className="w-11 h-11 fill-current shrink-0" />
              </div>

              <h3 className="font-black text-snow text-xl mb-1.5">{t.contact.ctaWhatsapp}</h3>
              <p className="text-snow/65 text-sm mb-8">{t.contact.phone}</p>

              <div className="flex flex-col gap-3">
                <button type="button" onClick={open}
                  className="btn-whatsapp justify-center w-full">
                  <WhatsAppIcon />
                  {t.contact.ctaWhatsapp}
                </button>
                <a href={`tel:${PHONE_MAIN}`}
                  className="inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-snow/20 text-snow/75 text-sm font-semibold hover:bg-white/8 hover:border-snow/35 hover:text-snow transition-all">
                  <Phone className="w-4 h-4" />
                  {t.contact.ctaCall}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
