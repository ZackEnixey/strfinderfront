import { Button, Checkbox, CheckboxProps, List, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate, useParams } from "react-router-dom";
import { Collapse } from "antd";
import StrFinderButton from "../reusableParts/StrFinderButton";
import { getUserId } from "../../utils/decodedToken";
import { useCallback, useEffect, useMemo, useState } from "react";
import { StrengthItem } from "../../types/types";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import CreationPopUp from "../reusableParts/CreationPopUp";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useFetchQuestions } from "../../hooks/useFetchQuestions";
import { useCreateQuestion } from "../../hooks/useCreateQuestion";
import { useEditQuestion } from "../../hooks/useEditQuestion";

const QuestionCreationPage = () => {
  const darkGreenColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--btnDarkGreen")
    .trim();
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [checkedQuestions, setCheckedQuestions] = useState<string[]>(() => {
    const saved = localStorage.getItem("selectedQuestions");
    return saved ? JSON.parse(saved) : [];
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [additionalText, setAdditionalText] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [cardId, setCardId] = useState("");
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const { type } = useParams();
  const token = localStorage.getItem("token") || "";
  const id = getUserId(token) || "";
  const { data, fetchData } = useFetchQuestions(id, type!, token, refresh);
  const { handleAddQuestion } = useCreateQuestion(token, setRefresh);
  const { handleEditQuestion } = useEditQuestion(token, setRefresh, cardId);

  const onCheckAllChange: CheckboxProps["onChange"] = useCallback(
    (e: CheckboxChangeEvent) => {
      setCheckedQuestions(e.target.checked ? data.map((item) => item._id) : []);
    },
    [data, setCheckedQuestions]
  );
  const handleNavigation = () => {
    navigate("/actions");
  };

  const togglePopUp = () => {
    setIsPopUpVisible(!isPopUpVisible);
  };

  const onItemChange = useCallback(
    (item: StrengthItem, checked: boolean) => {
      setCheckedQuestions((prevList) =>
        checked
          ? [...prevList, item._id]
          : prevList.filter((id) => id !== item._id)
      );
    },
    [setCheckedQuestions]
  );
  useEffect(() => {
    localStorage.setItem("selectedQuestions", JSON.stringify(checkedQuestions));
  }, [checkedQuestions]);

  const checkAll = useMemo(
    () => data.length > 0 && checkedQuestions.length === data.length,
    [data.length, checkedQuestions.length]
  );
  const indeterminate = useMemo(
    () => checkedQuestions.length > 0 && checkedQuestions.length < data.length,
    [checkedQuestions.length, data.length]
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
              renderItem={(item: StrengthItem, index) => (
                <List.Item key={index}>
                  <Checkbox
                    checked={checkedQuestions.includes(item._id)}
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
          text="question"
          handleSubmit={isEdit ? handleEditQuestion : handleAddQuestion}
          isEdit={isEdit}
          onClose={togglePopUp}
        />
      )}
    </div>
  );
};

export default QuestionCreationPage;
