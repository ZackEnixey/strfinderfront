import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import StrFinderButton from '../reusableParts/StrFinderButton';

const InitialPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [initialPageTest, setInitialPageTest] = useState<number>(1);

    const testFunction = (value: number) => {
        setInitialPageTest(initialPageTest + value);
    }

    const routToAnotherPage = (pageUrl: string) => {
        navigate(pageUrl);
    }

    return (
        <div>

            <div>
                <div>{t('count')}: {initialPageTest} </div>
                <button onClick={() => testFunction(1)}>{t('counter')}</button>
            </div>

            <div>
                <div>{t('ifYouHaveCode')}: </div>
                <div onClick={() => routToAnotherPage('/gameHomePage')}>
                    <StrFinderButton textContent={"Play the existing game"} btnHeight={"25vh"} />
                </div>
            </div>

            <div>
                <div>{t('ifCreatorCreateNewGame')}:</div>
                <div onClick={() => routToAnotherPage('/creatorLoginPage')}>
                    <StrFinderButton textContent={"Create a new  game"} btnHeight={"25vh"} />
                </div>
            </div>
        </div>
    )
}

export default InitialPage