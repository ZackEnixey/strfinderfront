import React, { createContext, useState, useContext, ReactNode } from "react";

interface CheckedSolutionsProps {
  checkedSolutions: string[];
  setCheckedSolutions: React.Dispatch<React.SetStateAction<string[]>>;
}

const CheckedSolutionsContext = createContext<
  CheckedSolutionsProps | undefined
>(undefined);

interface CheckedSolutionsProviderProps {
  children: ReactNode;
}

export const CheckedSolutionsProvider: React.FC<
  CheckedSolutionsProviderProps
> = ({ children }) => {
  const [checkedSolutions, setCheckedSolutions] = useState<string[]>(() => {
    const saved = localStorage.getItem("selectedSolutions");
    return saved ? JSON.parse(saved) : [];
  });

  return (
    <CheckedSolutionsContext.Provider
      value={{ checkedSolutions, setCheckedSolutions }}
    >
      {children}
    </CheckedSolutionsContext.Provider>
  );
};

export const useCheckedSolutions = () => {
  const context = useContext(CheckedSolutionsContext);
  if (context === undefined) {
    throw new Error(
      "useCheckedSolutions must be used within a CheckedSolutionsProvider"
    );
  }
  return context;
};
