import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { AppRoutes } from "./App.jsx";
import { Home } from "./pages/Home.jsx";
import { Services } from "./pages/Services.jsx";
import { Cases } from "./pages/Cases.jsx";
import { CaseDetail } from "./pages/CaseDetail.jsx";
import { StudioPage } from "./pages/StudioPage.jsx";
import { InsightArticle, Insights } from "./pages/Insights.jsx";
import { AutomationCalculator, WorkflowLibrary } from "./pages/Tools.jsx";
import { Solutions } from "./pages/Solutions.jsx";
import { SolutionPage } from "./pages/SolutionPage.jsx";
import { About } from "./pages/About.jsx";
import { Contact } from "./pages/Contact.jsx";
import { Legal } from "./pages/Legal.jsx";
import { NotFound } from "./pages/NotFound.jsx";

export { pageModuleFor } from "./routes.js";

// renderToString cannot wait for lazy chunks, so the prerender uses the
// same route table with every page imported eagerly
const pages = {
  Home,
  Services,
  Cases,
  CaseDetail,
  StudioPage,
  Insights,
  InsightArticle,
  WorkflowLibrary,
  AutomationCalculator,
  Solutions,
  SolutionPage,
  About,
  Contact,
  Legal,
  NotFound,
};

export function render(pathname) {
  return renderToString(
    <StaticRouter location={pathname}>
      <AppRoutes pages={pages} />
    </StaticRouter>,
  );
}
