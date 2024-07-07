import { useCallback, useEffect, useMemo, useState } from "react";
import { Checkbox, CheckboxProps, List, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate, useParams } from "react-router-dom";
import { PlusSquareOutlined } from "@ant-design/icons";
import { useTranslation } from 'react-i18next';
import { Collapse } from "antd";

import StrFinderButton from "../reusableParts/StrFinderButton";
import { getUserId } from "../../utils/decodedToken";
import { StrengthItem } from "../../types/types";
import CreationPopUp from "../reusableParts/CreationPopUp";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useFetchActions } from "../../hooks/useFetchActions";

const ActionCreationPage = () => {
  const { t } = useTranslation();
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [checkedActions, setCheckedActions] = useState<string[]>(() => {
    const saved = localStorage.getItem("selectedActions");
    return saved ? JSON.parse(saved) : [];
  });
  const refresh = false;

  const navigate = useNavigate();
  const { type } = useParams();
  const token = localStorage.getItem("token") || "";
  const id = getUserId(token) || "";
  const { data, fetchData } = useFetchActions(id, type!, token, refresh);

  const onCheckAllChange: CheckboxProps["onChange"] = useCallback(
    (e: CheckboxChangeEvent) => {
      setCheckedActions(e.target.checked ? data.map((item) => item._id) : []);
    },
    [data, setCheckedActions]
  );

  const handleNavigation = () => {
    navigate("/actions");
  };

  const togglePopUp = () => {
    setIsPopUpVisible(!isPopUpVisible);
  };

  const onItemChange = useCallback(
    (item: StrengthItem, checked: boolean) => {
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
        <div className="add-icon-container" onClick={togglePopUp}>
          <PlusSquareOutlined style={{ fontSize: "20px", color: "#1C274C" }} />
        </div>
        <div className="check-all-container">
          <div className="check-all">
            <div className="check-all-label">{t('selectAll')}</div>
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
                    checked={checkedActions.includes(item._id)}
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
          handleSubmit={() => {}}
          onClose={togglePopUp}
          isActionCard={true}
        />
      )}
    </div>
  );
};

export default ActionCreationPage;
