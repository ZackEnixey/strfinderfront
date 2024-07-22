import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CloseOutlined } from "@ant-design/icons";
import { Input, Select } from "antd";

import StrFinderButton from "./StrFinderButton";
import { getBackgroundColors } from "../reusableParts/getButtonColors.ts";

const { TextArea } = Input;

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
  popUpColor?: string;
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
  popUpColor
}) => {
  const [title, setTitle] = useState<string>(initialTitle || "");
  const [description, setDescription] = useState<string>(initialDescription || "");
  const [additionalText, setAdditionalText] = useState<string>(initialText || "");
  const [urlForTedTalk, setUrlForTedTalk] = useState<string>(initialTedUrl || "");
  const [urlForLiterature, setUrlForLiterature] = useState<string>(initialLiteratureUrl || "");
  const [numberOfUpperTokens, setNumberOfUpperTokens] = useState<number>(initialNumber || 0);

  const { bgLight, bgDark } = getBackgroundColors(popUpColor);
  const { t } = useTranslation();

  const handleSubmitForm = () => {
    if (isSolutionCard) {
      handleSubmit(
        title,
        description,
        additionalText,
        urlForLiterature,
        urlForTedTalk
      );
      onClose();
      return;
    } 
    if (isActionCard) {
      handleSubmit(
        title,
        description,
        additionalText,
        undefined,
        undefined,
        numberOfUpperTokens
      );
      onClose();
      return;
    } 

    handleSubmit(title, description, additionalText);
    onClose();
  };

  const handleChange = (value: number) => {
    setNumberOfUpperTokens(value);
  };
  
  return (
    <div className="pop-up-container" style={{ backgroundColor: bgLight}}>

      <div className="pop-up-header">
        <h3>{t("createNewCard", { text: "Example" })}</h3>
        <div onClick={onClose}>
          <CloseOutlined style={{ fontSize: "30px", color: bgDark }} />
        </div>
      </div>

      <div className="pop-up-content">
        <div className="pop-up-inputs">

          <div className="input-container">
            <div className="input-label">{t('Title')}</div>
            <Input
              className="custom-input"
              size="large"
              required
              placeholder=""
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="input-container">
            <div className="input-label">{t('description')}</div>
            <TextArea
              className="custom-textarea"
              size="large"
              required
              placeholder=""
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4} // Adjust the number of rows as needed
            />
          </div>

          <div className="input-container">
            <div className="input-label">{t('additionalText')}</div>
            <TextArea
              className="custom-textarea"
              size="large"
              required
              placeholder=""
              value={additionalText}
              onChange={(e) => setAdditionalText(e.target.value)}
              rows={4} // Adjust the number of rows as needed
            />
          </div>

          {isSolutionCard && (
            <div className="input-container">
              <div className="input-label">{t("urlForLit")}</div>
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
              <div className="input-label">{t("urlForTedTalk")}</div>
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
              <div className="input-label">{t('numOfTokens')}</div>
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

          <StrFinderButton
            btnColor={popUpColor}
            textContent={isEdit ? "EDIT" : "CREATE"}
            btnWidth="80vw"
            btnMargin="10px 0 0 0"
            onClick={() => handleSubmitForm()}
          />
          
        </div>
      </div>
    </div>
  );
};

export default CreationPopUp;
