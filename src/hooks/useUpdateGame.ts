import { message } from "antd";
import { GET_GAMES } from "../apis/apiUrls";

export const useUpdateGame = (token: string) => {
  const handleUpdateGame = async (title: string) => {
    const preselectedSolutionIds =
      localStorage.getItem("selectedSolutions" || []) || "";
    const preselectedStrengthIds =
      localStorage.getItem("selectedStrengths" || []) || "";
    const preselectedQuestionIds =
      localStorage.getItem("selectedQuestions" || []) || "";
    const preselectedActionIds =
      localStorage.getItem("selectedActions" || []) || "";
    const gameId = localStorage.getItem("gameId");
    const requestBody = {
      gameTitle: title,
      preselectedSolutionIds: JSON.parse(preselectedSolutionIds),
      preselectedStrengthIds: JSON.parse(preselectedStrengthIds),
      preselectedQuestionIds: JSON.parse(preselectedQuestionIds),
      preselectedActionIds: JSON.parse(preselectedActionIds),
    };
    try {
      const res = await fetch(`${GET_GAMES}/${gameId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (res.ok) {
        message.success("Game updated successfully");
      } else {
        message.error("Failed to update game");
      }
    } catch (error) {
      message.error("An error occurred while updating the game");
    }
  };

  return { handleUpdateGame };
};
