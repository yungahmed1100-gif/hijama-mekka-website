import { useEffect } from "react";
import { X } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { trackEvent } from "../lib/analytics";
import { buildWaUrl } from "../lib/whatsapp";
import WhatsAppIcon from "./icons/WhatsAppIcon";

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
    window.open(buildWaUrl(phone), "_blank", "noopener,noreferrer");
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
            <WhatsAppIcon className="w-4.5 h-4.5 fill-current shrink-0" />
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
              <WhatsAppIcon className="w-4.5 h-4.5 fill-current shrink-0" />
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
                <WhatsAppIcon className="w-4.5 h-4.5 fill-current shrink-0" />
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
