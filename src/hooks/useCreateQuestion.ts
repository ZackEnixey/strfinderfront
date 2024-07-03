import { message } from "antd";
import { GET_QUESTIONS_URL } from "../apis/apiUrls";
import { getUserEmail } from "../utils/decodedToken";

export const useCreateQuestion = (
  token: string,
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const handleAddQuestion = (
    title: string,
    description: string,
    additionalText: string
  ) => {
    const userEmail = getUserEmail(token);
    const requestBody = {
      email: userEmail,
      title: title,
      description: description,
      additionalText: additionalText,
    };

    fetch(GET_QUESTIONS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    }).then((res) => {
      if (res.ok) {
        message.success("New Question added successfully.");
        setRefresh((prev) => !prev);
      } else {
        message.error("Failed to add new question");
      }
    });
  };

  return { handleAddQuestion };
};
