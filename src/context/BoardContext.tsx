import React, { FC, createContext, useState } from "react";

interface IBoardContext {
    initialNumber: number, 
    setInitialNumber(initialNumber: number): void;
}

const BoardContext = createContext({} as IBoardContext);

interface BoardContextProps {
    children: React.ReactNode;
}

const BoardContextProvider: FC<BoardContextProps> = (props) => {
    const [initialNumber, setInitialNumber] = useState<number>(360);

    const providerValue = {
        initialNumber, 
        setInitialNumber
    };

    return (
        <BoardContext.Provider value={providerValue}>
            {props.children}
        </BoardContext.Provider>
    );
};

export { BoardContext, BoardContextProvider };