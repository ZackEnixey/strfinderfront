import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { GET_GAMES } from "../apis/apiUrls";
import { getUserId } from "../utils/decodedToken";
import { GameTemplateItem } from "../types/types";

interface UseFetchUserGameCodesReturn {
  data: GameTemplateItem[];
  loading: boolean;
  fetchData: () => void;
  setData: Dispatch<SetStateAction<GameTemplateItem[]>>;
}

export const useFetchUserGameCodes = (
  token: string,
  refresh: boolean
): UseFetchUserGameCodesReturn => {
  const [data, setData] = useState<GameTemplateItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = () => {
    if (loading) return;

    setLoading(true);
    const userId = getUserId(token);

    fetch(`${GET_GAMES}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((body) => {
        setData(body);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  return { data, loading, fetchData, setData };
};
