import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { fetchQuestionsByIds } from "../hooks/game/get-questions";

interface QuestionContextType {
  questionTitle: string;
  questionDescription: string;
}

const QuestionContext = createContext<QuestionContextType | undefined>(
  undefined
);

export const useQuestion = () => {
  const context = useContext(QuestionContext);
  if (!context) {
    throw new Error("useQuestion must be used within a QuestionProvider");
  }
  return context;
};

interface QuestionProviderProps {
  children: ReactNode;
}

export const QuestionProvider = ({ children }: QuestionProviderProps) => {
  const [questionTitle, setQuestionTitle] = useState<string>("");
  const [questionDescription, setQuestionDescription] = useState<string>("");
  const questionId = localStorage.getItem("questionSelected");

  useEffect(() => {
    const getQuestion = async () => {
      if (questionId) {
        try {
          const response = await fetchQuestionsByIds([questionId]);
          setQuestionTitle(response.data[0].title);
          setQuestionDescription(response.data[0].description);
        } catch (error) {
          console.error("Error fetching question:", error);
        }
      }
    };
    getQuestion();
  }, [questionId]);

  return (
    <QuestionContext.Provider value={{ questionTitle, questionDescription }}>
      {children}
    </QuestionContext.Provider>
  );
};
