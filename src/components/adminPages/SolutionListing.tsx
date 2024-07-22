import { useCallback, useEffect, useMemo, useState } from "react";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Button,
  Checkbox,
  CheckboxProps,
  List,
  Skeleton,
  Collapse
} from "antd";

import StrFinderButton from "../reusableParts/StrFinderButton";
import { SolutionItem } from "../../types/types";
import CreationPopUp from "../reusableParts/CreationPopUp";
import { useSolutions } from "../../hooks/useSolutions";
import { useCheckedSolutions } from "../../context/CheckedSoltuionsContext";
import { useCreateSolution } from "../../hooks/useCreateSolution";
import { useEditSolution } from "../../hooks/useEditSolution";
import ProgressBarGameTemplate from "./ProgressBarGameTemplate";

const SolutionListing = () => {
  const darkGreenColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--btnDarkGreen")
    .trim();
  const token = localStorage.getItem("token") || "";
  const { checkedSolutions, setCheckedSolutions } = useCheckedSolutions();
  const [isPopUpVisible, setIsPopUpVisible] = useState<boolean>(false);
  const { type } = useParams<{ type: string }>();
  const solutionType: string = type ?? "emotional";
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [additionalText, setAdditionalText] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [cardId, setCardId] = useState<string>("");
  const [urlForLiterature, setUrlForLiterature] = useState<string>("");
  const [urlForTedTalk, setUrlForTedTalk] = useState<string>("");

  const { handleAddSolution } = useCreateSolution(token, type);
  const { handleEditSolution } = useEditSolution(token, cardId);

  const navigate = useNavigate();
  const { t } = useTranslation();
  const { emotionalSolutions, mentalSolutions, physicalSolutions, relationsSolutions } = useSolutions();

  const solutionData : { [key: string]: any } = {
    emotional: emotionalSolutions,
    mental: mentalSolutions,
    physical: physicalSolutions,
    relations: relationsSolutions,
    default: relationsSolutions
  }

  const data: SolutionItem[] = solutionData[solutionType] || solutionData.default;

  const nextRouteMap: { [key: string]: string } = {
    emotional: "/solutions/mental",
    mental: "/solutions/physical",
    physical: "/solutions/relations",
    relations: "/questions",
    default: "/questions"
  };

  const nextRoute = nextRouteMap[solutionType] || nextRouteMap.default;

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
    (item: SolutionItem, checked: boolean) => {
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

  const backgroundColor1Map: { [key: string]: string } = {
    emotional: "#FF859F",
    mental: "#70B1E6",
    physical: "#53BD8B",
    relations: "#FFD700",
    default: "#FFD700"
  };

  const backgroundColor2Map: { [key: string]: string } = {
    emotional: "bg-pink",
    mental: "bg-blue",
    physical: "bg-green",
    relations: "bg-yellow",
    default: "bg-yellow",
  };

  const backgroundColor3Map: { [key: string]: string } = {
    emotional: "pink",
    mental: "blue",
    physical: "green",
    relations: "yellow",
    default: "yellow",
  };

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
              setUrlForLiterature("");
              setUrlForTedTalk("");
            }}
          >
            <Button type="primary" style={{ backgroundColor: darkGreenColor }}>
              {t('add')}
              <PlusOutlined />
            </Button>
          </div>
        </div>

          <div
            id="scrollableDiv"
            className="scrollable_cards_wrapper"
            style={{
              backgroundColor: backgroundColor1Map[solutionType]
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
                    <Collapse className={`list-collapse-item ${backgroundColor2Map[solutionType]}`}>
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
                        setAdditionalText(item.info);
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
        <ProgressBarGameTemplate />
          <StrFinderButton
            onClick={() => navigate(`${nextRoute}`)}
            btnColor="green"
            textContent="NEXT"
            btnWidth="revert-layer"
            btnMargin="10px 0"
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
          popUpColor={backgroundColor3Map[solutionType]}
        />
      )}
    </div>
  );
};

export default SolutionListing;
