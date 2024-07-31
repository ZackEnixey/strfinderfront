import React, { createContext, useContext, useState, useEffect } from "react";

interface IsDilemmaOwnerContextType {
  isDilemmaOwner: boolean;
  setIsDilemmaOwner: (value: boolean) => void;
}

const IsDilemmaOwnerContext = createContext<
  IsDilemmaOwnerContextType | undefined
>(undefined);

export const IsDilemmaOwnerProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isDilemmaOwner, setIsDilemmaOwnerState] = useState<boolean>(() => {
    const storedValue = localStorage.getItem("isDilemmaOwner");
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const setIsDilemmaOwner = (value: boolean) => {
    setIsDilemmaOwnerState(value);
    localStorage.setItem("isDilemmaOwner", JSON.stringify(value));
  };

  useEffect(() => {
    const storedValue = localStorage.getItem("isDilemmaOwner");
    if (storedValue) {
      setIsDilemmaOwnerState(JSON.parse(storedValue));
    }
  }, []);

  return (
    <IsDilemmaOwnerContext.Provider
      value={{ isDilemmaOwner, setIsDilemmaOwner }}
    >
      {children}
    </IsDilemmaOwnerContext.Provider>
  );
};

export const useIsDilemmaOwner = (): IsDilemmaOwnerContextType => {
  const context = useContext(IsDilemmaOwnerContext);
  if (!context) {
    throw new Error(
      "useIsDilemmaOwner must be used within an IsDilemmaOwnerProvider"
    );
  }
  return context;
};
