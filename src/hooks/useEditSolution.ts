import { message } from "antd";
import { GET_SOLUTIONS_URL } from "../apis/apiUrls";
import { useSolutions } from "./useSolutions";

export const useEditSolution = (token: string, cardId: string) => {
  const { setRefresh } = useSolutions();
  const handleEditSolution = (
    title: string,
    description: string,
    additionalText: string,
    urlForLiterature?: string,
    urlForTedTalk?: string
  ) => {
    const requestBody = {
      title: title,
      description: description,
      info: additionalText,
      urlForLiterature,
      urlForTedTalk,
    };

    fetch(`${GET_SOLUTIONS_URL}/${cardId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    }).then((res) => {
      if (res.ok) {
        message.success("Solution edited successfully.");
        setRefresh((prev) => !prev);
      } else {
        message.error("Failed to edit solution");
      }
    });
  };

  return { handleEditSolution };
};
