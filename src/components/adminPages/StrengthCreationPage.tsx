// StrengthCreationPage.tsx
import { Checkbox, CheckboxProps, Divider, List, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate, useParams } from "react-router-dom";
import { Collapse } from "antd";
import StrFinderButton from "../reusableParts/StrFinderButton";
import { getUserId } from "../../utils/decodedToken";
import { useFetchStrengths } from "../../hooks/useFetchStrenghts";
import { useState } from "react";
import { StrengthItem } from "../../types/types";

const CheckboxGroup = Checkbox.Group;
const plainOptions = [""];
const defaultCheckedList = [""];

const StrengthCreationPage = () => {
  const [checkedList, setCheckedList] = useState<string[]>(defaultCheckedList);
  const navigate = useNavigate();
  const { type } = useParams();
  const token = localStorage.getItem("token") || "";
  const id = getUserId(token) || "";
  const { data, fetchData } = useFetchStrengths(id, type!, token);
  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < plainOptions.length;

  const onChange = (list: string[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange: CheckboxProps["onChange"] = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };

  const handleNavigation = () => {
    navigate("/strengths");
  };

  return (
    <div className="dashboard-container">
      <div>
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
                  <CheckboxGroup
                    options={plainOptions}
                    value={checkedList}
                    onChange={onChange}
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
    </div>
  );
};

export default StrengthCreationPage;
