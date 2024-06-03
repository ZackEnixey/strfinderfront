import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatorDashboardPage = () => {
    const navigate = useNavigate();
    const [creatorDashboard, setCreatorDashboard] = useState<number>(4);

    const creatorDashboardExampleFunction = () => {
        setCreatorDashboard(creatorDashboard + 1);
        routToAnotherPage();
    }

    const routToAnotherPage = () => {
        navigate('/creatingStrengthsPage');
    }

    return (
        <div>
            <div>Your Game Code:</div>
            <div>
                <div>123456</div>
                <div>123457</div>
                <div>123458</div>
            </div>

            
            <div>If you want to crate a new game:</div>
            <div>
                <button onClick={creatorDashboardExampleFunction}>Create A new Match</button>
            </div>
        </div>
    )
}

export default CreatorDashboardPage;