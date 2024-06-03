import { useNavigate } from 'react-router-dom';

const GameHomePage = () => {
    const navigate = useNavigate();

    const routToAnotherPage = () => {
        navigate('/createPlayerPage');
    }

    return (
        <div>
            <div> image </div>
            <div> Use your strengths and play with positive psychology to unleash your potential and elevate your workout experience. </div>
            <div> Game Code </div>
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