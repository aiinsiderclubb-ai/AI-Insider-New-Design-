import { ArrowRight, ArrowUpRight, Check } from "@phosphor-icons/react";
import { Link, useParams } from "react-router-dom";
import { solutionBySlug } from "../content.js";
import { useContact } from "../layout.jsx";
import { Meta, Reveal } from "../ui.jsx";
import { NotFound } from "./NotFound.jsx";

export function SolutionPage() {
  const { slug } = useParams();
  const solution = solutionBySlug[slug];
  const openContact = useContact();

  if (!solution) return <NotFound />;

  return (
    <main className="solution-page">
      <section className="chapter c-ink solution-hero">
        <div className="wrap solution-hero-grid">
          <div>
            <Reveal><Meta>{solution.kicker}</Meta></Reveal>
            <h1 className="h-xl" data-reveal>{solution.title}</h1>
          </div>
          <Reveal delay={120}>
            <p className="lede">{solution.dek}</p>
            <div className="page-actions">
              <button className="btn btn-accent" onClick={openContact}>
                Розібрати процес <ArrowUpRight size={16} weight="bold" />
              </button>
              <Link className="btn btn-outline" to="/tools/ai-automation-calculator">
                Порахувати ROI
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="chapter c-paper solution-problem">
        <div className="wrap solution-problem-grid">
          <div><Meta>ДЕ ВТРАЧАЄТЬСЯ ЧАС</Meta></div>
          <div>
            <h2 className="h-lg">Процес до автоматизації.</h2>
            <p className="lede">{solution.problem}</p>
          </div>
        </div>
      </section>

      <section className="chapter c-ink-2 solution-flow">
        <div className="wrap">
          <div className="solution-section-head">
            <div><Meta>РОБОЧИЙ FLOW</Meta><h2 className="h-lg">Від сигналу до контрольованої дії.</h2></div>
            <p>Кожен крок має вхід, очікуваний результат, error path і власника винятку.</p>
          </div>
          <ol className="solution-flow-list">
            {solution.flow.map((step, index) => (
              <li key={step}>
                <Meta>{String(index + 1).padStart(2, "0")}</Meta>
                <strong>{step}</strong>
                {index < solution.flow.length - 1 && <ArrowRight size={18} />}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="chapter c-tint solution-outcomes">
        <div className="wrap solution-outcome-grid">
          <div>
            <Meta>ОЧІКУВАНИЙ ЕФЕКТ</Meta>
            <h2 className="h-lg">Спочатку baseline. Потім результат.</h2>
          </div>
          <div className="solution-outcome-list">
            {solution.outcomes.map((outcome) => (
              <div key={outcome}><Check size={17} weight="bold" /><strong>{outcome}</strong></div>
            ))}
          </div>
        </div>
      </section>

      <section className="chapter c-paper solution-stack">
        <div className="wrap solution-stack-grid">
          <div>
            <Meta>ІНТЕГРАЦІЇ</Meta>
            <h2 className="h-lg">Працює з вашим стеком.</h2>
            <p>Конкретний набір залежить від API, прав доступу, data residency та критичності процесу.</p>
          </div>
          <div className="solution-chips">
            {solution.integrations.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
      </section>

      <section className="chapter c-ink solution-faq">
        <div className="wrap solution-faq-grid">
          <div><Meta>ЧАСТІ ПИТАННЯ</Meta><h2 className="h-lg">До першого sprint.</h2></div>
          <div>
            {solution.faq.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="chapter c-paper solution-next">
        <div className="wrap solution-next-inner">
          <Meta>НАСТУПНИЙ КРОК</Meta>
          <h2 className="h-lg">Один процес. Реальні дані. Чесний висновок.</h2>
          <p className="lede">За 30 хвилин визначимо вхід, результат, обмеження та метрику першого прототипу.</p>
          <button className="btn btn-dark" onClick={openContact}>
            Обговорити процес <ArrowUpRight size={16} weight="bold" />
          </button>
        </div>
      </section>
    </main>
  );
}
