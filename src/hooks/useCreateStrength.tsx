import { message } from "antd";
import { GET_STRENGTHS_URL } from "../apis/apiUrls";
import { getUserEmail} from "../utils/decodedToken";


export const useCreateStrength = (token: string,setRefresh: React.Dispatch<React.SetStateAction<boolean>>) => {
  const handleAddStrength = (title: string,description:string,additionalText:string) => {
    const userEmail = getUserEmail(token);
    const requestBody = {
      email: userEmail,
      title:title,
      description:description,
      additionalText:additionalText
    };

    fetch(GET_STRENGTHS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    }).then((res) => {
      if (res.ok) {
        message.success("New Strength added successfully.");
        setRefresh((prev)=>!prev)
      } else {
        message.error("Failed to add new strength");
      }
    });
  };

  return { handleAddStrength };
};
