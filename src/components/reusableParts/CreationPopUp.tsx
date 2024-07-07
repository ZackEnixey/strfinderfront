import { useState } from "react";
import { Input } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useTranslation } from 'react-i18next';

import StrFinderButton from "./StrFinderButton";

interface CreationPopUpProps {
  text: string;
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
  text,
  onClose,
  handleSubmit,
  isSolutionCard,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [additionalText, setAdditionalText] = useState("");
  const [urlForTedTalk, setUrlForTedTalk] = useState("");
  const [urlForLiterature, setUrlForLiterature] = useState("");

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
    } else {
      handleSubmit(title, description, additionalText);
    }
    onClose();
  };

  return (
    <div className="pop-up-container">
      <div className="pop-up-header">
        <h3>{t('createNewCard', { text: 'Example' })}</h3>
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
            <div className="input-label">{t('description')}:</div>
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
            <div className="input-label">{t('additionalText')}:</div>
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
              <div className="input-label">{t('urlForLit')}:</div>
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
              <div className="input-label">{t('urlForTedTalk')}:</div>
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
          <div>
            <StrFinderButton
              btnColor="pink"
              textContent="CREATE"
              onClick={() => handleSubmitForm()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreationPopUp;
