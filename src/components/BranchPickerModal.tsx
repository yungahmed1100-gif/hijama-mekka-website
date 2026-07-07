import { useEffect } from "react";
import { X } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { trackEvent } from "../lib/analytics";

const OMAN_CODE = "968";

const WA = (
  <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-current shrink-0">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.114 1.523 5.843L0 24l6.335-1.498A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.013-1.373l-.36-.213-3.731.882.93-3.634-.234-.373A9.818 9.818 0 1112 21.818z"/>
  </svg>
);

interface BranchPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BranchPickerModal({ isOpen, onClose }: BranchPickerModalProps) {
  const { t } = useLang();

  // Close on Escape and lock body scroll while open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBranch = (name: string, phone: string) => {
    trackEvent("Lead", { content_name: `WhatsApp Branch: ${name}` });
    // Normalize to digits only, then ensure the Oman country code prefix so a
    // stray space or +968 in the data can't produce a broken wa.me link.
    const digits = phone.replace(/\D/g, "");
    const number = digits.startsWith(OMAN_CODE) ? digits : `${OMAN_CODE}${digits}`;
    window.open(`https://wa.me/${number}`, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="branch-picker-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-bordeaux-dark/70 backdrop-blur-sm animate-[fadeIn_0.2s_ease]"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full sm:max-w-lg max-h-[88vh] flex flex-col bg-snow rounded-t-3xl sm:rounded-3xl shadow-[0_-8px_40px_rgba(76,4,26,0.3)] sm:shadow-[0_32px_80px_rgba(76,4,26,0.4)] overflow-hidden animate-[slideUp_0.28s_cubic-bezier(0.16,1,0.3,1)]">

        {/* Header */}
        <div className="relative px-6 pt-7 pb-5 text-center shrink-0"
          style={{ background: "linear-gradient(150deg, #6a0720, #4c041a)" }}>
          <button
            onClick={onClose}
            aria-label={t.branchPicker.close}
            className="absolute top-4 end-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-snow/80 hover:text-snow transition-all"
          >
            <X className="w-4.5 h-4.5" />
          </button>
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl flex items-center justify-center text-snow"
            style={{ background: "rgba(37,211,102,0.9)" }}>
            {WA}
          </div>
          <h2 id="branch-picker-title" className="font-black text-snow text-lg sm:text-xl mb-1">
            {t.branchPicker.title}
          </h2>
          <p className="text-snow/55 text-sm">{t.branchPicker.subtitle}</p>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto px-4 py-4">

          {/* Head doctor — featured, full width */}
          <button
            onClick={() => handleBranch(t.branchPicker.doctorName, t.branchPicker.doctorPhone)}
            className="group w-full mb-3 flex items-center gap-3.5 rounded-2xl px-4 py-3.5 text-start transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, rgba(201,168,76,0.14), rgba(201,168,76,0.06))",
              border: "1px solid rgba(201,168,76,0.4)",
            }}
          >
            <span className="w-11 h-11 rounded-2xl flex items-center justify-center text-bordeaux-dark shrink-0"
              style={{ background: "linear-gradient(135deg, #e2c97a, #c9a84c)" }}>
              {WA}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-black text-bordeaux-dark text-sm leading-tight">
                {t.branchPicker.doctorName}
              </span>
              <span className="block text-gold-dark text-[11px] font-bold leading-tight mt-0.5">
                {t.branchPicker.doctorRole}
              </span>
            </span>
            <span className="font-mono text-[11px] text-bordeaux/50 tracking-wider shrink-0">
              {t.branchPicker.doctorPhone}
            </span>
          </button>

          {/* Branch grid */}
          <div className="grid grid-cols-2 gap-2.5">
          {t.branches.items.map((branch) => (
            <button
              key={branch.phone}
              onClick={() => handleBranch(branch.name, branch.phone)}
              className="group flex items-center gap-3 rounded-2xl bg-white border border-silver/25 hover:border-[#25d366]/50 hover:bg-[#25d366]/5 px-3.5 py-3 text-start transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(37,211,102,0.15)]"
            >
              <span className="w-9 h-9 rounded-xl bg-[#25d366]/12 group-hover:bg-[#25d366] flex items-center justify-center text-[#1ab554] group-hover:text-white transition-all shrink-0">
                {WA}
              </span>
              <span className="min-w-0">
                <span className="block font-bold text-bordeaux-dark text-sm leading-tight truncate">
                  {branch.name}
                </span>
                <span className="block font-mono text-[11px] text-bordeaux/50 tracking-wider">
                  {branch.phone}
                </span>
              </span>
            </button>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}
