import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { pageLoaders, pageModuleFor } from "./routes.js";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./system.css";

const root = document.getElementById("root");
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// load the current page's chunk before hydrating, so the prerendered
// markup is adopted in one pass instead of waiting behind Suspense
const current = pageLoaders[pageModuleFor(window.location.pathname)];

current()
  .catch(() => {})
  .then(() => {
    if (root.hasChildNodes()) hydrateRoot(root, app);
    else createRoot(root).render(app);

    // warm the other pages once the browser is idle so later navigation
    // feels instant without weighing on the first load
    const warm = () =>
      Object.values(pageLoaders).forEach((load) => load().catch(() => {}));
    if (navigator.connection?.saveData) return;
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(warm, { timeout: 4000 });
    } else {
      window.setTimeout(warm, 2500);
    }
  });
