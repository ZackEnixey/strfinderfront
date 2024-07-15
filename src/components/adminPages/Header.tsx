import { useNavigate } from "react-router-dom";

import backIcon from "../../assets/backIcon.svg";
import temporaryLogo from "../../assets/temporaryLogo.svg";
import Languages from "../reusableParts/Languages";

const Header = () => {
	const navigate = useNavigate();
	const isInitialPage = location.pathname === "/";

	const handleBack = () => {
		if (window.history.length > 1) {
		navigate(-1);
		} else {
		navigate("/initialPage");
		}
	};

	const handleLogo = () => {
		navigate("/");
	}

	const returnButton = () => {
		return (
		<div onClick={handleBack} style={{ cursor: "pointer" }}>
			<img src={backIcon} alt="STRfinder logo" className="back_img" />
		</div>
		);
	};

	return (
		<div className="header_wrapper div_test_border">
			<div className="header_left div_test_border">
				{!isInitialPage && <>{returnButton()}</>}
			</div>
			<div className="logo_wrapper full_center">
				<img src={temporaryLogo} alt="STRfinder logo" className="logo_img" onClick={handleLogo} />
			</div>
			<div className="header_right div_test_border">
				<Languages />
			</div>
		</div>
	);
};

export default Header;
