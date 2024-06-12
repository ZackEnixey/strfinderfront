import { useNavigate } from "react-router-dom";
import StrFinderButton from "../reusableParts/StrFinderButton";

const StrengthsTypePage = () => {
  const navigate = useNavigate();
  return (
    <div className="strength-types-container">
      <StrFinderButton
        onClick={() => navigate("/strengths/clifton")}
        btnColor="green"
        textContent="CLIFTON STRENGTHS"
        btnHeight="20vh"
      />
      <StrFinderButton
        onClick={() => navigate("/strengths/gallup")}
        btnColor="green"
        textContent="GALLUP STRENGTHS"
        btnHeight="20vh"
      />
    </div>
  );
};

export default StrengthsTypePage;
