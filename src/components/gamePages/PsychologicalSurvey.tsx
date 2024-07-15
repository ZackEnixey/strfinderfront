import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

import questionsAndStrengths from "../../data/Data.json";
import StrFinderButton from '../reusableParts/StrFinderButton';
import arrowGoRight from "../../assets/arrowGoRight.svg";
import arrowGoLeft from "../../assets/arrowGoLeft.svg";
import seeStrengths from "../../assets/seeStrengths.svg";

const PsychologicalSurvey = () => {
	const [strengths, setStrengths] = useState(questionsAndStrengths.strengths);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [seeMyStrengths, setSeeMyStrengths] = useState(false);

const navigate = useNavigate();

	const numberOfQuestions = questionsAndStrengths.questions.length;
	const step: number = Number((100 / (numberOfQuestions-1)).toFixed(2));

	const { t } = useTranslation();

	const handleAnswer = (questionId: any, answer: number) => {
		const question: any = questionsAndStrengths.questions.find(q => q.id === questionId);

		const updatedStrengths = strengths.map(strength => {
			if (question.relatedStrengths.includes(strength.name)) {
				return { ...strength, points: strength.points + answer};
			}
			
			return strength;
		});

		setStrengths(updatedStrengths);
		handleNext();
	};

	const handleNext = () => {
		if (currentQuestionIndex < questionsAndStrengths.questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		}
	};
	
	const handleBack = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex(currentQuestionIndex - 1);
		}
	};
	
	const handleFinish = () => {
		setSeeMyStrengths(true);
	};
	
	const question = questionsAndStrengths.questions[currentQuestionIndex];

	const value: any = {
		"-2": t("StronglyDisagree"),
		"-1": t("Disagree"),
		"0": t("Neutral"),
		"1": t("Agree"),
		"2": t("StronglyAgree"),
	}

	const topFiveStrengths: any[] = strengths.sort((a, b) => b.points - a.points).slice(0, 5);

	if (seeMyStrengths) {
		return (
			<div className='generic_game_content_holder'>
				<div className='strength_info_wrapper'>
					<div>{t('yourTop5Str')}</div>
					<div>{t('strInformation')}:</div>
				</div>
				<div style={{ width: "100%"}}>
					<div style={{ width: "100%"}}>
						{topFiveStrengths.map(strength => (
							<div key={strength.name} className='str_names'>
								{strength.name}
							</div>
						))}
					</div> 
				</div>

				<div className='survey_bottom_return'>
					<StrFinderButton
						btnColor="green"
						textContent={t("goBackToTheGame")}
						onClick={() => {
							navigate("/game/gameStrengths");
						}}
					/>
				</div>
			</div>
		)
	}

	return (
		<div className='generic_game_content_holder'>
			<div>
				<div className='loader_border'>
					<div className='loader' style={{ width: `${currentQuestionIndex * step}%`}}>
						{(currentQuestionIndex * step).toFixed(0)}%
					</div>
				</div>

				<div className='strength_survery_title'>{question.id}. {question.text}</div>

				<div className='flex_direction_column'>
					{Object.values(questionsAndStrengths.answers).map(answer => (
						<div key={answer}>
							<StrFinderButton
								btnColor="green"
								textContent={value[answer]}
								btnWidth='revert-layer'
								btnMargin='10px 0px'
								onClick={() => handleAnswer(question.id, answer)}
							/>
						</div>
					))}
				</div>
			</div>

			<div className='survey_bottom'>
				<div>
					{currentQuestionIndex > 0 && (
						<div onClick={handleBack}> 
							<img src={arrowGoLeft} className='arrow_go_holder' alt="back" />
						</div>
					)}
				</div>

				<div>
					{currentQuestionIndex < questionsAndStrengths.questions.length - 1 ? (
						<div onClick={handleNext}> 
							<img src={arrowGoRight}className='arrow_go_holder'  alt="next" />
						</div>
					) : (
						<div onClick={handleFinish}> 
							<img src={seeStrengths}className='arrow_go_holder'  alt="finish" />
						</div>
					)}
				</div>
			</div>

		</div>
	);
};

export default PsychologicalSurvey;