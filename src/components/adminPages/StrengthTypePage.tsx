import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import StrFinderButton from "../reusableParts/StrFinderButton";

const StrengthsTypePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="game_initial_container">
      <div>{t('whichTypeOfStr')}</div>
      <StrFinderButton
        onClick={() => navigate("/strengths/clifton")}
        btnColor="green"
        textContent={t('cliftonStr').toUpperCase()}
        btnHeight="20vh"
        btnWidth="revert-layer"
      />
      <StrFinderButton
        onClick={() => navigate("/strengths/gallup")}
        btnColor="green"
        textContent={t('gallupStr').toUpperCase()}
        btnHeight="20vh"
        btnWidth="revert-layer"
      />
    </div>
  );
};

export default StrengthsTypePage;
