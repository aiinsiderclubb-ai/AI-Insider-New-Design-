import { ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { Counter, SplitText } from "../wow.jsx";
import { Meta, Reveal } from "../ui.jsx";
import { useContact } from "../layout.jsx";
import { caseItems } from "../data.js";

/* Що саме ламалося до запуску — одним рядком, людською мовою. */
const problem = {
  "operatsiina-systema-kreatyvnoi-ahentsii":
    "Задачі жили в чатах, дублювалися і губилися між менеджерами.",
  "ai-rekruter-dlia-ahentsii":
    "Рекрутер вручну вів листування з десятками кандидатів одночасно.",
  "content-factory-ai-video":
    "Кожен ролик вимагав зйомки, монтажу і тижня очікування.",
};

const stages = [
  ["01", "Що ламалося", "З чого почалося і скільки це коштувало щомісяця."],
  ["02", "Що побудували", "Які системи з’єднали і хто чим тепер користується."],
  ["03", "Де було складно", "Місце, через яке проєкт міг не поїхати."],
  ["04", "Що вийшло", "Цифри після запуску, а не обіцянки до нього."],
];

export function Cases() {
  const openContact = useContact();

  return (
    <main className="atlas-page atlas-cases">
      <section className="chapter c-paper atlas-hero cases-atlas-hero">
        <div className="wrap atlas-hero-grid">
          <div className="atlas-hero-copy">
            <Reveal>
              <Meta>КЕЙСИ</Meta>
            </Reveal>
            <h1 className="h-xl has-split" data-reveal>
              <SplitText text="Не презентації. Системи, які працюють щодня." />
            </h1>
            <Reveal delay={120}>
              <p className="lede">
                Три проєкти, які зараз у роботі: конвеєр задач для агенції,
                рекрутер у Telegram і виробництво відео. Нижче — що саме
                ламалося, що ми зібрали і що змінилося після запуску.
              </p>
            </Reveal>
          </div>
          <Reveal className="atlas-route-metrics" delay={100}>
            {[
              ["539", "задач ведеться системою"],
              ["0", "задач губиться при передачі"],
              ["3", "системи в щоденній роботі"],
            ].map(([value, label]) => (
              <span key={label}>
                <strong>
                  <Counter value={value} />
                </strong>
                <small>{label}</small>
                <i />
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="chapter c-paper case-rows-section">
        <div className="wrap">
          <div className="case-rows">
            {caseItems.map((item, index) => (
              <Reveal
                as="article"
                className="case-row-full"
                key={item.slug}
                delay={index * 80}
              >
                <Link to={`/cases/${item.slug}`}>
                  <span className="case-row-full-shot">
                    <img
                      className={item.invert ? "is-inverted" : ""}
                      src={item.image}
                      alt=""
                      data-parallax="0.09"
                    />
                    <span className="case-row-full-index num">
                      {item.index}
                    </span>
                  </span>

                  <span className="case-row-full-body">
                    <Meta>{item.kicker}</Meta>
                    <h2 className="h-md">{item.title}</h2>
                    <span className="case-row-full-problem">
                      <i aria-hidden="true" />
                      {problem[item.slug]}
                    </span>
                    <span className="case-row-full-foot">
                      <span className="case-row-full-metric">
                        <strong>{item.metric}</strong>
                        <small>{item.metricLabel}</small>
                      </span>
                      <span className="case-row-full-go">
                        Дивитися кейс
                        <i>
                          <ArrowUpRight size={17} weight="bold" />
                        </i>
                      </span>
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="chapter c-ink case-stages-section">
        <div className="wrap">
          <Reveal className="case-stages-head">
            <div>
              <Meta>ЯК ЧИТАТИ КЕЙС</Meta>
              <h2 className="h-lg">Кожен розкладений на чотири частини.</h2>
            </div>
            <p>
              Ми не показуємо красиві дашборди. Показуємо, що було зламано, як
              це полагодили і скільки часу це тепер економить.
            </p>
          </Reveal>

          <div className="case-stages">
            <i className="case-stages-line" aria-hidden="true" />
            {stages.map(([num, title, copy], index) => (
              <Reveal className="case-stage" key={num} delay={index * 90}>
                <span className="case-stage-dot" aria-hidden="true" />
                <Meta className="num">{num}</Meta>
                <strong>{title}</strong>
                <p>{copy}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="page-actions">
            <button className="btn btn-accent" onClick={openContact}>
              Розібрати мій процес <ArrowUpRight size={16} weight="bold" />
            </button>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
