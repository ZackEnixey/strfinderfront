import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";

import StrFinderButton from "../reusableParts/StrFinderButton";

const CreatorFinalPage = () => {
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const [gameCode, setGameCode] = useState<string>("");

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
    <div className="generic_game_content_holder">
      {contextHolder}
      <div className="game_input_holder">

        <div className="game_code">
          <div className="congrats">{t('congratulations')}</div>
          <div className="text_align_center">{t("copyTheCode")}:</div>
        </div>

        <div className="game_code mt_100">
          <div>{gameCode}</div>
          <Button
            type="primary"
            style={{ backgroundColor: "#53bd8b" }}
            onClick={success}
            icon={<CopyOutlined />}
            iconPosition="end"
          >
            {t("copy")}
          </Button>
        </div>
      </div>
       
      <StrFinderButton
        btnColor="green"
        textContent={t("GO TO DASHBOARD")}
        onClick={() => {
          navigate("/adminDashboardPage");
        }}
      />
    </div>
  );
};

export default CreatorFinalPage;
