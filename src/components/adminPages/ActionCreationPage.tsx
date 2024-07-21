import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, CheckboxProps, List, Skeleton, Collapse } from "antd";
import { useTranslation } from "react-i18next";

import StrFinderButton from "../reusableParts/StrFinderButton";
import { getUserId } from "../../utils/decodedToken";
import { ActionItem } from "../../types/types";
import CreationPopUp from "../reusableParts/CreationPopUp";
import { useFetchActions } from "../../hooks/useFetchActions";
import { useCreateAction } from "../../hooks/useCreateAction";
import { useEditAction } from "../../hooks/useEditAction";
import ProgressBarGameTemplate from "./ProgressBarGameTemplate";

const ActionCreationPage = () => {
  const darkGreenColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--btnDarkGreen")
    .trim();
  const [isPopUpVisible, setIsPopUpVisible] = useState<boolean>(false);
  const [checkedActions, setCheckedActions] = useState<string[]>(() => {
    const saved = localStorage.getItem("selectedActions");
    return saved ? JSON.parse(saved) : [];
  });
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [additionalText, setAdditionalText] = useState<string>("");
  const [numberOfUpperTokens, setNumberOfUpperTokens] = useState(0);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [cardId, setCardId] = useState<string>("");
  const [refresh, setRefresh] = useState<boolean>(false);

  const { t } = useTranslation();
  const token = localStorage.getItem("token") || "";
  const id = getUserId(token) || "";
  const navigate = useNavigate();
  const { type } = useParams();
  const { handleAddAction } = useCreateAction(token, setRefresh);
  const { handleEditAction } = useEditAction(token, setRefresh, cardId);
  const { data, fetchData } = useFetchActions(id, type!, token, refresh);

  const onCheckAllChange: CheckboxProps["onChange"] = useCallback(
    (e: CheckboxChangeEvent) => {
      setCheckedActions(e.target.checked ? data.map((item) => item._id) : []);
    },
    [data, setCheckedActions]
  );

  const handleNavigation = () => {
    navigate("/gameCreationPage");
  };

  const togglePopUp = () => {
    setIsPopUpVisible(!isPopUpVisible);
  };

  const onItemChange = useCallback(
    (item: ActionItem, checked: boolean) => {
      setCheckedActions((prevList) =>
        checked
          ? [...prevList, item._id]
          : prevList.filter((id) => id !== item._id)
      );
    },
    [setCheckedActions]
  );

  useEffect(() => {
    localStorage.setItem("selectedActions", JSON.stringify(checkedActions));
  }, [checkedActions]);

  const checkAll = useMemo(
    () => data.length > 0 && checkedActions.length === data.length,
    [data.length, checkedActions.length]
  );

  const indeterminate = useMemo(
    () => checkedActions.length > 0 && checkedActions.length < data.length,
    [checkedActions.length, data.length]
  );

  return (
    <div className={`generic_game_content_holder ${isPopUpVisible ? "overlay" : ""}`}>
     <div className="game_input_holder">

      <div className="admin_bar_wrapper">
        <div className="check-all-container">
          <div className="check-all">
            <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}
            />
            <div className="check-all-label">{t('selectAll')}</div>
          </div>
        </div>
        <div
          className="add-icon-container"
          onClick={() => {
            setIsEdit(false);
            setAdditionalText("");
            setDescription("");
            setTitle("");
            setNumberOfUpperTokens(0);
            togglePopUp();
          }}
        >
          <Button type="primary" style={{ backgroundColor: darkGreenColor }}>
            {t('all')}
            <PlusOutlined />
          </Button>
        </div>
      </div>
        
        <div
          id="scrollableDiv"
          className="scrollable_cards_wrapper"
        >
          <InfiniteScroll
            dataLength={data.length}
            next={fetchData}
            hasMore={data.length < 0}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            scrollableTarget="scrollableDiv"
          >
            <List
              dataSource={data}
              renderItem={(item: ActionItem, index) => (
                <List.Item key={index}>
                  <Checkbox
                    checked={checkedActions.includes(item._id)}
                    onChange={(e) => onItemChange(item, e.target.checked)}
                  />
                  <Collapse className="list-collapse-item">
                    <Collapse.Panel header={item.title} key={index}>
                      <p>{item.description}</p>
                    </Collapse.Panel>
                  </Collapse>
                  <Button
                    type="text"
                    shape="circle"
                    icon={<EditOutlined />}
                    onClick={() => {
                      setIsEdit(true);
                      setTitle(item.title);
                      setCardId(item._id);
                      setDescription(item.description);
                      setAdditionalText(item.additionalText);
                      setNumberOfUpperTokens(item.numberOfUpperTokens);
                      togglePopUp();
                    }}
                  />
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      </div>
     
      <div>
        <ProgressBarGameTemplate />
        <StrFinderButton
          onClick={handleNavigation}
          btnColor="green"
          textContent="NEXT"
        />
      </div>

      {isPopUpVisible && (
        <CreationPopUp
          initialTitle={title}
          initialDescription={description}
          initialText={additionalText}
          initialNumber={numberOfUpperTokens}
          text="action"
          isEdit={isEdit}
          handleSubmit={isEdit ? handleEditAction : handleAddAction}
          onClose={togglePopUp}
          isActionCard={true}
        />
      )}
    </div>
  );
};

export default ActionCreationPage;
