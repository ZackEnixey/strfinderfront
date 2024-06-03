import './App.css';
import Header from './components/adminPages/Header';
import RoutesHandler from './components/routHandler/RoutesHandler';

function App() {
    

    return (
        <>
        <div id="app_wrapper" className='app_wrapper'>
            <div className='background-image' />
            <div className='app_content full_center'>
                <Header />
                <div id="router_wrapper">
                    <RoutesHandler />
                </div>
            </div>            
        </div>
        </>
    )
}

export default App
