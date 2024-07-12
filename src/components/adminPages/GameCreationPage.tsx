import { useTranslation } from "react-i18next";
import StrFinderButton from "../reusableParts/StrFinderButton";
import { Input } from "antd";
import { useState } from "react";
import { useCreateGame } from "../../hooks/useCreateGame";
import { useNavigate } from "react-router-dom";
import { useMode } from "../../context/ModeContext";
import { useUpdateGame } from "../../hooks/useUpdateGame";

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

  return (
    <div className="game-page-container">
      <div className="game-creation">
        <h2 className="header">CONGRATULATIONS</h2>
        <p className="game-description">
          {t(
            "you have set all the card and you are ready to create the CODE for the game"
          )}
          :
        </p>
        <div className="input-container">
          <div className="input-label">{t("Game name")}:</div>
          <div>
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
            />{" "}
          </div>
        </div>
        <StrFinderButton
          btnColor="green"
          textContent={t(mode === "edit" ? "UPDATE GAME" : "CREATE THE GAME")}
          btnHeight="18vh"
          onClick={() => {
            if (mode === "create") {
              handleAddGame(gameTitle);
              navigate("/final-page");
            } else {
              handleUpdateGame(gameTitle);
              navigate("/");
            }
          }}
        />
      </div>
    </div>
  );
};

export default GameCreationPage;
