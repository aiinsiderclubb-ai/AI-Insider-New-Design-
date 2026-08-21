import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { SplitText } from "../wow.jsx";
import { Meta, Reveal } from "../ui.jsx";
import { useContact } from "../layout.jsx";
import { caseItems } from "../data.js";

export function Cases() {
  const openContact = useContact();

  return (
    <main className="atlas-page atlas-cases">
      <section className="chapter c-paper atlas-hero cases-atlas-hero">
        <div className="wrap atlas-hero-grid">
          <div className="atlas-hero-copy">
            <Reveal>
              <Meta>02 / КЕЙСИ</Meta>
            </Reveal>
            <h1 className="h-xl has-split" data-reveal>
              <SplitText text="Не презентації. Системи в роботі." />
            </h1>
            <Reveal delay={120}>
              <p className="lede">
                Три реальні формати: операційний конвеєр, AI-рекрутер і
                виробництво відео. Показуємо архітектуру, складні місця та
                підтверджений результат — без магічних дашбордів.
              </p>
            </Reveal>
          </div>
          <Reveal className="atlas-route-metrics" delay={100}>
            {[
              ["539", "задач у контурі"],
              ["0", "втрат при переносі"],
              ["3", "production-системи"],
            ].map(([value, label]) => (
              <span key={label}>
                <strong>{value}</strong>
                <small>{label}</small>
                <i />
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="c-paper atlas-board-section">
        <div className="wrap">
          <Reveal className="case-proof-note">
            <Meta>01 / ВИБРАНІ ВПРОВАДЖЕННЯ</Meta>
            <p>Великий кейс — з виміряним ефектом. Поруч — дві системи, зібрані під конкретний процес.</p>
          </Reveal>
          <div className="case-atlas-board case-atlas-board-real">
            <Link
              className="case-atlas-feature"
              to={`/cases/${caseItems[0].slug}`}
            >
              <img src={caseItems[0].image} alt="Автоматизована виробнича система" />
              <span className="case-proof-stamp">
                <small>ПІСЛЯ ЗАПУСКУ</small>
                <strong>44 → 0</strong>
                <em>дублів задач</em>
              </span>
              <span className="case-atlas-shade" />
              <span className="case-atlas-copy">
                <Meta>
                  {caseItems[0].index} / {caseItems[0].kicker}
                </Meta>
                <h2 className="h-md">{caseItems[0].title}</h2>
                <p>ClickUp, n8n і фінмодель зібрані в один виробничий контур.</p>
                <span className="case-atlas-result">
                  <strong>{caseItems[0].metric}</strong>
                  {caseItems[0].metricLabel}
                </span>
                <span className="arrow-link">
                  Дивитися кейс <ArrowUpRight size={18} weight="bold" />
                </span>
              </span>
            </Link>
            <div className="case-atlas-rail">
              {caseItems.slice(1).map((item) => (
                <Link key={item.slug} to={`/cases/${item.slug}`}>
                  <img
                    className={item.invert ? "is-inverted" : ""}
                    src={item.image}
                    alt={item.title}
                  />
                  <span className="case-atlas-shade" />
                  <span className="case-atlas-copy">
                    <Meta>
                      {item.index} / {item.kicker}
                    </Meta>
                    <h3>{item.title}</h3>
                    <span className="case-atlas-result">
                      <strong>{item.metric}</strong>
                      {item.metricLabel}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="chapter c-paper case-index-section case-method-section">
        <div className="wrap">
          <Reveal className="case-method-head">
            <div>
              <Meta>03 / ЯК ЧИТАТИ КЕЙСИ</Meta>
              <h2 className="h-lg">Від вузького місця до робочої системи.</h2>
            </div>
            <p className="lede">Кожен кейс розкладений не на красиві обіцянки, а на логіку рішення: що ламалося, що побудували, де була інженерна складність і чим завершився запуск.</p>
          </Reveal>
          <div className="case-method-rail">
            {["Контекст", "Архітектура", "Критичний вузол", "Перевірка", "Результат"].map((label, index) => (
              <Reveal as="div" key={label} delay={index * 55}>
                <span className="num">0{index + 1}</span>
                <i aria-hidden="true" />
                <strong>{label}</strong>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="chapter c-ink case-index-dark">
        <div className="wrap">
          <Reveal>
            <Meta>04 / УСІ КЕЙСИ</Meta>
          </Reveal>
          <div className="case-index-dark-list">
            {caseItems.map((item) => (
              <Reveal key={item.slug}>
                <Link to={`/cases/${item.slug}`}>
                  <span className="num">{item.index}</span>
                  <span>
                    <Meta>{item.kicker}</Meta>
                    <strong>{item.title}</strong>
                  </span>
                  <span className="case-index-dark-metric"><b>{item.metric}</b>{item.metricLabel}</span>
                  <i><ArrowRight size={20} weight="bold" /></i>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={160} className="page-actions">
            <button className="btn btn-accent" onClick={openContact}>
              Розібрати мій процес <ArrowUpRight size={16} weight="bold" />
            </button>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
