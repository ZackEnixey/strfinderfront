import { Navigate, Route, Routes } from 'react-router-dom';
import InitialPage from '../adminPages/InitialPage';
import NotFoundPage from '../adminPages/NotFoundPage';
import CreatorLoginPage from '../adminPages/CreatorLoginPage';
import CreatorDashboardPage from '../adminPages/CreatorDashboardPage';
import CreatingStrengthsPage from '../adminPages/CreatingStrengthsPage';
import GameHomePage from '../gamePages/GameHomePage';
import CreatePlayerPage from '../gamePages/CreatePlayerPage';

const RoutesHandler = () => {
  return (
    <div>
         <Routes>
            {/* ADMIN PAGE URLs */}
            <Route path="/initialPage" element={<InitialPage />} />
            <Route path="/creatorLoginPage" element={<CreatorLoginPage />} />
            <Route path="/creatorDashboardPage" element={<CreatorDashboardPage />} />
            <Route path="/creatingStrengthsPage" element={<CreatingStrengthsPage />} />
            
            {/* GAME URLs */}
            <Route path="/gameHomePage" element={<GameHomePage />} />
            <Route path="/createPlayerPage" element={<CreatePlayerPage />} />
            
            <Route path="/" element={<Navigate to={`/initialPage`} />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </div>
  )
}

export default RoutesHandler
