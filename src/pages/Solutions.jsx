import { ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { solutionPages } from "../content.js";
import { Meta } from "../ui.jsx";

export function ProcessLinks({ compact = false }) {
  const items = compact
    ? solutionPages.filter((s) =>
        [
          "crm-automation",
          "ai-recruiter-agency",
          "ai-inbound-call-automation",
          "real-estate-automation",
          "ecommerce-automation",
          "ai-company-knowledge-search",
        ].includes(s.slug),
      )
    : solutionPages;
  return (
    <section className="chapter c-paper process-directory">
      <div className="wrap">
        <div className="process-directory-head">
          <div>
            <Meta>АВТОМАТИЗАЦІЯ ЗА ПРОЦЕСОМ</Meta>
            <h2>З чого почати у вашій команді.</h2>
          </div>
          {compact && (
            <Link className="arrow-link" to="/solutions">
              Усі рішення <ArrowUpRight size={18} />
            </Link>
          )}
        </div>
        <nav
          className="process-directory-links"
          aria-label="Рішення для бізнес-процесів"
        >
          {items.map((s) => (
            <Link key={s.slug} to={`/solutions/${s.slug}`}>
              <div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </div>
              <ArrowUpRight size={20} />
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
export function Solutions() {
  return (
    <main>
      <section className="chapter c-paper solutions-index-hero">
        <div className="wrap">
          <Meta>AI INSIDER / РІШЕННЯ</Meta>
          <h1 className="h-lg">AI-автоматизація починається з процесу.</h1>
          <p className="lede">
            Оберіть задачу команди. Покажемо дані на вході, інтеграції, контроль
            людини та критерії корисного запуску.
          </p>
        </div>
      </section>
      <ProcessLinks />
    </main>
  );
}
