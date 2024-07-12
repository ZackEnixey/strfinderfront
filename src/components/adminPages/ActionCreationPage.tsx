import { Button, Checkbox, CheckboxProps, List, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate, useParams } from "react-router-dom";
import { Collapse } from "antd";
import StrFinderButton from "../reusableParts/StrFinderButton";
import { getUserId } from "../../utils/decodedToken";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ActionItem } from "../../types/types";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import CreationPopUp from "../reusableParts/CreationPopUp";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useFetchActions } from "../../hooks/useFetchActions";
import { useCreateAction } from "../../hooks/useCreateAction";
import { useEditAction } from "../../hooks/useEditAction";

const ActionCreationPage = () => {
  const darkGreenColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--btnDarkGreen")
    .trim();
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [checkedActions, setCheckedActions] = useState<string[]>(() => {
    const saved = localStorage.getItem("selectedActions");
    return saved ? JSON.parse(saved) : [];
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [additionalText, setAdditionalText] = useState("");
  const [numberOfUpperTokens, setNumberOfUpperTokens] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [cardId, setCardId] = useState("");
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const { type } = useParams();
  const token = localStorage.getItem("token") || "";
  const { handleAddAction } = useCreateAction(token, setRefresh);
  const id = getUserId(token) || "";
  const { handleEditAction } = useEditAction(token, setRefresh, cardId);
  const { data, fetchData } = useFetchActions(id, type!, token, refresh);
  const onCheckAllChange: CheckboxProps["onChange"] = useCallback(
    (e: CheckboxChangeEvent) => {
      setCheckedActions(e.target.checked ? data.map((item) => item._id) : []);
    },
    [data, setCheckedActions]
  );
  const handleNavigation = () => {
    navigate("/create-game");
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
    <div className={`dashboard-container ${isPopUpVisible ? "overlay" : ""}`}>
      <div>
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
            Add
            <PlusOutlined />
          </Button>
        </div>
        <div className="check-all-container">
          <div className="check-all">
            <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}
            />
            <div className="check-all-label">Select all</div>
          </div>
        </div>
        <div
          id="scrollableDiv"
          style={{
            height: "58vh",
            overflow: "auto",
            border: "1px solid rgba(140, 140, 140, 0.35)",
            borderRadius: "8px",
          }}
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
