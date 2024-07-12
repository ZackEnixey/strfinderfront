import { useState, useEffect } from "react";
import { message } from "antd";
import { GET_ACTIONS_URL } from "../apis/apiUrls";
import { ActionItem } from "../types/types";

export const useFetchActions = (
  id: string,
  type: string,
  token: string,
  refresh: boolean
) => {
  const [data, setData] = useState<ActionItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    if (loading) return;

    setLoading(true);
    const url = `${GET_ACTIONS_URL}/${id}?type=${type}`;

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
