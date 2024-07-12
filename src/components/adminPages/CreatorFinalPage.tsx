import { useTranslation } from "react-i18next";
import StrFinderButton from "../reusableParts/StrFinderButton";
import { Button, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const CreatorFinalPage = () => {
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const [gameCode, setGameCode] = useState("");

  useEffect(() => {
    setGameCode(localStorage.getItem("gameCode") || "");
  }, [gameCode]);

  const success = () => {
    navigator.clipboard.writeText(gameCode).then(() => {
      messageApi.open({
        type: "success",
        content: t("Copied"),
      });
    });
  };

  return (
    <div className="final-page-container">
      {contextHolder}
      <div className="final-page">
        <div className="final-text">
          <div>
            <h2 className="final-header">CONGRATULATIONS</h2>
            <p className="final-description">
              {t("Copy the code and share it with the players.")}:
            </p>
          </div>

          <div className="game-code">
            <h2>{gameCode}</h2>
            <Button
              type="dashed"
              onClick={success}
              icon={<CopyOutlined />}
              iconPosition="end"
            >
              {t("Copy")}
            </Button>
          </div>
        </div>
        <div>
          <StrFinderButton
            btnColor="green"
            textContent={t("GO TO DASHBOARD")}
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CreatorFinalPage;
