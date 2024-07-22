import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button, Checkbox, CheckboxProps, List, Skeleton, Collapse } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useTranslation } from 'react-i18next';

import StrFinderButton from "../reusableParts/StrFinderButton";
import { getUserId } from "../../utils/decodedToken";
import { StrengthItem } from "../../types/types";
import CreationPopUp from "../reusableParts/CreationPopUp";
import { useFetchQuestions } from "../../hooks/useFetchQuestions";
import { useCreateQuestion } from "../../hooks/useCreateQuestion";
import { useEditQuestion } from "../../hooks/useEditQuestion";
import ProgressBarGameTemplate from "./ProgressBarGameTemplate";

const QuestionCreationPage = () => {
  const darkGreenColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--btnDarkGreen")
    .trim();
  const [isPopUpVisible, setIsPopUpVisible] = useState<boolean>(false);
  const [checkedQuestions, setCheckedQuestions] = useState<string[]>(() => {
    const saved = localStorage.getItem("selectedQuestions");
    return saved ? JSON.parse(saved) : [];
  });
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [additionalText, setAdditionalText] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [cardId, setCardId] = useState<string>("");
  const [refresh, setRefresh] = useState<boolean>(false);

  const { t } = useTranslation();
  const token = localStorage.getItem("token") || "";
  const id = getUserId(token) || "";
  const navigate = useNavigate();
  const { type } = useParams();
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
        <ProgressBarGameTemplate />
        <StrFinderButton
          onClick={handleNavigation}
          btnColor="green"
          textContent="NEXT"
          btnWidth="revert-layer"
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
          popUpColor="green"
        />
      )}
    </div>
  );
};

export default QuestionCreationPage;
