import { ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { Clock, Counter, SplitText } from "../wow.jsx";
import { Meta, Reveal, SectionHead } from "../ui.jsx";
import { useContact } from "../layout.jsx";
import { method, proof, values } from "../data.js";

export function About() {
  const openContact = useContact();

  return (
    <main>
      <section className="chapter c-ink page-head">
        <div className="wrap">
          <Reveal>
            <Meta>ПРО НАС</Meta>
          </Reveal>
          <h1 className="h-xl has-split" data-reveal>
            <SplitText text="Ми не додаємо AI заради ефекту." />
          </h1>
          <Reveal delay={140}>
            <p className="lede page-lede">
              Перебудовуємо те, що має працювати краще, і залишаємо систему,
              якою користуються щодня. Команда працює з Києва та Цюриха —
              українська швидкість і швейцарська вимогливість до деталей.
            </p>
            <div className="page-actions">
              <button className="btn btn-accent" onClick={openContact}>
                Познайомитись <ArrowUpRight size={16} weight="bold" />
              </button>
              <Link className="btn btn-outline" to="/cases">
                Наші роботи
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

      <section className="chapter c-ink-2">
        <div className="wrap">
          <SectionHead
            eyebrow="ПРИНЦИПИ"
            title="Чотири правила, за якими ми беремося за роботу."
          />
          <div className="value-grid">
            {values.map((item) => (
              <Reveal
                className={`value ${item.tone}`}
                key={item.index}
                as="article"
              >
                <div className="value-top">
                  <Meta>{item.label}</Meta>
                  <Meta className="num">{item.index}</Meta>
                </div>
                <div className="value-body">
                  <h3 className="h-md">{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="chapter c-paper">
        <div className="wrap">
          <SectionHead
            eyebrow="ЯК МИ ПРАЦЮЄМО"
            title="Три кроки від розмови до робочої системи."
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
        <div className="wrap">
          <SectionHead
            eyebrow="ДЕ МИ"
            title="Київ і Цюрих, працюємо глобально."
          />
          <div className="office-grid">
            {[
              ["Київ", "Europe/Kyiv", "Розробка, дані, інтеграції"],
              ["Цюрих", "Europe/Zurich", "Стратегія, клієнти, партнерства"],
            ].map(([city, zone, role]) => (
              <Reveal className="office" key={city}>
                <Meta>{city.toUpperCase()}</Meta>
                <strong>
                  <Clock zone={zone} />
                </strong>
                <p>{role}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
