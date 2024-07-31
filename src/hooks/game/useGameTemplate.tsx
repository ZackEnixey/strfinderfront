import { useContext } from "react";
import GameTemplateContext from "../../context/GameTemplateContext";

export const useGameTemplate = () => {
  const context = useContext(GameTemplateContext);
  if (!context) {
    throw new Error(
      "useGameTemplate must be used within a GameTemplateProvider"
    );
  }
  return context;
};
