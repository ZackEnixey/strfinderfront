import { useNavigate } from "react-router-dom";

import strFinder from "../../assets/strFinder.png";
import Languages from "../reusableParts/Languages";

const Header = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/initialPage");
    }
  };

  const returnButton = () => {
    return (
      <div onClick={handleBack} style={{ cursor: "pointer" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50px"
          height="50px"
          viewBox="0 0 48 48"
          fill="none"
        >
          <path
            d="M12.9998 8L6 14L12.9998 21"
            stroke="#000000"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 14H28.9938C35.8768 14 41.7221 19.6204 41.9904 26.5C42.2739 33.7696 36.2671 40 28.9938 40H11.9984"
            stroke="#000000"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  };

  return (
    <div className="header_wrapper div_test_border">
      <div className="header_left div_test_border">{returnButton()}</div>
      <div className="logo_wrapper full_center">
        <img src={strFinder} alt="STRfinder logo" className="logo_img" />
      </div>
      <div className="header_right div_test_border">
        <Languages />
      </div>
    </div>
  );
};

export default Header;
