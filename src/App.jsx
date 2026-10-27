import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./layout.jsx";
import { pageLoaders, pageModules, routeTable } from "./routes.js";

const lazyPages = Object.fromEntries(
  Object.entries(pageModules).map(([name, file]) => [
    name,
    lazy(() => pageLoaders[file]().then((mod) => ({ default: mod[name] }))),
  ]),
);

/** `pages` maps page names to components; the prerenderer passes eager ones. */
export function AppRoutes({ pages = lazyPages }) {
  return (
    <Routes>
      <Route element={<Layout />}>
        {routeTable.map(({ path, page, props }) => {
          const Page = pages[page];
          return <Route key={path} path={path} element={<Page {...props} />} />;
        })}
      </Route>
    </Routes>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
