import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import StrFinderButton from "../reusableParts/StrFinderButton";

const SolutionCreationPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="solution-page-container">
      <div className="update-solution">
        <p className="description">
          {t('ifYouWantUpdateSolution')}:
        </p>
        <StrFinderButton
          btnColor="green"
          textContent={t('updateCards')}
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
