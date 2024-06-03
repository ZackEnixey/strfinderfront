import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CRUDUsers from './CRUDUsers';

const CreatorLoginPage = () => {
    const navigate = useNavigate();
    const [loginTest, setLoginTest] = useState<number>(4);

    const loginExampleFunction = () => {
        setLoginTest(loginTest + 1);
        routToAnotherPage();
    }

    const routToAnotherPage = () => {
        navigate('/creatorDashboardPage');
    }

    return (
        <div>
            <CRUDUsers />
            <div> _____________________________ </div>
            <div>Email:</div>
            <div>
                <input />
            </div>

            <div>Password:</div>
            <div>
                <input />
            </div>

            <div>
                <button onClick={loginExampleFunction}>Log in</button>
            </div>
        </div>
    )
}

export default CreatorLoginPage