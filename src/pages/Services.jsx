import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { SplitText } from "../wow.jsx";
import { Faq, Meta, Reveal } from "../ui.jsx";
import { useContact } from "../layout.jsx";
import { method, modules } from "../data.js";

const serviceMedia = [
  { src: "/assets/capability-orb.png", light: true },
  { src: "/assets/case-industrial.png" },
  { src: "/assets/capability-system.png", light: true },
  { src: "/assets/delivery-wave-crop.png", light: true },
];

export function Services() {
  const openContact = useContact();
  const [active, setActive] = useState(0);
  const current = modules[active];
  const CurrentIcon = current.icon;

  return (
    <main className="atlas-page atlas-services">
      <section className="chapter c-paper atlas-hero">
        <div className="wrap atlas-hero-grid">
          <div className="atlas-hero-copy">
            <Reveal>
              <Meta>01 / ПОСЛУГИ</Meta>
            </Reveal>
            <h1 className="h-xl has-split" data-reveal>
              <SplitText text="Чотири напрями. Одна робоча система." />
            </h1>
            <Reveal delay={120}>
              <p className="lede">
                Поєднуємо AI-агентів, автоматизацію, власний інтелект і
                стратегію в архітектуру, що масштабує результат.
              </p>
              <div className="page-actions">
                <button className="btn btn-accent" onClick={openContact}>
                  Обговорити проєкт <ArrowUpRight size={16} weight="bold" />
                </button>
                <Link className="btn btn-outline" to="/cases">
                  Дивитися кейси
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal className="service-conductor" delay={100}>
            <img src="/assets/capability-system.png" alt="" />
            <div className="service-route-lines" aria-hidden="true">
              {modules.map((module, index) => (
                <span key={module.id} style={{ "--line-index": index }}>
                  <i />
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="c-paper atlas-board-section">
        <div className="wrap">
          <div className="service-atlas">
            <div
              className="service-atlas-nav"
              role="tablist"
              aria-label="Напрями послуг"
            >
              {modules.map((module, index) => {
                const Icon = module.icon;
                return (
                  <button
                    key={module.id}
                    className={active === index ? "is-active" : ""}
                    onClick={() => setActive(index)}
                    role="tab"
                    aria-selected={active === index}
                    aria-controls="service-atlas-panel"
                  >
                    <span className="num">0{index + 1}</span>
                    <span className="service-atlas-name">
                      <Icon size={18} />
                      {module.tab}
                    </span>
                    <span className="service-atlas-summary">{module.copy}</span>
                    <strong>{module.metrics[0][0]}</strong>
                    <ArrowRight size={18} />
                  </button>
                );
              })}
            </div>
            <div
              className="service-atlas-detail"
              id="service-atlas-panel"
              role="tabpanel"
            >
              <div className="service-atlas-content" key={current.id}>
                <Meta>{current.kicker}</Meta>
                <h2 className="h-md">
                  <CurrentIcon size={26} />
                  {current.title}
                </h2>
                <p>{current.copy}</p>
                <div className="service-atlas-flow">
                  {current.flow.map((item, index) => (
                    <span key={item}>
                      <i className="num">0{index + 1}</i>
                      {item}
                    </span>
                  ))}
                </div>
                <button className="btn btn-accent" onClick={openContact}>
                  Порахувати ефект <ArrowUpRight size={15} weight="bold" />
                </button>
              </div>
              <div className="service-atlas-media" key={`${current.id}-media`}>
                <img
                  className={serviceMedia[active].light ? "is-light-art" : ""}
                  src={serviceMedia[active].src}
                  alt=""
                />
                <span className="service-atlas-metric">
                  <strong>{current.metrics[1][0]}</strong>
                  <small>{current.metrics[1][1]}</small>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="chapter c-paper atlas-process">
        <div className="wrap">
          <Reveal>
            <Meta>02 / ЯК МИ ПРАЦЮЄМО</Meta>
          </Reveal>
          <div className="atlas-process-head">
            <h2 className="h-lg">Три кроки. Далі система працює на вас.</h2>
            <p>Кожен етап має результат, дату й відповідального.</p>
          </div>
          <div className="atlas-process-steps">
            {method.map(([index, title, copy, when]) => (
              <Reveal className="atlas-process-step" key={index}>
                <strong className="num">{index}</strong>
                <h3>{title}</h3>
                <p>{copy}</p>
                <Meta>{when}</Meta>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="chapter c-paper-2 atlas-faq">
        <div className="wrap faq-grid">
          <div>
            <Reveal>
              <Meta>03 / ЧАСТІ ПИТАННЯ</Meta>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="h-lg" style={{ marginTop: 14 }}>
                Відповіді без дрібного шрифту.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <Faq />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
