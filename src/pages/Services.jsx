import { ArrowUpRight, Check } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { Counter, SplitText } from "../wow.jsx";
import { Faq, Meta, Reveal, SectionHead } from "../ui.jsx";
import { useContact } from "../layout.jsx";
import { method, modules, proof } from "../data.js";

export function Services() {
  const openContact = useContact();

  return (
    <main>
      <section className="chapter c-ink page-head">
        <div className="wrap">
          <Reveal>
            <Meta>ПОСЛУГИ</Meta>
          </Reveal>
          <h1 className="h-xl has-split" data-reveal>
            <SplitText text="Чотири напрями. Одна робоча система." />
          </h1>
          <Reveal delay={140}>
            <p className="lede page-lede">
              Ми не продаємо години розробки. Ми беремо процес, який зараз
              з’їдає час команди, і повертаємо його у вигляді системи, що працює
              сама.
            </p>
            <div className="page-actions">
              <button className="btn btn-accent" onClick={openContact}>
                Обговорити задачу <ArrowUpRight size={16} weight="bold" />
              </button>
              <Link className="btn btn-outline" to="/cases">
                Дивитися кейси
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="chapter c-paper proof">
        <div className="wrap">
          <div className="proof-grid">
            {proof.map(([value, label]) => (
              <Reveal className="proof-cell" key={label}>
                <strong>
                  <Counter value={value} />
                </strong>
                <span>{label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {modules.map((module, index) => {
        const Icon = module.icon;
        return (
          <section
            className={`chapter ${index % 2 ? "c-ink-2" : "c-ink"} svc`}
            key={module.id}
            id={module.id}
            style={{ "--hue": module.hue }}
          >
            <div className="wrap svc-grid">
              <div className="svc-copy">
                <Reveal className="svc-kicker">
                  <Icon size={17} weight="bold" />
                  <Meta>{module.kicker}</Meta>
                  <Meta className="num">0{index + 1} / 04</Meta>
                </Reveal>
                <h2 className="h-lg has-split" data-reveal>
                  <SplitText text={module.title} />
                </h2>
                <Reveal delay={120}>
                  <p>{module.copy}</p>
                </Reveal>
                <div className="svc-chips">
                  {module.flow.map((chip) => (
                    <Reveal as="span" key={chip}>
                      <Check size={12} weight="bold" />
                      {chip}
                    </Reveal>
                  ))}
                </div>
                <Reveal delay={200}>
                  <button className="btn btn-accent" onClick={openContact}>
                    Порахувати ефект <ArrowUpRight size={15} weight="bold" />
                  </button>
                </Reveal>
              </div>
              <div className="svc-figures">
                {module.metrics.map(([value, label], i) => (
                  <Reveal key={label} delay={i * 90}>
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="chapter c-paper">
        <div className="wrap">
          <SectionHead
            eyebrow="ЯК МИ ПРАЦЮЄМО"
            title="Три кроки. Далі система працює на вас."
          />
          <div className="method-rows">
            {method.map(([index, title, copy, when]) => (
              <Reveal className="method-row" key={index}>
                <Meta className="num">{index}</Meta>
                <div>
                  <h3>{title}</h3>
                  <Meta style={{ marginTop: 10 }}>{when}</Meta>
                </div>
                <p>{copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="chapter c-ink">
        <div className="wrap faq-grid">
          <div>
            <Reveal>
              <Meta>ЧАСТІ ПИТАННЯ</Meta>
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
