import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const CreatorDashboardPage = () => {
  const [creatorDashboard, setCreatorDashboard] = useState<number>(4);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const creatorDashboardExampleFunction = () => {
    setCreatorDashboard(creatorDashboard + 1);
    routToAnotherPage();
  };

  const routToAnotherPage = () => {
    navigate("/creatingStrengthsPage");
  };

  return (
    <div>
      <div> {t('yourGameCode')}:</div>
      <div>
        <div>123456</div>
        <div>123457</div>
        <div>123458</div>
      </div>
      <div>{t('youCreateNewGame')}:</div>
      <div>
        <button onClick={creatorDashboardExampleFunction}>
          {t('createNewMatch')}
        </button>
      </div>
    </div>
  );
};

export default CreatorDashboardPage;
