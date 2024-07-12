import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Divider, List, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import StrFinderButton from "../reusableParts/StrFinderButton";
import { useFetchUserGameCodes } from "../../hooks/useFetchUserGameCodes";
import { GameTemplateItem } from "../../types/types";
import { useDeleteGame } from "../../hooks/useDeleteGame";
import { useMode } from "../../context/ModeContext";

const DashboardPage: React.FC = () => {
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const token = localStorage.getItem("token") || "";
  const { data, fetchData } = useFetchUserGameCodes(token, refresh);
  const { deleteGame } = useDeleteGame(token, setRefresh);
  const { updateMode } = useMode();

  useEffect(() => {
    updateMode("create");
  }, []);
  return (
    <div className="dashboard-container">
      <div>
        <div className="main-label">{t("yourGameCodes")}:</div>
        <div
          id="scrollableDiv"
          style={{
            height: "58vh",
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
            endMessage={<Divider plain>{t("noMoreGameCodes")}</Divider>}
            scrollableTarget="scrollableDiv"
          >
            <List
              dataSource={data}
              renderItem={(item: GameTemplateItem, index) => (
                <List.Item key={index}>
                  <List.Item.Meta
                    title={
                      <div>
                        <div>{item.gameTitle}</div>
                        <div>{item.gameTemplateId}</div>{" "}
                      </div>
                    }
                  />
                  <div className="buttons">
                    <Button
                      type="text"
                      shape="circle"
                      icon={<EditOutlined />}
                      onClick={() => {
                        updateMode("edit");
                        localStorage.setItem("gameId", item._id);
                        localStorage.setItem("gameTitle", item.gameTitle);
                        localStorage.setItem(
                          "selectedStrengths",
                          JSON.stringify(item.preselectedStrengthIds)
                        );
                        localStorage.setItem(
                          "selectedSolutions",
                          JSON.stringify(item.preselectedSolutionIds)
                        );
                        localStorage.setItem(
                          "selectedQuestions",
                          JSON.stringify(item.preselectedQuestionIds)
                        );
                        localStorage.setItem(
                          "selectedActions",
                          JSON.stringify(item.preselectedActionIds)
                        );
                        navigate("/strengths");
                      }}
                    />{" "}
                    <Button
                      type="text"
                      shape="circle"
                      icon={<DeleteOutlined />}
                      onClick={() => deleteGame(item._id)}
                    />{" "}
                  </div>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      </div>
      <div>
        <p className="description">{t("youCreateNewGame")}:</p>
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
