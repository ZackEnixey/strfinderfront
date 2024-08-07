import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { Modal, Input } from "antd";

import StrFinderButton from "../reusableParts/StrFinderButton";
import happyPeople from "../../assets/happyPeople.svg";
import { socket } from "../../socket/socket";

const GameTemplateCodeInsertion = () => {
  const [gameCode, setGameCode] = useState<string>("RQ974T");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const player = JSON.parse(localStorage.getItem("player") || "");

  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNext = () => {
    if (!gameCode) {
      setIsModalVisible(true);
    } else {
      localStorage.setItem("gameCode", gameCode);
      socket.emit("joinGroup", { player, gameCode });
      socket.on("playerJoined", ({ player, groupCode }) => {
        console.log(`Player ${player.nickName} joined group ${groupCode}`);
        navigate("/game/gameGroups");
      });
      return () => {
        socket.off("playerJoined");
      };
    }
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="generic_game_content_holder">
      <Modal
        title={t("error")}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalOk}
        okText={t("ok")}
      >
        {t("youMustEnterGameCode")}
      </Modal>

      <div className="strength_update_title"></div>

      <div className="center_horizontally">
        <img className="language_icon" src={happyPeople} alt="languagesIcon" />
        <div className="responsive_width" style={{ margin: "10px 0 20px" }}>
          {t("passCodePageDescription")}
        </div>
      </div>

      <div className="generic_button_holder">
        <div className="font_size_25">{t("gameCode")}</div>
        <div className="responsive_width" style={{ margin: "10px 0 20px" }}>
          <Input
            size="large"
            type="text"
            required
            className="custom-input"
            placeholder={t("enterTheGameCode")}
            prefix={<UserOutlined />}
            value={gameCode}
            onChange={(event) => setGameCode(event.target.value)}
            style={{ height: "70px" }}
          />
        </div>
        <div className="generic_button_holder">
          <StrFinderButton
            onClick={handleNext}
            btnColor="green"
            btnMargin="0"
            btnWidth="revert-layer"
            textContent={t("start").toUpperCase()}
          />
        </div>
      </div>
    </div>
  );
};

export default GameTemplateCodeInsertion;
