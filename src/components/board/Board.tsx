import { useContext } from "react";
import { useTranslation } from "react-i18next";

import { BoardContext } from "../../context";
import Language from "../language/Language";
import UserList from "./UserList";
import CreateNewUser from "./CreateNewUser";


const Board = () => {
    const { initialNumber, setInitialNumber } = useContext(BoardContext);
    const { t } = useTranslation('common');
    
    return (
        <div>
            <Language />
            <div>{t("welcomeToTheGame")}...</div>
            <div> Random number {initialNumber} </div>
            <button onClick={() => setInitialNumber(initialNumber+1)}> update</button>
            <div>
                <UserList />
                <CreateNewUser />
            </div>
        </div>
    )
}

export default Board;