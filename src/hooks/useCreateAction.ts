import { message } from "antd";
import { GET_ACTIONS_URL } from "../apis/apiUrls";
import { getUserEmail } from "../utils/decodedToken";

export const useCreateAction = (
  token: string,
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const handleAddAction = (
    title: string,
    description: string,
    additionalText: string,
    urlForTedTalk?: string,
    urlForLiterature?: string,
    numberOfUpperTokens?: number
  ) => {
    const userEmail = getUserEmail(token);
    const requestBody = {
      email: userEmail,
      title: title,
      description: description,
      additionalText: additionalText,
      numberOfUpperTokens: numberOfUpperTokens,
      custom: true,
    };

    fetch(GET_ACTIONS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    }).then((res) => {
      if (res.ok) {
        message.success("New Action added successfully.");
        setRefresh((prev) => !prev);
      } else {
        message.error("Failed to add new action");
      }
    });
  };

  return { handleAddAction };
};
