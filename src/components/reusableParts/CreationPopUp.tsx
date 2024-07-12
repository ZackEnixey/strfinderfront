import { CloseOutlined } from "@ant-design/icons";
import StrFinderButton from "./StrFinderButton";
import { Input, Select } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface CreationPopUpProps {
  text: string;
  initialTitle?: string;
  initialDescription?: string;
  initialText?: string;
  initialTedUrl?: string;
  initialLiteratureUrl?: string;
  initialNumber?: number;
  isEdit?: boolean;
  onClose: () => void;
  handleSubmit: (
    title: string,
    description: string,
    additionalText: string,
    urlForTedTalk?: string,
    urlForLiterature?: string,
    numberOfUpperTokens?: number
  ) => void;
  isSolutionCard?: boolean;
  isActionCard?: boolean;
}

const CreationPopUp: React.FC<CreationPopUpProps> = ({
  initialTitle,
  initialDescription,
  initialText,
  initialTedUrl,
  initialLiteratureUrl,
  initialNumber,
  isEdit,
  onClose,
  handleSubmit,
  isSolutionCard,
  isActionCard,
}) => {
  const [title, setTitle] = useState(initialTitle || "");
  const [description, setDescription] = useState(initialDescription || "");
  const [additionalText, setAdditionalText] = useState(initialText || "");
  const [urlForTedTalk, setUrlForTedTalk] = useState(initialTedUrl || "");
  const [urlForLiterature, setUrlForLiterature] = useState(
    initialLiteratureUrl || ""
  );
  const [numberOfUpperTokens, setNumberOfUpperTokens] = useState(
    initialNumber || 0
  );

  const { t } = useTranslation();

  const handleSubmitForm = () => {
    console.log("text", additionalText);
    if (isSolutionCard) {
      handleSubmit(
        title,
        description,
        additionalText,
        urlForLiterature,
        urlForTedTalk
      );
    } else if (isActionCard) {
      handleSubmit(
        title,
        description,
        additionalText,
        undefined,
        undefined,
        numberOfUpperTokens
      );
    } else {
      handleSubmit(title, description, additionalText);
    }
    onClose();
  };
  const handleChange = (value: number) => {
    setNumberOfUpperTokens(value);
  };
  return (
    <div className="pop-up-container">
      <div className="pop-up-header">
        <h3>{t("createNewCard", { text: "Example" })}</h3>
        <div onClick={onClose}>
          <CloseOutlined style={{ fontSize: "30px", color: "#AA4258" }} />
        </div>
      </div>
      <div className="pop-up-content">
        <div className="pop-up-inputs">
          <div className="input-container">
            <div className="input-label">Title:</div>
            <div>
              <Input
                className="custom-input"
                size="large"
                required
                placeholder=""
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="input-container">
            <div className="input-label">{t("description")}:</div>
            <div>
              <Input
                className="custom-input big"
                size="large"
                required
                placeholder=""
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="input-container">
            <div className="input-label">{t("additionalText")}:</div>
            <div>
              <Input
                className="custom-input big"
                size="large"
                required
                placeholder=""
                value={additionalText}
                onChange={(e) => setAdditionalText(e.target.value)}
              />
            </div>
          </div>
          {isSolutionCard && (
            <div className="input-container">
              <div className="input-label">{t("urlForLit")}:</div>
              <div>
                <Input
                  className="custom-input"
                  size="large"
                  required
                  placeholder=""
                  value={urlForTedTalk}
                  onChange={(e) => setUrlForLiterature(e.target.value)}
                />
              </div>
            </div>
          )}
          {isSolutionCard && (
            <div className="input-container">
              <div className="input-label">{t("urlForTedTalk")}:</div>
              <div>
                <Input
                  className="custom-input"
                  size="large"
                  required
                  placeholder=""
                  value={urlForLiterature}
                  onChange={(e) => setUrlForTedTalk(e.target.value)}
                />
              </div>
            </div>
          )}
          {isActionCard && (
            <div className="input-container">
              <div className="input-label">Number Of Upper Tokens:</div>
              <div>
                <Select
                  value={numberOfUpperTokens}
                  style={{ width: 100 }}
                  onChange={handleChange}
                  options={[
                    { value: "1", label: "1" },
                    { value: "2", label: "2" },
                    { value: "3", label: "3" },
                    { value: "4", label: "4" },
                    { value: "5", label: "5" },
                  ]}
                />
              </div>
            </div>
          )}
          <div>
            <StrFinderButton
              btnColor="pink"
              textContent={isEdit ? "EDIT" : "CREATE"}
              onClick={() => handleSubmitForm()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreationPopUp;
