import { message } from "antd";
import { GET_QUESTIONS_URL } from "../apis/apiUrls";

export const useEditQuestion = (
  token: string,
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>,
  cardId: string
) => {
  const handleEditQuestion = (
    title: string,
    description: string,
    additionalText: string
  ) => {
    const requestBody = {
      title: title,
      description: description,
      additionalText: additionalText,
    };

    fetch(`${GET_QUESTIONS_URL}/${cardId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    }).then((res) => {
      if (res.ok) {
        message.success("Question edited successfully.");
        setRefresh((prev) => !prev);
      } else {
        message.error("Failed to edit question");
      }
    });
  };

  return { handleEditQuestion };
};
