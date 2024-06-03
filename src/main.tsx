import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import "./scss/main.scss";
import GlobalContextProvider from './context/GlobalContextProvider.tsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GlobalContextProvider>
  </React.StrictMode>,
)
