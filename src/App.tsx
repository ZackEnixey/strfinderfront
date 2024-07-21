import "./App.css";
import Header from "./components/adminPages/Header";
import RoutesHandler from "./components/routHandler/RoutesHandler";

function App() {
  return (
    <>
      <div id="app_wrapper" className="app_wrapper">
        <div className="app_content">
          <Header />
          <div className="router_wrapper">
            <RoutesHandler />
          </div>
        </div>

        <div className="game_background">
          <div className="line line1">
            <div className="glare delay_long"></div>
          </div>
          <div className="line line2">
            <div className="glare delay_short"></div>
          </div>
        </div>

      </div>
    </>
  );
}

export default App;
