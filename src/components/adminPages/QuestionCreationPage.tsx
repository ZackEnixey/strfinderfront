import { Checkbox, CheckboxProps, List, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate, useParams } from "react-router-dom";
import { Collapse } from "antd";
import StrFinderButton from "../reusableParts/StrFinderButton";
import { getUserId } from "../../utils/decodedToken";
import { useCallback, useEffect, useMemo, useState } from "react";
import { StrengthItem } from "../../types/types";
import { PlusSquareOutlined } from "@ant-design/icons";
import CreationPopUp from "../reusableParts/CreationPopUp";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useFetchQuestions } from "../../hooks/useFetchQuestions";
import { useCreateQuestion } from "../../hooks/useCreateQuestion";

const QuestionCreationPage = () => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [checkedQuestions, setCheckedQuestions] = useState<string[]>(() => {
    const saved = localStorage.getItem("selectedQuestions");
    return saved ? JSON.parse(saved) : [];
  });
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const { type } = useParams();
  const token = localStorage.getItem("token") || "";
  const id = getUserId(token) || "";
  const { data, fetchData } = useFetchQuestions(id, type!, token, refresh);
  const { handleAddQuestion } = useCreateQuestion(token, setRefresh);
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
        <div className="add-icon-container" onClick={togglePopUp}>
          <PlusSquareOutlined style={{ fontSize: "20px", color: "#1C274C" }} />
        </div>
        <div className="check-all-container">
          <div className="check-all">
            <div className="check-all-label">Select all</div>
            <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}
            />
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
                  <Collapse className="list-collapse-item">
                    <Collapse.Panel header={item.title} key={index}>
                      <p>{item.description}</p>
                    </Collapse.Panel>
                  </Collapse>
                  <Checkbox
                    checked={checkedQuestions.includes(item._id)}
                    onChange={(e) => onItemChange(item, e.target.checked)}
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
          text="strength"
          handleSubmit={handleAddQuestion}
          onClose={togglePopUp}
        />
      )}
    </div>
  );
};

export default QuestionCreationPage;
