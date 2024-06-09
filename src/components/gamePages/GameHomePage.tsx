import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const GameHomePage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const routToAnotherPage = () => {
        navigate('/createPlayerPage');
    }

    return (
        <div>
            <div>i_m_a_g_e</div>
            <div>{t('useYourStrText')}</div>
            <div>{t('gameCodes')}</div>
            <div>
                <input />
            </div>
            <div>
                <button onClick={routToAnotherPage}>START</button>
            </div>
        </div>
    )
}

export default GameHomePage