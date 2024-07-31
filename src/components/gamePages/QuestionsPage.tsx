import { useEffect, useState } from "react";
import StrFinderButton from "../reusableParts/StrFinderButton";
import { useTranslation } from "react-i18next";
import StrFinderCard from "./StrFinderCard";
import { useGameTemplate } from "../../hooks/game/useGameTemplate";
import { fetchQuestionsByIds } from "../../hooks/game/get-questions";
import { QuestionItem } from "../../types/types";
import { fetchActionsByIds } from "../../hooks/game/get-actions";
import { useIsDilemmaOwner } from "../../context/IsDilemmaOwnerContext";
import { socket } from "../../socket/socket";
import { useNavigate } from "react-router-dom";

const QuestionsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isQuestionType, setIsQuestionType] = useState(true);
  const { gameTemplate } = useGameTemplate();
  const questionsIds = gameTemplate?.preselectedQuestionIds || [];
  const actionsIds = gameTemplate?.preselectedActionIds || [];
  const groupCode = localStorage.getItem("groupCode");
  const { isDilemmaOwner } = useIsDilemmaOwner();

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const getQuestions = async () => {
      if (questionsIds.length > 0) {
        try {
          const response = await fetchQuestionsByIds(questionsIds);
          setQuestions(response.data);
        } catch (error) {
          console.error("Error fetching questions:", error);
        }
      }
    };
    const getActions = async () => {
      if (questionsIds.length > 0) {
        try {
          const response = await fetchActionsByIds(actionsIds);
          setQuestions(response.data);
        } catch (error) {
          console.error("Error fetching questions:", error);
        }
      }
    };

    isQuestionType ? getQuestions() : getActions();
  }, [isQuestionType, questionsIds, actionsIds]);

  useEffect(() => {
    socket.on("itemSelected", () => {
      console.log("item selected");
      navigate("/game/chooseSolution");
    });

    return () => {
      socket.off("itemSelected");
    };
  }, []);

  const handleCardSelect = (selectedItem: string) => {
    socket.emit("dilemmaSelection", {
      item: selectedItem,
      type: isQuestionType ? "question" : "action",
      groupCode: groupCode,
    });
  };

  return (
    <div className="generic_game_content_holder">
      <div className="question-container">
        {!isDilemmaOwner && (
          <p className="dilemma-text">
            Wait for the Dilemma owner to pick a dilemma and then discuss it
          </p>
        )}
        <div className="horizontal_scroll">
          {questions.map((question: QuestionItem, index) => (
            <StrFinderCard
              key={index}
              title={question.title}
              content={question.description}
              isDilemma={isDilemmaOwner}
              onCardSelect={() => handleCardSelect(question._id)}
            />
          ))}
        </div>
      </div>
      <div className="generic_button_holder">
        <StrFinderButton
          btnColor="green"
          btnWidth="revert-layer"
          textContent={t(
            isQuestionType ? "goWithAction" : "goWithQuestion"
          ).toUpperCase()}
          onClick={() => setIsQuestionType(!isQuestionType)}
        />
      </div>
    </div>
  );
};

export default QuestionsPage;
