import { Checkbox, CheckboxProps, Divider, List, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate, useParams } from "react-router-dom";
import { Collapse } from "antd";
import StrFinderButton from "../reusableParts/StrFinderButton";
import { getUserId } from "../../utils/decodedToken";
import { useFetchStrengths } from "../../hooks/useFetchStrenghts";
import { useState } from "react";
import { StrengthItem } from "../../types/types";
import { PlusSquareOutlined } from "@ant-design/icons";
import CreationPopUp from "../reusableParts/CreationPopUp";
import { useCreateStrength } from "../../hooks/useCreateStrength";

const StrengthCreationPage = () => {
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const { type } = useParams();
  const token = localStorage.getItem("token") || "";
  const id = getUserId(token) || "";
  const { data, fetchData } = useFetchStrengths(id, type!, token, refresh);
  const { handleAddStrength } = useCreateStrength(token, setRefresh);

  const checkAll = data.length > 0 && checkedList.length === data.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < data.length;

  const onChange = (list: string[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange: CheckboxProps["onChange"] = (e) => {
    setCheckedList(e.target.checked ? data.map((item) => item.title) : []);
  };

  const handleNavigation = () => {
    navigate("/strengths");
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
          }}
        >
          <InfiniteScroll
            dataLength={data.length}
            next={fetchData}
            hasMore={data.length < 0}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>No more strengths</Divider>}
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
          onClick={handleNavigation}
          btnColor="green"
          textContent="NEXT"
        />
      </div>
      {isPopUpVisible && (
        <CreationPopUp
          text="strength"
          handleSubmit={handleAddStrength}
          onClose={togglePopUp}
        />
      )}
    </div>
  );
};

export default StrengthCreationPage;
