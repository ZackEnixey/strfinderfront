import { useNavigate } from "react-router-dom";
import StrFinderButton from "../reusableParts/StrFinderButton";

const SolutionCreationPage = () => {
  const navigate = useNavigate();
  return (
    <div className="solution-page-container">
      <div className="update-solution">
        <p className="description">
          If you want to update the currently existing solution cards you can do
          it here:
        </p>
        <StrFinderButton
          btnColor="green"
          textContent="UPDATE SOLUTION CARD"
          btnHeight="18vh"
          onClick={() => navigate("/solutions/emotional")}
        />
      </div>
      <StrFinderButton
        btnColor="green"
        textContent="NEXT"
        onClick={() => navigate("/questions")}
      />
    </div>
  );
};

export default SolutionCreationPage;
