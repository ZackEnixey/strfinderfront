import { useTranslation } from "react-i18next";
import { Input, notification } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import StrFinderButton from "../reusableParts/StrFinderButton";
import { useCreateGame } from "../../hooks/useCreateGame";
import { useMode } from "../../context/ModeContext";
import { useUpdateGame } from "../../hooks/useUpdateGame";
import ProgressBarGameTemplate from "./ProgressBarGameTemplate";

const GameCreationPage = () => {
  const { mode } = useMode();
  const [gameTitle, setGameTitle] = useState(() => {
    const gameTitle = localStorage.getItem("gameTitle") || "";
    return mode === "edit" ? gameTitle : "";
  });
  const { t } = useTranslation();
  const token = localStorage.getItem("token") || "";
  const navigate = useNavigate();
  const { handleAddGame } = useCreateGame(token);
  const { handleUpdateGame } = useUpdateGame(token);

  const handleMode = () => {
    if (!gameTitle) {
      notification.open({
        message: t('notification.noNameTitle'),
        description: t('notification.noNameInfo'),
        type: 'warning',
      });
      return;
    }
    
    if (mode === "create") {
      handleAddGame(gameTitle);
      navigate("/creatorFinalPage");
      return; 
    }

    handleUpdateGame(gameTitle);
    navigate("/");
  }

  return (
    <div className="generic_game_content_holder">
      <div className="game_input_holder height_100">
        
        <h2 className="header">{t('congratulations').toUpperCase()}</h2>
        <div className="game-description">{t("youSetAllTheCards")}</div>
        <div className="input-container">
          <div className="label_wrapper">{t("gameName")}</div>
          <Input
            size="large"
            type="text"
            required
            className="custom-input"
            placeholder="Enter the game title"
            value={gameTitle}
            onChange={(event) => {
              setGameTitle(event.target.value);
            }}
          />
        </div>
      </div>

      <div>
        <ProgressBarGameTemplate />
        <StrFinderButton
          btnColor="green"
          textContent={t(mode === "edit" ? t('updateGame') : t('createGame'))}
          btnHeight="18vh"
          onClick={() => handleMode()}
        />
      </div>
    </div>
  );
};

export default GameCreationPage;
