import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HashRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>
);
