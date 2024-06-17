import { useContext } from "react";
import SolutionsContext from "../context/SolutionContext";

export const useSolutions = () => useContext(SolutionsContext);
