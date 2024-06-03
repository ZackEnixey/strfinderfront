import { useState } from 'react';

const NotFoundPage = () => {
    const [notFoundPageTest, setNotFoundPageTest] = useState<number>(1);

    const testFunction = (value: number) => {
        setNotFoundPageTest(notFoundPageTest + value);
    }

    return (
        <div>
            <div>PAGE NOT FOUND</div>
            <div>Go back to START</div>
            <button onClick={() => testFunction(1)}>Play the existing game</button>
        </div>
    )
}

export default NotFoundPage