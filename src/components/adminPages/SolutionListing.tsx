import { Checkbox, CheckboxProps, Divider, List, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { Collapse } from "antd";
import StrFinderButton from "../reusableParts/StrFinderButton";
import { useCallback, useEffect, useMemo, useState } from "react";
import { StrengthItem } from "../../types/types";
import { PlusSquareOutlined } from "@ant-design/icons";
import CreationPopUp from "../reusableParts/CreationPopUp";
import { useNavigate, useParams } from "react-router-dom";
import { useSolutions } from "../../hooks/useSolutions";
import { useCheckedSolutions } from "../../context/CheckedSoltuionsContext";

const SolutionListing = () => {
  const { checkedSolutions, setCheckedSolutions } = useCheckedSolutions();
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const navigate = useNavigate();
  const { type } = useParams<{ type: string }>();
  const {
    emotionalSolutions,
    mentalSolutions,
    physicalSolutions,
    relationsSolutions,
  } = useSolutions();

  let data: StrengthItem[] = [];

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
      nextRoute = "mental";
      break;
    case "mental":
      nextRoute = "physical";
      break;
    case "physical":
      nextRoute = "relations";
      break;
    case "relations":
      nextRoute = "emotional";
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
            endMessage={<Divider plain>No more strengths</Divider>}
            scrollableTarget="scrollableDiv"
          >
            <List
              dataSource={data}
              renderItem={(item: StrengthItem, index) => (
                <List.Item key={index}>
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
                  <Checkbox
                    checked={checkedSolutions.includes(item._id)}
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
          onClick={() => navigate(`/solutions/${nextRoute}`)}
          btnColor="green"
          textContent="NEXT"
        />
      </div>
      {isPopUpVisible && (
        <CreationPopUp
          text="strength"
          handleSubmit={() => {}}
          onClose={togglePopUp}
          isSolutionCard={true}
        />
      )}
    </div>
  );
};

export default SolutionListing;
