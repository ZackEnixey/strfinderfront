import { message } from "antd";
import { GET_GAMES } from "../apis/apiUrls";
import { Dispatch, SetStateAction } from "react";

type setRefreshType = Dispatch<SetStateAction<boolean>>;
export const useDeleteGame = (token: string, setRefresh: setRefreshType) => {
  const deleteGame = async (gameId: string) => {
    console.log(gameId);
    try {
      const res = await fetch(`${GET_GAMES}/${gameId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setRefresh((prevData) => !prevData);
        message.success(data.message || "Game deleted successfully.");
        return true;
      } else {
        const errorData = await res.json();
        message.error(errorData.message || "Failed to delete game");
        return false;
      }
    } catch (error) {
      message.error("An error occurred while deleting the game");
      return false;
    }
  };

  return { deleteGame };
};
