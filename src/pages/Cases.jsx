import { ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { SplitText } from "../wow.jsx";
import { Meta, Reveal } from "../ui.jsx";
import { useContact } from "../layout.jsx";
import { caseItems, stories } from "../data.js";

export function Cases() {
  const openContact = useContact();

  return (
    <main>
      <section className="chapter c-ink page-head">
        <div className="wrap">
          <Reveal>
            <Meta>КЕЙСИ</Meta>
          </Reveal>
          <h1 className="h-xl has-split" data-reveal>
            <SplitText text="Системи, які вже дають результат." />
          </h1>
          <Reveal delay={140}>
            <p className="lede page-lede">
              Виробництво, страхування, рітейл і медтех — там, де ціна помилки
              висока, а ручна робота дорога.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="chapter c-paper-2">
        <div className="wrap">
          <div className="case-list">
            {caseItems.map((item, index) => (
              <Reveal
                as="article"
                className="case-row"
                key={item.slug}
                delay={index * 90}
              >
                <Link className="case-row-link" to={`/cases/${item.slug}`}>
                  <span className="case-row-shot">
                    <img src={item.image} alt="" data-parallax="0.1" />
                    <span className="case-row-index num">{item.index}</span>
                  </span>
                  <span className="case-row-body">
                    <Meta>{item.kicker}</Meta>
                    <h2 className="h-md">{item.title}</h2>
                    <span className="case-row-metric">
                      <strong>{item.metric}</strong>
                      <span>{item.metricLabel}</span>
                    </span>
                  </span>
                  <span className="case-row-go">
                    <ArrowUpRight size={20} weight="bold" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="chapter c-ink-2">
        <div className="wrap">
          <Reveal>
            <Meta>ГОЛОСИ КЛІЄНТІВ</Meta>
          </Reveal>
          <div className="quote-grid">
            {stories.map((story, index) => (
              <Reveal as="article" key={story.name} delay={index * 100}>
                <p>{story.quote}</p>
                <footer>
                  <span className="avatar">{story.initials}</span>
                  <span>
                    <b>{story.name}</b>
                    <Meta>{story.role}</Meta>
                  </span>
                </footer>
              </Reveal>
            ))}
          </div>
          <Reveal delay={220} className="page-actions">
            <button className="btn btn-accent" onClick={openContact}>
              Хочу такий результат <ArrowUpRight size={16} weight="bold" />
            </button>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
