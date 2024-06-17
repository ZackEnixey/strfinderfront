import { Route, Routes } from "react-router-dom";
import DashboardPage from "../adminPages/DashboardPage";
import NotFoundPage from "../adminPages/NotFoundPage";
import CreatorLoginPage from "../adminPages/CreatorLoginPage";
import CreatorDashboardPage from "../adminPages/CreatorDashboardPage";
import StrengthTypePage from "../adminPages/StrengthTypePage";
import StrengthCreationPage from "../adminPages/StrengthCreationPage";
import GameHomePage from "../gamePages/GameHomePage";
import CreatePlayerPage from "../gamePages/CreatePlayerPage";
import PrivateRoute from "./PrivateRoute";
import SolutionCreationPage from "../adminPages/SolutionCreationPage";
import SolutionListing from "../adminPages/SolutionListing";

const RoutesHandler = () => {
  const routes = [
    { path: "/", element: <DashboardPage /> },
    { path: "/login", element: <CreatorLoginPage /> },
    { path: "/creatorDashboardPage", element: <CreatorDashboardPage /> },
    { path: "/strengths", element: <StrengthTypePage /> },
    { path: "/solutions", element: <SolutionCreationPage /> },
    { path: "/solutions/:type", element: <SolutionListing /> },
    { path: "/strengths/:type", element: <StrengthCreationPage /> },
    { path: "/gameHomePage", element: <GameHomePage /> },
    { path: "/createPlayerPage", element: <CreatePlayerPage /> },
    { path: "*", element: <NotFoundPage /> },
  ];

  return (
    <div>
      <Routes>
        {/* Map over the routes array */}
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
