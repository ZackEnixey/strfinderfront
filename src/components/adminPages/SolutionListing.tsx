import {
  Button,
  Checkbox,
  CheckboxProps,
  List,
  Skeleton,
  Collapse,
} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import StrFinderButton from "../reusableParts/StrFinderButton";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SolutionItem, StrengthItem } from "../../types/types";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import CreationPopUp from "../reusableParts/CreationPopUp";
import { useNavigate, useParams } from "react-router-dom";
import { useSolutions } from "../../hooks/useSolutions";
import { useCheckedSolutions } from "../../context/CheckedSoltuionsContext";
import { useCreateSolution } from "../../hooks/useCreateSolution";
import { useEditSolution } from "../../hooks/useEditSolution";

const SolutionListing = () => {
  const darkGreenColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--btnDarkGreen")
    .trim();
  const { checkedSolutions, setCheckedSolutions } = useCheckedSolutions();
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const token = localStorage.getItem("token") || "";
  const { type } = useParams<{ type: string }>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [additionalText, setAdditionalText] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [cardId, setCardId] = useState("");
  const [urlForLiterature, setUrlForLiterature] = useState("");
  const [urlForTedTalk, setUrlForTedTalk] = useState("");
  const { handleAddSolution } = useCreateSolution(token, type);
  const { handleEditSolution } = useEditSolution(token, cardId);

  const navigate = useNavigate();
  const {
    emotionalSolutions,
    mentalSolutions,
    physicalSolutions,
    relationsSolutions,
  } = useSolutions();

  let data: SolutionItem[] = [];

  switch (type) {
    case "emotional":
      data = emotionalSolutions;
      break;
    case "mental":
      data = mentalSolutions;
      break;
    case "physical":
      data = physicalSolutions;
      break;
    case "relations":
      data = relationsSolutions;
      break;
    default:
      break;
  }
  let nextRoute: string;
  switch (type) {
    case "emotional":
      nextRoute = "/solutions/mental";
      break;
    case "mental":
      nextRoute = "/solutions/physical";
      break;
    case "physical":
      nextRoute = "/solutions/relations";
      break;
    case "relations":
      nextRoute = "/questions";
      break;
    default:
      break;
  }

  const checkAll = useMemo(
    () => data.length > 0 && checkedSolutions.length === data.length,
    [data.length, checkedSolutions.length]
  );
  const indeterminate = useMemo(
    () => checkedSolutions.length > 0 && checkedSolutions.length < data.length,
    [checkedSolutions.length, data.length]
  );

  const onCheckAllChange: CheckboxProps["onChange"] = (e) => {
    setCheckedSolutions(e.target.checked ? data.map((item) => item._id) : []);
  };

  const togglePopUp = () => {
    setIsPopUpVisible(!isPopUpVisible);
  };

  const onItemChange = useCallback(
    (item: StrengthItem, checked: boolean) => {
      setCheckedSolutions((prevList) =>
        checked
          ? [...prevList, item._id]
          : prevList.filter((id) => id !== item._id)
      );
    },
    [setCheckedSolutions]
  );
  useEffect(() => {
    localStorage.setItem("selectedSolutions", JSON.stringify(checkedSolutions));
  }, [checkedSolutions]);

  useEffect(() => {
    console.log("isEdit", cardId);
  }, [cardId]);

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
            setUrlForLiterature("");
            setUrlForTedTalk("");
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
            backgroundColor:
              type === "emotional"
                ? "#FF859F"
                : type === "mental"
                ? "#70B1E6"
                : type === "physical"
                ? "#53BD8B"
                : "#FFD700",
          }}
        >
          <InfiniteScroll
            dataLength={data.length}
            next={() => {}}
            hasMore={data.length < 0}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            scrollableTarget="scrollableDiv"
          >
            <List
              dataSource={data}
              renderItem={(item: SolutionItem, index) => (
                <List.Item key={index}>
                  <Checkbox
                    checked={checkedSolutions.includes(item._id)}
                    onChange={(e) => onItemChange(item, e.target.checked)}
                  />
                  <Collapse
                    className={`list-collapse-item ${
                      type === "emotional"
                        ? "bg-pink"
                        : type === "mental"
                        ? "bg-blue"
                        : type === "physical"
                        ? "bg-green"
                        : "bg-yellow"
                    }`}
                  >
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
                      setUrlForLiterature(item.urlForLiterature);
                      setUrlForTedTalk(item.urlForTedTalk);
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
          onClick={() => navigate(`${nextRoute}`)}
          btnColor="green"
          textContent="NEXT"
        />
      </div>
      {isPopUpVisible && (
        <CreationPopUp
          initialTitle={title}
          initialDescription={description}
          initialText={additionalText}
          initialTedUrl={urlForLiterature}
          initialLiteratureUrl={urlForTedTalk}
          text="solution"
          handleSubmit={isEdit ? handleEditSolution : handleAddSolution}
          onClose={togglePopUp}
          isSolutionCard={true}
          isEdit={isEdit}
        />
      )}
    </div>
  );
};

export default SolutionListing;
