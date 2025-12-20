import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// main.tsx
import './styles/theme.css'
//import './index.css'

const rootElement = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);