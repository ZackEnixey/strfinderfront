import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
interface ModeContextType {
  mode: "create" | "edit";
  updateMode: (newMode: "create" | "edit") => void;
}
const ModeContext = createContext<ModeContextType | undefined>(undefined);
interface ModeProviderProps {
  children: ReactNode;
}
export const ModeProvider = ({ children }: ModeProviderProps) => {
  const [mode, setMode] = useState<"create" | "edit">(() => {
    const savedMode = localStorage.getItem("mode") as "create" | "edit" | null;
    return savedMode ? savedMode : "create";
  });

  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  const updateMode = (newMode: "create" | "edit") => {
    setMode(newMode);
  };

  return (
    <ModeContext.Provider value={{ mode, updateMode }}>
      {children}
    </ModeContext.Provider>
  );
};
export const useMode = (): ModeContextType => {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error("useMode must be used within a ModeProvider");
  }
  return context;
};
