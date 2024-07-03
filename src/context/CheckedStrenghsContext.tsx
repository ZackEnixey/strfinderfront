import React, { createContext, useState, useContext, ReactNode } from "react";

interface CheckedStrengthsProps {
  checkedStrengths: string[];
  setCheckedStrengths: React.Dispatch<React.SetStateAction<string[]>>;
}

const CheckedStrengthsContext = createContext<
  CheckedStrengthsProps | undefined
>(undefined);

interface CheckedStrengthsProviderProps {
  children: ReactNode;
}

export const CheckedStrengthsProvider: React.FC<
  CheckedStrengthsProviderProps
> = ({ children }) => {
  const [checkedStrengths, setCheckedStrengths] = useState<string[]>(() => {
    const saved = localStorage.getItem("selectedStrengths");
    return saved ? JSON.parse(saved) : [];
  });

  return (
    <CheckedStrengthsContext.Provider
      value={{ checkedStrengths, setCheckedStrengths }}
    >
      {children}
    </CheckedStrengthsContext.Provider>
  );
};

export const useCheckedStrengths = () => {
  const context = useContext(CheckedStrengthsContext);
  if (context === undefined) {
    throw new Error(
      "useCheckedStrengths must be used within a CheckedStrengthsProvider"
    );
  }
  return context;
};
