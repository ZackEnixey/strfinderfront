import { useState, useEffect } from "react";
import { message } from "antd";
import { GET_QUESTIONS_URL } from "../apis/apiUrls";
import { StrengthItem } from "../types/types";

export const useFetchQuestions = (
  id: string,
  type: string,
  token: string,
  refresh: boolean
) => {
  const [data, setData] = useState<StrengthItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    if (loading) return;

    setLoading(true);
    const url = `${GET_QUESTIONS_URL}/${id}?type=${type}`;

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((body) => {
        setData(body.data);
        setLoading(false);
      })
      .catch(() => {
        message.error("Failed to fetch data");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [id, type, token, refresh]);

  return { data, loading, fetchData };
};
