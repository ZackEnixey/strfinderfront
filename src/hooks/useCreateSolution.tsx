import { message } from "antd";
import { GET_SOLUTIONS_URL } from "../apis/apiUrls";
import { getUserEmail } from "../utils/decodedToken";
import { useSolutions } from "./useSolutions";

export const useCreateSolution = (token: string, type?: string) => {
  const { setRefresh } = useSolutions();
  const handleAddSolution = (
    title: string,
    description: string,
    additionalText: string,
    urlForTedTalk?: string,
    urlForLiterature?: string
  ) => {
    const userEmail = getUserEmail(token);
    const formattedType = type
      ? type.charAt(0).toUpperCase() + type.slice(1)
      : undefined;
    const requestBody = {
      createdByEmail: userEmail,
      title: title,
      description: description,
      info: additionalText,
      custom: true,
      type: formattedType,
      urlForTedTalk: urlForTedTalk,
      urlForLiterature: urlForLiterature,
    };

    fetch(GET_SOLUTIONS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    }).then((res) => {
      if (res.ok) {
        message.success("New Solution added successfully.");
        setRefresh((prev) => !prev);
      } else {
        message.error("Failed to add new solution");
      }
    });
  };

  return { handleAddSolution };
};
