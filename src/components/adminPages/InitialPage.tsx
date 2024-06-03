import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StrFinderButton from '../reusableParts/StrFinderButton';

const InitialPage = () => {
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
                <div>Count: {initialPageTest} </div>
                <button onClick={() => testFunction(1)}>counter</button>
            </div>

            <div>
                <div>If you already have a CODE: </div>
                <div onClick={() => routToAnotherPage('/gameHomePage')}>
                    <StrFinderButton textContent={"Play the existing game"} btnHeight={"25vh"} />
                </div>
            </div>

            <div>
                <div>If you are a creator and need to create a new game or to update an exiting one:</div>
                <div onClick={() => routToAnotherPage('/creatorLoginPage')}>
                    <StrFinderButton textContent={"Create a new  game"} btnHeight={"25vh"} />
                </div>
            </div>
        </div>
    )
}

export default InitialPage