import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import App from "./App.jsx";
import { HealthProvider } from "./context/HealthContext.jsx";

// HashRouter keeps routing working on GitHub Pages without extra config
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <HealthProvider>
        <App />
      </HealthProvider>
    </HashRouter>
  </React.StrictMode>
);
