import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import { UnlockOutlined, UserOutlined } from "@ant-design/icons";
import { useTranslation } from 'react-i18next';

import StrFinderButton from "../reusableParts/StrFinderButton";
import { LOGIN_URL } from "../../apis/apiUrls";
import { useAuth } from "../../context/AuthContext";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordMinLength = 8;

const CreatorLoginPage = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>(""); 
	const [buttonLoading, setButtonLoading] = useState<boolean>(false);

	const navigate = useNavigate();
	const { login } = useAuth();
	const { t, i18n} = useTranslation();
	const currentLanguage = i18n.language;
	
	const handleEmail = (event: any) => {
		const value = event?.target?.value;
		if (value !== undefined) {
			setEmail(value);
			setErrorMessage("");
		}
	}

	const handlePassword = (event: any) => {
		const value = event?.target?.value;
		if (value !== undefined) {
			setPassword(event?.target?.value);
			setErrorMessage("");
		}
	}

	const handleSubmit = async () => {
		if (password === "" || email === "") {
			setErrorMessage(t('emailPasswordReq'));
			return;
		}

		if (!emailRegex.test(email)) {
			setErrorMessage(t('invalidEmailForm'));
			return;
		}

		if (password.length < passwordMinLength) {
			setErrorMessage(t('passwordMustBe8Char'));
			return;
		}

		setButtonLoading(true);

		try {
			const response: any = await fetch(LOGIN_URL, {
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

			if (!response.ok) {
				if (response.status === 401) {
					setErrorMessage(t('invalidEmailOrPass'));
				} else {
					setErrorMessage(t('somethingWrong'));
				}

				setButtonLoading(false);
				return;
			}
		
			setButtonLoading(false);
			login(data.accessToken);
			navigate("/adminDashboardPage");
		} catch (error) {
			console.error("Login error:", error);
			setErrorMessage(t('somethingWrong'));
			setButtonLoading(false);
		}
	};

	const labelByLanguage = (language: string, text: string) => {
		if (language === "ar" || language == "he") {
			return <div className="label_wrapper text_align_right">{text}</div>;
		}

		return <div className="label_wrapper">{text}</div>;
	}

	return (
		<div className="generic_game_content_holder">
			<div className="game_input_holder">
				<div className="input-container">
					{labelByLanguage(currentLanguage, t('email').toUpperCase())}
					<Input
						className="custom-input"
						size="large"
						required
						placeholder="Enter your email"
						prefix={<UserOutlined />}
						value={email}
						onChange={(event) => handleEmail(event)}
					/>
				</div>
				<div className="input-container">
					{labelByLanguage(currentLanguage, t('password').toUpperCase())}
					<Input
						size="large"
						type="password"
						required
						className="custom-input"
						placeholder="Enter your password"
						prefix={<UnlockOutlined />}
						value={password}
						onChange={(event) => handlePassword(event)}
					/>
					{errorMessage && (<div className="red_text">{errorMessage}</div>)}
				</div>
			</div>

			<div className="generic_button_holder">
				<StrFinderButton
					onClick={handleSubmit}
					btnColor="green"
					btnWidth="revert-layer"
					textContent={buttonLoading ? `${t('loading').toUpperCase()}...` : `${t('login').toUpperCase()}`}
				/>
			</div>
		</div>
	);
};

export default CreatorLoginPage;
