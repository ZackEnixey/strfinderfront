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

const AdminDashboardPage: React.FC = () => {
  const [refresh, setRefresh] = useState<boolean>(false);

  const navigate = useNavigate();
  const { t } = useTranslation();
  const token = localStorage.getItem("token") || "";
  const { data, fetchData } = useFetchUserGameCodes(token, refresh);
  const { deleteGame } = useDeleteGame(token, setRefresh);
  const { updateMode } = useMode();

  useEffect(() => {
    updateMode("create");
  }, [updateMode]);

  const handleEdit = (item: any) => {
    updateMode("edit");

    localStorage.setItem("gameId", item._id);
    localStorage.setItem("gameTitle", item.gameTitle);
    localStorage.setItem("selectedStrengths", JSON.stringify(item.preselectedStrengthIds));
    localStorage.setItem("selectedSolutions", JSON.stringify(item.preselectedSolutionIds));
    localStorage.setItem("selectedQuestions", JSON.stringify(item.preselectedQuestionIds));
    localStorage.setItem("selectedActions", JSON.stringify(item.preselectedActionIds));

    navigate("/strengths");
  }

  return (
    <div className="generic_game_content_holder">
      <div className="game_input_holder">
        <div className="main-label">{t("yourGameCodes")}</div>
        <div
          id="scrollableDiv"
          className="code_background"
        >
          <InfiniteScroll
            dataLength={data ? data.length : 0}
            next={fetchData}
            hasMore={data && data.length > 0}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>{t("noMoreGameCodes")}</Divider>}
            scrollableTarget="scrollableDiv"
          >
            <List
              dataSource={data ? [...data].reverse() : []}
              renderItem={(item: GameTemplateItem, index) => (
                <List.Item key={index}>
                  <List.Item.Meta
                    title={
                      <div>
                        <div>{item.gameTitle}</div>
                        <div>{item.gameTemplateId}</div>
                      </div>
                    }
                  />
                  <div className="buttons">
                    <Button
                      type="text"
                      shape="circle"
                      icon={<EditOutlined />}
                      onClick={() => handleEdit(item)}
                    />
                    <Button
                      type="text"
                      shape="circle"
                      icon={<DeleteOutlined />}
                      onClick={() => deleteGame(item._id)}
                    />
                  </div>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      </div>

      <div className="generic_button_holder">
        <div className="description">{t("youCreateNewGame")}</div>
        <StrFinderButton
          onClick={() => navigate("/strengths")}
          btnColor="green"
          btnWidth="revert-layer"
          textContent={t('createNewMatch').toUpperCase()}
        />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
