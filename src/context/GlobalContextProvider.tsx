import React, { FC } from "react";
import { CoreContextProvider } from "./CoreContext";
import { BoardContextProvider } from "./BoardContext";
import { TestContextProvider } from "./TestContext";

interface GlobalContextProps {
  children: React.ReactNode;
}

const GlobalContextProvider: FC<GlobalContextProps> = (props) => {
    return (
        <CoreContextProvider>
          <BoardContextProvider>
            <TestContextProvider>
              {props.children}
            </TestContextProvider>
          </BoardContextProvider>
        </CoreContextProvider>
    );
};

export default GlobalContextProvider;
