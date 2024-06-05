import { Button, Divider, List, Skeleton, message } from "antd";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import StrFinderButton from "../reusableParts/StrFinderButton";
import { getUserId } from "../../utils/decodedToken";
import { GET_USER_INFOS, DELETE_GAME_CODE } from "../../apis/apiUrls";

const DashboardPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token") || "";
  const userId = getUserId(token);

  const fetchData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(`${GET_USER_INFOS}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((body) => {
        setData(body.gameCodes);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleDelete = (gameCode: string) => {
    const requestBody = {
      userId: userId,
      gameCode: gameCode,
    };
    fetch(`${DELETE_GAME_CODE}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    }).then((res) => {
      if (res.ok) {
        setData(data.filter((code) => code !== gameCode));
        message.success("Game code deleted successfully.");
      } else {
        message.error("Failed to delete game code.");
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <div>
        <div className="main-label">YOUR GAME CODES:</div>
        <div
          id="scrollableDiv"
          style={{
            height: 400,
            overflow: "auto",
            padding: "0 16px",
            border: "1px solid rgba(140, 140, 140, 0.35)",
          }}
        >
          <InfiniteScroll
            dataLength={data.length}
            next={fetchData}
            hasMore={data.length < 0}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>No more game codes</Divider>}
            scrollableTarget="scrollableDiv"
          >
            <List
              dataSource={data}
              renderItem={(item, index) => (
                <List.Item key={index}>
                  <List.Item.Meta
                    title={<a href="https://ant.design">{item}</a>}
                  />
                  <div className="buttons">
                    <Button
                      type="text"
                      shape="circle"
                      icon={<EditOutlined />}
                    />{" "}
                    <Button
                      type="text"
                      shape="circle"
                      icon={<DeleteOutlined />}
                      onClick={() => handleDelete(item)}
                    />{" "}
                  </div>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      </div>
      <div>
        <p className="description">If you want to create a new game:</p>
        <StrFinderButton btnColor="green" textContent="CREATE A NEW MATCH" />
      </div>
    </div>
  );
};

export default DashboardPage;
