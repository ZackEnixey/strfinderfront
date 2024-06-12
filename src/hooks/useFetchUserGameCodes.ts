import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { GET_USER_INFOS } from "../apis/apiUrls";
import { getUserId } from "../utils/decodedToken";

// Define the type for the fetch data response
interface FetchDataResponse {
  gameCodes: string[];
}

// Define the type for the return value of the hook
interface UseFetchUserGameCodesReturn {
  data: string[];
  loading: boolean;
  fetchData: () => void;
  setData: Dispatch<SetStateAction<string[]>>;
}

export const useFetchUserGameCodes = (
  token: string
): UseFetchUserGameCodesReturn => {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    if (loading) return;

    setLoading(true);
    const userId = getUserId(token);

    fetch(`${GET_USER_INFOS}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((body: FetchDataResponse) => {
        setData(body.gameCodes);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, fetchData, setData };
};
