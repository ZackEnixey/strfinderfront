import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

import StrFinderButton from "../reusableParts/StrFinderButton";
import { useState } from "react";
import { Input } from "antd";
import { CREATE_PLAYER } from "../../apis/apiUrls";

const CreatePlayerPage = () => {
  const [nickname, setNickname] = useState("test");
  const [email, setEmail] = useState("test@gmail.com");
  const [errorMessage, setErrorMessage] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async () => {
    if (nickname === "" || email === "") {
      setErrorMessage(t("pleaseFillPlayerData"));
      return;
    }

    if (!emailRegex.test(email)) {
      setErrorMessage(t("invalidEmailForm"));
      return;
    }

    if (nickname.length > 20) {
      setErrorMessage(t("nicknameMustBe20char"));
      return;
    }

    setButtonLoading(true);

    try {
      const response = await fetch(CREATE_PLAYER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickName: nickname,
          email: email,
        }),
      });

      const data = await response.json();

      if (data.success === false) {
        setButtonLoading(false);
        setErrorMessage(t("invalidEmailOrPass"));
      } else {
        localStorage.setItem("player", JSON.stringify(data.data));
        setButtonLoading(false);
        navigate("/game/updateYourStrengths");
      }
    } catch (error) {
      setErrorMessage(t("somethingWrong"));
      setButtonLoading(false);
    }
    navigate("/game/gameStrengths");
  };

  return (
    <div className="generic_game_content_holder">
      <div className="game_input_holder">
        <div className="label_wrapper">{t("nickname").toUpperCase()}</div>
        <div>
          <Input
            size="large"
            type="text"
            required
            className="custom-input"
            placeholder={t("enterNickname")}
            prefix={<UserOutlined />}
            value={nickname}
            onChange={(event: any) => {
              setNickname(event.target.value);
              setErrorMessage("");
            }}
          />
        </div>

        <div className="label_wrapper">{t("email").toUpperCase()}</div>
        <div>
          <Input
            size="large"
            type="email"
            required
            className="custom-input"
            placeholder={t("enterYourEmail")}
            prefix={<UserOutlined />}
            value={email}
            onChange={(event: any) => {
              setEmail(event.target.value);
              setErrorMessage("");
            }}
          />
        </div>
        <div>{errorMessage && <p id="error-text">{errorMessage}</p>}</div>
      </div>

      <div className="generic_button_holder">
        <StrFinderButton
          onClick={() => handleSubmit()}
          btnColor="green"
          btnWidth="revert-layer"
          textContent={
            buttonLoading ? `${t("loading")}...` : `${t("next").toUpperCase()}`
          }
        />
      </div>
    </div>
  );
};

export default CreatePlayerPage;
