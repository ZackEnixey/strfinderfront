import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./scss/main.scss";
import GlobalContextProvider from "./context/GlobalContextProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import "./i18n/i18n.ts";
import { AuthProvider } from "./context/AuthContext.tsx";
import { SolutionsProvider } from "./context/SolutionContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalContextProvider>
      <BrowserRouter>
        <AuthProvider>
          <SolutionsProvider>
            <App />
          </SolutionsProvider>
        </AuthProvider>
      </BrowserRouter>
    </GlobalContextProvider>
  </React.StrictMode>
);
