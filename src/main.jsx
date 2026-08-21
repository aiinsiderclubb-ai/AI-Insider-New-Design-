import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./App.jsx";
import "@fontsource/cormorant-garamond/cyrillic-600.css";
import "./system.css";

const root = document.getElementById("root");
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
