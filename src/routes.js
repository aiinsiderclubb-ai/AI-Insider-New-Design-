import { matchRoutes } from "react-router-dom";

// Every page lives in its own chunk. The table is shared by the client
// router, the prerenderer (eager imports) and the pre-hydration preload.
export const pageModules = {
  Home: "./pages/Home.jsx",
  Services: "./pages/Services.jsx",
  Cases: "./pages/Cases.jsx",
  CaseDetail: "./pages/CaseDetail.jsx",
  StudioPage: "./pages/StudioPage.jsx",
  Insights: "./pages/Insights.jsx",
  InsightArticle: "./pages/Insights.jsx",
  WorkflowLibrary: "./pages/Tools.jsx",
  AutomationCalculator: "./pages/Tools.jsx",
  Solutions: "./pages/Solutions.jsx",
  SolutionPage: "./pages/SolutionPage.jsx",
  About: "./pages/About.jsx",
  Contact: "./pages/Contact.jsx",
  Legal: "./pages/Legal.jsx",
  NotFound: "./pages/NotFound.jsx",
};

// literal import() calls so the bundler can see and split each module
export const pageLoaders = {
  "./pages/Home.jsx": () => import("./pages/Home.jsx"),
  "./pages/Services.jsx": () => import("./pages/Services.jsx"),
  "./pages/Cases.jsx": () => import("./pages/Cases.jsx"),
  "./pages/CaseDetail.jsx": () => import("./pages/CaseDetail.jsx"),
  "./pages/StudioPage.jsx": () => import("./pages/StudioPage.jsx"),
  "./pages/Insights.jsx": () => import("./pages/Insights.jsx"),
  "./pages/Tools.jsx": () => import("./pages/Tools.jsx"),
  "./pages/Solutions.jsx": () => import("./pages/Solutions.jsx"),
  "./pages/SolutionPage.jsx": () => import("./pages/SolutionPage.jsx"),
  "./pages/About.jsx": () => import("./pages/About.jsx"),
  "./pages/Contact.jsx": () => import("./pages/Contact.jsx"),
  "./pages/Legal.jsx": () => import("./pages/Legal.jsx"),
  "./pages/NotFound.jsx": () => import("./pages/NotFound.jsx"),
};

export const routeTable = [
  { path: "/", page: "Home" },
  { path: "/services", page: "Services" },
  { path: "/cases", page: "Cases" },
  { path: "/cases/:slug", page: "CaseDetail" },
  { path: "/studio", page: "StudioPage" },
  { path: "/insights", page: "Insights" },
  { path: "/insights/:slug", page: "InsightArticle" },
  { path: "/tools/n8n-workflow-library", page: "WorkflowLibrary" },
  { path: "/tools/ai-automation-calculator", page: "AutomationCalculator" },
  { path: "/solutions", page: "Solutions" },
  { path: "/solutions/:slug", page: "SolutionPage" },
  { path: "/about", page: "About" },
  { path: "/contact", page: "Contact" },
  { path: "/privacy", page: "Legal", props: { kind: "privacy" } },
  { path: "/terms", page: "Legal", props: { kind: "terms" } },
  { path: "*", page: "NotFound" },
];

/** Source module of the page that renders `pathname`. */
export function pageModuleFor(pathname) {
  const [match] = matchRoutes(routeTable, pathname) || [];
  return pageModules[match ? match.route.page : "NotFound"];
}
