import { createContext, useContext, useState, type ReactNode } from "react";
import BranchPickerModal from "../components/BranchPickerModal";

interface BranchPickerContextValue {
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

const BranchPickerContext = createContext<BranchPickerContextValue>({
  open: () => {},
  close: () => {},
  isOpen: false,
});

export function BranchPickerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <BranchPickerContext.Provider value={{ open, close, isOpen }}>
      {children}
      <BranchPickerModal isOpen={isOpen} onClose={close} />
    </BranchPickerContext.Provider>
  );
}

export const useBranchPicker = () => useContext(BranchPickerContext);
