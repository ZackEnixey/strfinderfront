import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import StrFinderButton from "../reusableParts/StrFinderButton";
import ProgressBarGameTemplate from "./ProgressBarGameTemplate";

const SolutionCreationPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="generic_game_content_holder">
      <div className="game_input_holder">
        <div>{t('ifYouWantUpdateSolution')}</div>
        <StrFinderButton
          btnColor="green"
          textContent={t('updateCards')}
          btnHeight="18vh"
          btnWidth="revert-layer"
          btnMargin="20px 0 0 0"
          onClick={() => navigate("/solutions/emotional")}
        />
      </div>
      <div>
        <ProgressBarGameTemplate />
        <StrFinderButton
          btnColor="green"
          textContent="NEXT"
          btnWidth="revert-layer"
          onClick={() => navigate("/questions")}
        />
      </div>
    </div>
  );
};

export default SolutionCreationPage;
