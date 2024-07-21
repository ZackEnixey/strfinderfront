import { Button, Checkbox, CheckboxProps, Divider, List, Skeleton, Collapse } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import StrFinderButton from "../reusableParts/StrFinderButton";
import { getUserId } from "../../utils/decodedToken";
import { useFetchStrengths } from "../../hooks/useFetchStrenghts";
import { useCallback, useEffect, useMemo, useState } from "react";
import { StrengthItem } from "../../types/types";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import CreationPopUp from "../reusableParts/CreationPopUp";
import { useCreateStrength } from "../../hooks/useCreateStrength";
import { useCheckedStrengths } from "../../context/CheckedStrenghsContext";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useEditStrength } from "../../hooks/useEditStrength";

const StrengthCreationPage = () => {
  const darkGreenColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--btnDarkGreen")
    .trim();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [additionalText, setAdditionalText] = useState<string>("");
  const [cardId, setCardId] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [isPopUpVisible, setIsPopUpVisible] = useState<boolean>(false);

  const { checkedStrengths, setCheckedStrengths } = useCheckedStrengths();

  const navigate = useNavigate();
  const { t } = useTranslation();
  const { type } = useParams();
  const token = localStorage.getItem("token") || "";
  const id = getUserId(token) || "";

  const { data, fetchData } = useFetchStrengths(id, type!, token, refresh);
  const { handleAddStrength } = useCreateStrength(token, setRefresh);
  const { handleEditStrength } = useEditStrength(token, setRefresh, cardId);

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
    <div className={`generic_game_content_holder ${isPopUpVisible ? "overlay" : ""}`}>
        <div className="game_input_holder width_100">
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
              {t('add')}
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
              <div className="check-all-label">{t('selectAll')}</div>
            </div>
          </div>
          <div
            id="scrollableDiv"
            className="scrollable_cards_wrapper"
            style={{
              
            }}
          >
            <InfiniteScroll
              dataLength={data.length}
              next={fetchData}
              hasMore={data.length < 0}
              loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
              endMessage={<Divider plain>{t("noMoreStr")}</Divider>}
              scrollableTarget="scrollableDiv"
            >
              <List
                dataSource={data}
                renderItem={(item: StrengthItem, index) => (
                  <List.Item key={index}>
                    <Checkbox
                      checked={checkedStrengths.includes(item._id)}
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
            btnWidth="revert-layer"
            textContent={t("next").toUpperCase()}
          />
        </div>
                
        {isPopUpVisible && (
          <CreationPopUp
            initialTitle={title}
            initialDescription={description}
            initialText={additionalText}
            text="strength"
            handleSubmit={isEdit ? handleEditStrength : handleAddStrength}
            isEdit={isEdit}
            onClose={togglePopUp}
            isSolutionCard={false}
          />
        )}
    </div>     
  );
};

export default StrengthCreationPage;
