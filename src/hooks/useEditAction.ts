import { message } from "antd";
import { GET_ACTIONS_URL } from "../apis/apiUrls";

export const useEditAction = (
  token: string,
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>,
  cardId: string
) => {
  const handleEditAction = (
    title: string,
    description: string,
    additionalText: string,
    urlForTedTalk?: string,
    urlForLiterature?: string,
    numberOfUpperTokens?: number
  ) => {
    const requestBody = {
      title,
      description,
      additionalText,
      numberOfUpperTokens,
    };

    fetch(`${GET_ACTIONS_URL}/${cardId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    }).then((res) => {
      if (res.ok) {
        message.success("Action edited successfully.");
        setRefresh((prev) => !prev);
      } else {
        message.error("Failed to edit action");
      }
    });
  };

  return { handleEditAction };
};
