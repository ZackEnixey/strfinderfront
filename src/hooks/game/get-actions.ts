import axios from "axios";
import { GET_ACTIONS_BY_IDS } from "../../apis/apiUrls";

export const fetchActionsByIds = async (ids: string[]) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      GET_ACTIONS_BY_IDS,
      { ids },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching Actions:", error);
    throw error;
  }
};
