import React, { FC, createContext, useState } from "react";

interface ICoreContext {
    selectedLanguage: string, 
    setSelectedLanguage(selectedLanguage: string): void;
}

const CoreContext = createContext({} as ICoreContext);

interface CoreContextProps {
    children: React.ReactNode;
}

const CoreContextProvider: FC<CoreContextProps> = (props) => {
    const [selectedLanguage, setSelectedLanguage] = useState<string>("English");

    const providerValue = {
        selectedLanguage, 
        setSelectedLanguage
    };

    return (
        <CoreContext.Provider value={providerValue}>
            {props.children}
        </CoreContext.Provider>
    );
};

export { CoreContext, CoreContextProvider };