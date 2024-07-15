import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

import StrFinderButton from '../reusableParts/StrFinderButton';


const GameStrengths = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const handleNext = () => {
		navigate("/game/gameStrengthManager");
	}

	return (
		<div className='generic_game_content_holder'>
			<div className='strength_update_title'>
				<div>Group</div>
                <div>
                    <div>Payer 1</div>
                    <div>Payer 2</div>
                    <div>Payer 3</div>
                </div>
			</div>
			<div className='generic_button_holder'>
				<div>{t('startTheGame')}</div>
				<StrFinderButton
					onClick={handleNext}
					btnColor="green"
					btnWidth="revert-layer"
					textContent={t('next').toUpperCase()}
				/>
			</div>
		</div>
	)
}

export default GameStrengths;