import { Route, Routes } from "react-router-dom";

import AdminDashboardPage from "../adminPages/AdminDashboardPage";
import NotFoundPage from "../adminPages/NotFoundPage";
import CreatorLoginPage from "../adminPages/CreatorLoginPage";
import StrengthTypePage from "../adminPages/StrengthTypePage";
import StrengthCreationPage from "../adminPages/StrengthCreationPage";
import GameHomePage from "../gamePages/GameHomePage";
import CreatePlayerPage from "../gamePages/CreatePlayerPage";
import PrivateRoute from "./PrivateRoute";
import SolutionCreationPage from "../adminPages/SolutionCreationPage";
import SolutionListing from "../adminPages/SolutionListing";
import QuestionCreationPage from "../adminPages/QuestionCreationPage";
import ActionCreationPage from "../adminPages/ActionCreationPage";
import InitialPage from "../gamePages/InitialPage";
import GameStrengths from "../gamePages/GameStrengths";
import GameTemplateCodeInsertion from "../gamePages/GameTemplateCodeInsertion";
import GameGroups from "../gamePages/GameGroups";
import GameStrengthManager from "../gamePages/GameStrengthManager";
import PsychologicalSurvey from "../gamePages/PsychologicalSurvey";
import KnowMyStrengths from "../gamePages/KnowMyStrengths";
import GameCreationPage from "../adminPages/GameCreationPage";
import CreatorFinalPage from "../adminPages/CreatorFinalPage";

const RoutesHandler = () => {
  const routes = [
    { path: "/", element: <InitialPage /> },

    { path: "/login", element: <CreatorLoginPage /> },
    { path: "/adminDashboardPage", element: <AdminDashboardPage /> },
    { path: "/strengths", element: <StrengthTypePage /> },
    { path: "/strengths/:type", element: <StrengthCreationPage /> },
    { path: "/solutions", element: <SolutionCreationPage /> },
    { path: "/solutions/:type", element: <SolutionListing /> },
    { path: "/questions", element: <QuestionCreationPage /> },
    { path: "/actions", element: <ActionCreationPage /> },
    { path: "/gameCreationPage", element: <GameCreationPage /> },
    { path: "/creatorFinalPage", element: <CreatorFinalPage /> },

    { path: "/gameHomePage", element: <GameHomePage /> },

    { path: "/game/createPlayer", element: <CreatePlayerPage /> },
    { path: "/game/gameStrengths", element: <GameStrengths /> },
    { path: "/game/gameStrengthManager", element: <GameStrengthManager /> },
    { path: "/game/psychologicalSurvey", element: <PsychologicalSurvey /> },
    { path: "/game/knowMyStrengths", element: <KnowMyStrengths /> },
    { path: "/game/gameTemplateCodeInsertion", element: <GameTemplateCodeInsertion /> },
    { path: "/game/gameGroups", element: <GameGroups /> },

    { path: "*", element: <NotFoundPage /> },
  ];

  return (
    <div>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={
              path === "/login" ? (
                element
              ) : (
                <PrivateRoute>{element}</PrivateRoute>
              )
            }
          />
        ))}
      </Routes>
    </div>
  );
};

export default RoutesHandler;
