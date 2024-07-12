import { message } from "antd";
import { GET_GAMES } from "../apis/apiUrls";
import { getUserEmail } from "../utils/decodedToken";

export const useCreateGame = (token: string) => {
  const handleAddGame = async (title: string) => {
    const preselectedSolutionIds =
      localStorage.getItem("selectedSolutions" || []) || "";
    const preselectedStrengthIds =
      localStorage.getItem("selectedStrengths" || []) || "";
    const preselectedQuestionIds =
      localStorage.getItem("selectedQuestions" || []) || "";
    const preselectedActionIds =
      localStorage.getItem("selectedActions" || []) || "";
    const userEmail = getUserEmail(token);
    const requestBody = {
      createdByEmail: userEmail,
      gameTitle: title,
      preselectedSolutionIds: JSON.parse(preselectedSolutionIds),
      preselectedStrengthIds: JSON.parse(preselectedStrengthIds),
      preselectedQuestionIds: JSON.parse(preselectedQuestionIds),
      preselectedActionIds: JSON.parse(preselectedActionIds),
    };
    try {
      const res = await fetch(GET_GAMES, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (res.ok) {
        const data = await res.json();
        const gameCode = data.gameCode;
        message.success("New Game added successfully.");
        localStorage.setItem("gameCode", gameCode);
      } else {
        message.error("Failed to add new game");
      }
    } catch (error) {
      message.error("An error occurred while adding the game");
    }
  };

  return { handleAddGame };
};
