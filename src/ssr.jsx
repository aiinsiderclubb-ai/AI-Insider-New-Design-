import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { AppRoutes } from "./App.jsx";

export function render(pathname) {
  return renderToString(
    <StaticRouter location={pathname}>
      <AppRoutes />
    </StaticRouter>,
  );
}
