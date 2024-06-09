import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
    const { t } = useTranslation();
    const [notFoundPageTest, setNotFoundPageTest] = useState<number>(1);

    const testFunction = (value: number) => {
        setNotFoundPageTest(notFoundPageTest + value);
    }

    return (
        <div>
            <div>{t('pageNotFoud')}</div>
            <div>{t('goBAckToStart')}</div>
            <button onClick={() => testFunction(1)}>{t('playTheExistingGame')}</button>
        </div>
    )
}

export default NotFoundPage