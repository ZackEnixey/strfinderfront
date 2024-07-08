import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import { UnlockOutlined, UserOutlined } from "@ant-design/icons";
import { useTranslation } from 'react-i18next';

import StrFinderButton from "../reusableParts/StrFinderButton";
import { LOGIN_URL } from "../../apis/apiUrls";
import { useAuth } from "../../context/AuthContext";

const CreatorLoginPage = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // New state for error message
  const [buttonLoading, setButtonLoading] = useState(false);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useTranslation();

  //handling the Submit of the login
  const handleSubmit = async () => {
    // Validate email and password
    if (password === "" || email === "") {
      setErrorMessage(t('emailPasswordReq'));
      return;
    }
    if (!emailRegex.test(email)) {
      setErrorMessage(t('invalidEmailForm'));
      return;
    }
    if (password.length < 8) {
      setErrorMessage(t('passwordMustBe8Char'));
      return;
    }
    setButtonLoading(true);
    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      if (data.success === false) {
        setButtonLoading(false);
        setErrorMessage(t('invalidEmailOrPass')); // if the success in false then say that the email or password are invalid
      } else {
        setButtonLoading(false);
        login(data.accessToken);
        // Navigate to the home page upon successful login
        navigate("/");
      }
    } catch (error) {
      setErrorMessage(t('somethingWrong'));
      setButtonLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="inputs-container">
        <div className="input-container">
          <div className="input-label">{t('email').toUpperCase()}:</div>
          <div>
            <Input
              className="custom-input"
              size="large"
              required
              placeholder="Enter your email"
              prefix={<UserOutlined />}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setErrorMessage("");
              }}
            />{" "}
          </div>
        </div>
        <div className="input-container">
          <div className="input-label">{t('password')}:</div>
          <div>
            <Input
              size="large"
              type="password"
              required
              className="custom-input"
              placeholder="Enter your password"
              prefix={<UnlockOutlined />}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setErrorMessage("");
              }}
            />{" "}
          </div>
          {errorMessage && <p id="error-text">{errorMessage}</p>}
        </div>
      </div>
      <div>
        <StrFinderButton
          onClick={() => handleSubmit()}
          btnColor="green"
          textContent={buttonLoading ? `${t('loading')}...` : `${t('login')}`}
        />
      </div>
    </div>
  );
};

export default CreatorLoginPage;
