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
				<div className='game_group_title'>Group 1</div>
                <div className='flex_direction_column '>
                    <div className='game_group_element'>Stephan</div>
                    <div className='game_group_element'>Maria</div>
                    <div className='game_group_element'>Angelina</div>
                    <div className='game_group_element'>Shien</div>
                </div>

				<div className='game_group_title'>Group 2</div>
                <div className='flex_direction_column '>
                    <div className='game_group_element'>Anna</div>
                    <div className='game_group_element'>Zachary</div>
                    <div className='game_group_element'>Victor</div>
                </div>

				<div className='game_group_title'>Group 3</div>
                <div className='flex_direction_column '>
                    <div className='game_group_element'>Paul</div>
                    <div className='game_group_element'>Elisabeth</div>
                    <div className='game_group_element'>Angelina</div>
                    <div className='game_group_element'>Mia</div>
                    <div className='game_group_element'>Hana</div>
                    <div className='game_group_element'>Voctoria</div>
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