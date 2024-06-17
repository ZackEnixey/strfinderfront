import { Checkbox, CheckboxProps, Divider, List, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { Collapse } from "antd";
import StrFinderButton from "../reusableParts/StrFinderButton";
import { useState } from "react";
import { StrengthItem } from "../../types/types";
import { PlusSquareOutlined } from "@ant-design/icons";
import CreationPopUp from "../reusableParts/CreationPopUp";
import { useParams } from "react-router-dom";
import { useSolutions } from "../../hooks/useSolutions";

const SolutionListing = () => {
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
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

  const checkAll = data.length > 0 && checkedList.length === data.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < data.length;

  const onCheckAllChange: CheckboxProps["onChange"] = (e) => {
    setCheckedList(e.target.checked ? data.map((item) => item.title) : []);
  };

  const togglePopUp = () => {
    setIsPopUpVisible(!isPopUpVisible);
  };

  const onItemChange = (item: StrengthItem, checked: boolean) => {
    setCheckedList((prevList) => {
      if (checked) {
        return [...prevList, item.title];
      } else {
        return prevList.filter((title) => title !== item.title);
      }
    });
  };

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
            height: 400,
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
                    checked={checkedList.includes(item.title)}
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
          onClick={() => {}}
          btnColor="green"
          textContent="NEXT"
        />
      </div>
      {isPopUpVisible && (
        <CreationPopUp
          text="strength"
          handleSubmit={() => {}}
          onClose={togglePopUp}
        />
      )}
    </div>
  );
};

export default SolutionListing;
