import { Dispatch, SetStateAction } from "react";
import { message } from "antd";
import { DELETE_GAME_CODE } from "../apis/apiUrls";
import { getUserId } from "../utils/decodedToken";

// Define the type for setData
type SetDataType = Dispatch<SetStateAction<string[]>>;

export const useDeleteGameCode = (token: string, setData: SetDataType) => {
  const handleDelete = (gameCode: string) => {
    const userId = getUserId(token);
    const requestBody = {
      userId: userId,
      gameCode: gameCode,
    };

    fetch(`${DELETE_GAME_CODE}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    }).then((res) => {
      if (res.ok) {
        setData((prevData) => prevData.filter((code) => code !== gameCode));
        message.success("Game code deleted successfully.");
      } else {
        message.error("Failed to delete game code.");
      }
    });
  };

  return { handleDelete };
};
