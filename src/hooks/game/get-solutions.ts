import axios from "axios";
import { GET_SOLUTIONS_BY_IDS } from "../../apis/apiUrls";

export const fetchSolutionsByIds = async (ids: string[]) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      GET_SOLUTIONS_BY_IDS,
      { ids },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};
