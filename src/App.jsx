import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./layout.jsx";
import { Home } from "./pages/Home.jsx";
import { Services } from "./pages/Services.jsx";
import { Cases } from "./pages/Cases.jsx";
import { CaseDetail } from "./pages/CaseDetail.jsx";
import { StudioPage } from "./pages/StudioPage.jsx";
import { About } from "./pages/About.jsx";
import { Contact } from "./pages/Contact.jsx";
import { Legal } from "./pages/Legal.jsx";
import { NotFound } from "./pages/NotFound.jsx";
import { InsightArticle, Insights } from "./pages/Insights.jsx";
import { AutomationCalculator, WorkflowLibrary } from "./pages/Tools.jsx";
import { SolutionPage } from "./pages/SolutionPage.jsx";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/cases" element={<Cases />} />
        <Route path="/cases/:slug" element={<CaseDetail />} />
        <Route path="/studio" element={<StudioPage />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/insights/:slug" element={<InsightArticle />} />
        <Route path="/tools/n8n-workflow-library" element={<WorkflowLibrary />} />
        <Route path="/tools/ai-automation-calculator" element={<AutomationCalculator />} />
        <Route path="/solutions/:slug" element={<SolutionPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Legal kind="privacy" />} />
        <Route path="/terms" element={<Legal kind="terms" />} />
        <Route path="*" element={<NotFound />} />
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
