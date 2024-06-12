import React from "react";
import { Button, Divider, List, Skeleton } from "antd";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import StrFinderButton from "../reusableParts/StrFinderButton";
import { useFetchUserGameCodes } from "../../hooks/useFetchUserGameCodes";
import { useDeleteGameCode } from "../../hooks/useDeleteGameCode";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || "";
  const { data, fetchData, setData } = useFetchUserGameCodes(token);
  const { handleDelete } = useDeleteGameCode(token, setData);

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
            dataLength={data && data.length}
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
        <div></div>
        <StrFinderButton
          onClick={() => navigate("/strengths")}
          btnColor="green"
          textContent="CREATE A NEW MATCH"
        />
      </div>
    </div>
  );
};

export default DashboardPage;
