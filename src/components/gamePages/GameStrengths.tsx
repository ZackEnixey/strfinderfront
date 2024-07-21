import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

import StrFinderButton from '../reusableParts/StrFinderButton';
import happyPeople from '../../assets/happyPeople.svg';


const GameStrengths = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const handleNext = () => {
		navigate("/game/gameTemplateCodeInsertion");
	}

	const handleUpdate = () => {
		navigate("/game/gameStrengthManager")
	}

	return (
		<div className='generic_game_content_holder'>
			<div className='strength_update_title'>
				<div className='update_str_title'>{t('updateStrengths')}</div>
				<div>
					<StrFinderButton
						onClick={handleUpdate}
						btnColor="green"
						btnMargin="0"
						btnWidth="revert-layer"
						textContent={t('update').toUpperCase()}
					/>
				</div>
			</div>
			<div> 
				<img className="language_icon" src={happyPeople}  alt="languagesIcon" />
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
