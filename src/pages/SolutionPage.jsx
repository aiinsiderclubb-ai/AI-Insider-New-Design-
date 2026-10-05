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
            <nav className="article-breadcrumb" aria-label="Навігаційний шлях">
              <Link to="/solutions">Рішення</Link>
              <span>/</span>
              <span>{solution.kicker}</span>
            </nav>
            <Reveal>
              <Meta>{solution.kicker}</Meta>
            </Reveal>
            <h1 className="h-xl" data-reveal>
              {solution.title}
            </h1>
          </div>
          <Reveal delay={120}>
            <p className="lede">{solution.dek}</p>
            <div className="page-actions">
              <button className="btn btn-accent" onClick={openContact}>
                Розібрати процес <ArrowUpRight size={16} weight="bold" />
              </button>
              <Link
                className="btn btn-outline"
                to="/tools/ai-automation-calculator"
              >
                Порахувати ROI
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="chapter c-paper solution-problem">
        <div className="wrap solution-problem-grid">
          <div>
            <Meta>ДЕ ВТРАЧАЄТЬСЯ ЧАС</Meta>
          </div>
          <div>
            <h2 className="h-lg">Процес до автоматизації.</h2>
            <p className="lede">{solution.problem}</p>
          </div>
        </div>
      </section>

      <section className="chapter c-ink-2 solution-flow">
        <div className="wrap">
          <div className="solution-section-head">
            <div>
              <Meta>РОБОЧИЙ FLOW</Meta>
              <h2 className="h-lg">Від сигналу до контрольованої дії.</h2>
            </div>
            <p>
              Кожен крок має вхід, очікуваний результат, error path і власника
              винятку.
            </p>
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
              <div key={outcome}>
                <Check size={17} weight="bold" />
                <strong>{outcome}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      {solution.details?.length > 0 && (
        <section className="chapter c-paper-2 solution-depth">
          <div className="wrap">
            <div className="solution-section-head">
              <div>
                <Meta>ЩО ВІДБУВАЄТЬСЯ ВСЕРЕДИНІ</Meta>
                <h2 className="h-lg">Не функції. Робоча логіка.</h2>
              </div>
              <p>
                Дані, правила, автоматична дія та межа, після якої рішення
                переходить людині.
              </p>
            </div>
            <div className="solution-depth-grid">
              {solution.details.map((item) => (
                <article key={item.label}>
                  <Meta>{item.label}</Meta>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {solution.measurement?.length > 0 && (
        <section className="chapter c-ink-2 solution-measurement">
          <div className="wrap solution-measurement-grid">
            <div>
              <Meta>ПЕРЕД ЗАПУСКОМ</Meta>
              <h2 className="h-lg">Фіксуємо baseline.</h2>
              <p>
                Порівнюємо однаковий період до та після запуску. Без baseline
                автоматизація лишається красивою демонстрацією.
              </p>
            </div>
            <div className="solution-measurement-list">
              {solution.measurement.map(([label, copy], index) => (
                <div key={label}>
                  <Meta>{String(index + 1).padStart(2, "0")}</Meta>
                  <strong>{label}</strong>
                  <p>{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="chapter c-paper solution-stack">
        <div className="wrap solution-stack-grid">
          <div>
            <Meta>ІНТЕГРАЦІЇ</Meta>
            <h2 className="h-lg">Працює з вашим стеком.</h2>
            <p>
              Конкретний набір залежить від API, прав доступу, data residency та
              критичності процесу.
            </p>
          </div>
          <div className="solution-chips">
            {solution.integrations.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="chapter c-ink solution-faq">
        <div className="wrap solution-faq-grid">
          <div>
            <Meta>ЧАСТІ ПИТАННЯ</Meta>
            <h2 className="h-lg">До першого sprint.</h2>
          </div>
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

      {solution.related?.length > 0 && (
        <section className="chapter c-paper solution-related">
          <div className="wrap">
            <div className="solution-section-head">
              <div>
                <Meta>ПЕРЕВІРИТИ ГЛИБШЕ</Meta>
                <h2 className="h-lg">Докази й наступні інструменти.</h2>
              </div>
              <p>
                Реальний кейс, технічний гайд або розрахунок першого процесу.
              </p>
            </div>
            <div className="solution-related-links">
              {solution.related.map((item) => (
                <Link to={item.to} key={item.to}>
                  <Meta>{item.label}</Meta>
                  <strong>{item.title}</strong>
                  <ArrowUpRight size={20} weight="bold" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="chapter c-paper solution-next">
        <div className="wrap solution-next-inner">
          <Meta>НАСТУПНИЙ КРОК</Meta>
          <h2 className="h-lg">Один процес. Реальні дані. Чесний висновок.</h2>
          <p className="lede">
            За 30 хвилин визначимо вхід, результат, обмеження та метрику першого
            прототипу.
          </p>
          <button className="btn btn-dark" onClick={openContact}>
            Обговорити процес <ArrowUpRight size={16} weight="bold" />
          </button>
        </div>
      </section>
    </main>
  );
}
