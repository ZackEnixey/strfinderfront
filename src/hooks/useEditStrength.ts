import { message } from "antd";
import { GET_STRENGTHS_URL } from "../apis/apiUrls";

export const useEditStrength = (
  token: string,
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>,
  cardId: string
) => {
  const handleEditStrength = (
    title: string,
    description: string,
    additionalText: string
  ) => {
    const requestBody = {
      title: title,
      description: description,
      additionalText: additionalText,
    };

    fetch(`${GET_STRENGTHS_URL}/${cardId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    }).then((res) => {
      if (res.ok) {
        message.success("Strength edited successfully.");
        setRefresh((prev) => !prev);
      } else {
        message.error("Failed to edit strength");
      }
    });
  };

  return { handleEditStrength };
};
