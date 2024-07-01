import React, { FC } from "react";
import { CoreContextProvider } from "./CoreContext";
import { BoardContextProvider } from "./BoardContext";
import { TestContextProvider } from "./TestContext";
import { CheckedStrengthsProvider } from "./CheckedStrenghsContext";
import { CheckedSolutionsProvider } from "./CheckedSoltuionsContext";

interface GlobalContextProps {
  children: React.ReactNode;
}

const GlobalContextProvider: FC<GlobalContextProps> = (props) => {
  return (
    <CoreContextProvider>
      <BoardContextProvider>
        <TestContextProvider>
          <CheckedStrengthsProvider>
            <CheckedSolutionsProvider>
              {props.children}
            </CheckedSolutionsProvider>
          </CheckedStrengthsProvider>
        </TestContextProvider>
      </BoardContextProvider>
    </CoreContextProvider>
  );
};

export default GlobalContextProvider;
