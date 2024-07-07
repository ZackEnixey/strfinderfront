import { Checkbox, CheckboxProps, Divider, List, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate, useParams } from "react-router-dom";
import { Collapse } from "antd";
import { useTranslation } from 'react-i18next';

import StrFinderButton from "../reusableParts/StrFinderButton";
import { getUserId } from "../../utils/decodedToken";
import { useFetchStrengths } from "../../hooks/useFetchStrenghts";
import { useCallback, useEffect, useMemo, useState } from "react";
import { StrengthItem } from "../../types/types";
import { PlusSquareOutlined } from "@ant-design/icons";
import CreationPopUp from "../reusableParts/CreationPopUp";
import { useCreateStrength } from "../../hooks/useCreateStrength";
import { useCheckedStrengths } from "../../context/CheckedStrenghsContext";
import { CheckboxChangeEvent } from "antd/es/checkbox";

const StrengthCreationPage = () => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation();
  const { type } = useParams();
  const token = localStorage.getItem("token") || "";
  const id = getUserId(token) || "";

  const { data, fetchData } = useFetchStrengths(id, type!, token, refresh);
  const { handleAddStrength } = useCreateStrength(token, setRefresh);
  const { checkedStrengths, setCheckedStrengths } = useCheckedStrengths();
  const onCheckAllChange: CheckboxProps["onChange"] = useCallback(
    (e: CheckboxChangeEvent) => {
      setCheckedStrengths(e.target.checked ? data.map((item) => item._id) : []);
    },
    [data, setCheckedStrengths]
  );
  const handleNavigation = () => {
    navigate("/solutions");
  };

  const togglePopUp = () => {
    setIsPopUpVisible(!isPopUpVisible);
  };

  const onItemChange = useCallback(
    (item: StrengthItem, checked: boolean) => {
      setCheckedStrengths((prevList) =>
        checked
          ? [...prevList, item._id]
          : prevList.filter((id) => id !== item._id)
      );
    },
    [setCheckedStrengths]
  );

  useEffect(() => {
    localStorage.setItem("selectedStrengths", JSON.stringify(checkedStrengths));
  }, [checkedStrengths]);

  const checkAll = useMemo(
    () => data.length > 0 && checkedStrengths.length === data.length,
    [data.length, checkedStrengths.length]
  );

  const indeterminate = useMemo(
    () => checkedStrengths.length > 0 && checkedStrengths.length < data.length,
    [checkedStrengths.length, data.length]
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
            endMessage={<Divider plain>{t('noMoreStr')}</Divider>}
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
                    checked={checkedStrengths.includes(item._id)}
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
          textContent={t('next').toUpperCase()}
        />
      </div>
      {isPopUpVisible && (
        <CreationPopUp
          text="strength"
          handleSubmit={handleAddStrength}
          onClose={togglePopUp}
          isSolutionCard={false}
        />
      )}
    </div>
  );
};

export default StrengthCreationPage;
