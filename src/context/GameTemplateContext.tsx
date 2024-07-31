// context/GameTemplateContext.tsx

import React, { createContext, useState, useEffect, ReactNode } from "react";

interface GameTemplate {
  _id: string;
  gameTitle: string;
  createdByEmail: string;
  gameTemplateId: string;
  preselectedSolutionIds: string[];
  preselectedQuestionIds: string[];
  preselectedStrengthIds: string[];
  preselectedActionIds: string[];
}

interface GameTemplateContextProps {
  gameTemplate: GameTemplate | null;
  setGameTemplate: React.Dispatch<React.SetStateAction<GameTemplate | null>>;
}

const GameTemplateContext = createContext<GameTemplateContextProps | undefined>(
  undefined
);

interface GameTemplateProviderProps {
  children: ReactNode;
}

export const GameTemplateProvider: React.FC<GameTemplateProviderProps> = ({
  children,
}) => {
  const [gameTemplate, setGameTemplate] = useState<GameTemplate | null>(() => {
    const savedTemplate = localStorage.getItem("gameTemplate");
    return savedTemplate ? JSON.parse(savedTemplate) : null;
  });

  useEffect(() => {
    if (gameTemplate) {
      localStorage.setItem("gameTemplate", JSON.stringify(gameTemplate));
    }
  }, [gameTemplate]);

  return (
    <GameTemplateContext.Provider value={{ gameTemplate, setGameTemplate }}>
      {children}
    </GameTemplateContext.Provider>
  );
};

export default GameTemplateContext;
