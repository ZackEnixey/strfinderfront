import React, { FC } from "react";
import { CoreContextProvider } from "./CoreContext";
import { BoardContextProvider } from "./BoardContext";
import { TestContextProvider } from "./TestContext";
import { CheckedStrengthsProvider } from "./CheckedStrenghsContext";
import { CheckedSolutionsProvider } from "./CheckedSoltuionsContext";
import { ModeProvider } from "./ModeContext";
import { GameTemplateProvider } from "./GameTemplateContext";
import { IsDilemmaOwnerProvider } from "./IsDilemmaOwnerContext";

interface GlobalContextProps {
  children: React.ReactNode;
}

const GlobalContextProvider: FC<GlobalContextProps> = (props) => {
  return (
    <CoreContextProvider>
      <ModeProvider>
        <BoardContextProvider>
          <TestContextProvider>
            <CheckedStrengthsProvider>
              <CheckedSolutionsProvider>
                <GameTemplateProvider>
                  <IsDilemmaOwnerProvider>
                    {props.children}
                  </IsDilemmaOwnerProvider>
                </GameTemplateProvider>
              </CheckedSolutionsProvider>
            </CheckedStrengthsProvider>
          </TestContextProvider>
        </BoardContextProvider>
      </ModeProvider>
    </CoreContextProvider>
  );
};

export default GlobalContextProvider;
