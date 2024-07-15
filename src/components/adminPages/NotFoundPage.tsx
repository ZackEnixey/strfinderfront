import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const testFunction = () => {
        navigate("/");
    }


    return (
        <div>
            <div>{t('pageNotFoud')}</div>
            <div>{t('goBAckToStart')}</div>
            <button onClick={testFunction}>Go Back to the initial page</button>
        </div>
    )
}

export default NotFoundPage