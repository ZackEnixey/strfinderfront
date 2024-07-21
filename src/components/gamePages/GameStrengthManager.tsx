import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

import StrFinderButton from '../reusableParts/StrFinderButton';


const GameStrengthManager = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const handleDiscoverStrengths = () => {
		navigate("/game/psychologicalSurvey");
	}
	
	const handleKnowStrengths = () => {
		navigate("/game/knowMyStrengths");
	}

	return (
		<div className="game_initial_container">
			<div>{t('alreadyHaveCode')}</div>
			<StrFinderButton
				onClick={handleDiscoverStrengths}
				btnColor="green"
				textContent={t('discoverStrengths').toUpperCase()}
				btnHeight="20vh"
				btnWidth="revert-layer"
			/>

			<div className="mr_40">{t('createNewGameInfo')}</div>
			<StrFinderButton
				onClick={handleKnowStrengths}
				btnColor="green"
				textContent={t('alreadyKnowStrengths').toUpperCase()}
				btnHeight="20vh"
				btnWidth="revert-layer"
			/>
		</div>
	)
}

export default GameStrengthManager;