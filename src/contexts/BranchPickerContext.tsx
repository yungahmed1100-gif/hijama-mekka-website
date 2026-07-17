import { createContext, useContext, useState, useMemo, type ReactNode } from "react";
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

  const value = useMemo(
    () => ({ open: () => setIsOpen(true), close: () => setIsOpen(false), isOpen }),
    [isOpen],
  );

  return (
    <BranchPickerContext.Provider value={value}>
      {children}
      <BranchPickerModal isOpen={isOpen} onClose={value.close} />
    </BranchPickerContext.Provider>
  );
}

export const useBranchPicker = () => useContext(BranchPickerContext);
