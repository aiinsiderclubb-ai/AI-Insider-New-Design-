import { ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { SplitText } from "../wow.jsx";
import { Meta, Reveal } from "../ui.jsx";
import { useContact } from "../layout.jsx";
import { caseItems, stories } from "../data.js";

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
              <SplitText text="Системи, які вже дають результат." />
            </h1>
            <Reveal delay={120}>
              <p className="lede">
                Реальні впровадження AI-рішень, які економлять час, зменшують
                витрати й дають командам контроль над процесом.
              </p>
            </Reveal>
          </div>
          <Reveal className="atlas-route-metrics" delay={100}>
            {[
              ["−68%", "ручної роботи"],
              ["3,2×", "швидше"],
              ["24/7", "система працює"],
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
          <div className="case-atlas-board">
            <Link
              className="case-atlas-feature"
              to={`/cases/${caseItems[0].slug}`}
            >
              <img src={caseItems[0].image} alt="" />
              <span className="case-atlas-shade" />
              <span className="case-atlas-copy">
                <Meta>
                  {caseItems[0].index} / {caseItems[0].kicker}
                </Meta>
                <h2 className="h-md">{caseItems[0].title}</h2>
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
                    alt=""
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

      <section className="chapter c-paper case-index-section">
        <div className="wrap">
          <Reveal>
            <Meta>03 / УСІ ВПРОВАДЖЕННЯ</Meta>
          </Reveal>
          <div className="case-index-layout">
            <nav className="case-filter" aria-label="Фільтр кейсів">
              {["Усі", "Автоматизація", "AI-агенти", "Контент", "Продукти"].map(
                (item, index) => (
                  <span className={index === 0 ? "is-active" : ""} key={item}>
                    {item}
                  </span>
                ),
              )}
            </nav>
            <div className="case-index-rows">
              {caseItems.map((item) => (
                <Reveal key={item.slug}>
                  <Link to={`/cases/${item.slug}`}>
                    <span className="num">{item.index}</span>
                    <Meta>{item.kicker}</Meta>
                    <strong>{item.metric}</strong>
                    <span>{item.title}</span>
                    <i>
                      <ArrowUpRight size={18} weight="bold" />
                    </i>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="chapter c-paper-2 atlas-testimonials">
        <div className="wrap">
          <Reveal>
            <Meta>04 / ГОЛОСИ КЛІЄНТІВ</Meta>
          </Reveal>
          <div className="atlas-quote-line">
            {stories.map((story, index) => (
              <Reveal as="article" key={story.name} delay={index * 70}>
                <span className="num">0{index + 1}</span>
                <blockquote>“{story.quote}”</blockquote>
                <footer>
                  <b>{story.name}</b>
                  <Meta>{story.role}</Meta>
                </footer>
              </Reveal>
            ))}
          </div>
          <Reveal delay={160} className="page-actions">
            <button className="btn btn-accent" onClick={openContact}>
              Хочу такий результат <ArrowUpRight size={16} weight="bold" />
            </button>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
