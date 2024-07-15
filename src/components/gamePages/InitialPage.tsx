import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import StrFinderButton from "../reusableParts/StrFinderButton";

const InitialPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
      <div className="game_initial_container">
        <div>{t('alreadyHaveCode')}:</div>
        <StrFinderButton
          onClick={() => navigate("/game/createPlayer")}
          btnColor="green"
          textContent={t('playTheExistingGame').toUpperCase()}
          btnHeight="20vh"
          btnWidth="revert-layer"
        />

        <div className="mr_40">{t('createNewGameInfo')}:</div>
        <StrFinderButton
          onClick={() => navigate("/login")}
          btnColor="green"
          textContent={t('createNewGame').toUpperCase()}
          btnHeight="20vh"
          btnWidth="revert-layer"
        />
      </div>
    )
}

export default InitialPage;