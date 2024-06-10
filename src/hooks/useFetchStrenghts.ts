// useFetchStrengths.ts
import { useState, useEffect } from "react";
import { message } from "antd";
import { GET_STRENGTHS_URL } from "../apis/apiUrls";
export const useFetchStrengths = (id: string, type: string, token: string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    if (loading) return;

    setLoading(true);
    const url = `${GET_STRENGTHS_URL}/${id}?type=${type}`;

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
  }, [id, type, token]);

  return { data, loading, fetchData };
};
