import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { SplitText } from "../wow.jsx";
import { Meta, Reveal } from "../ui.jsx";
import { caseItems, caseShowcase } from "../data.js";
import { ClosingStep } from "../closing.jsx";
import { CaseScene } from "../case-scene.jsx";

/* Що саме ламалося до запуску — одним рядком, людською мовою. */
const problem = {
  "operatsiina-systema-kreatyvnoi-ahentsii":
    "Задачі жили в чатах, дублювалися і губилися між менеджерами.",
  "ai-rekruter-dlia-ahentsii":
    "Рекрутер вручну вів листування з десятками кандидатів одночасно.",
  "content-factory-ai-video":
    "Кожен ролик вимагав зйомки, монтажу і тижня очікування.",
};

// published figures from the three case pages
const heroFacts = [
  ["539", "задач під контролем"],
  ["0", "втрат при передачі"],
  ["12+", "проєктів веде AI-рекрутер"],
  ["500+", "AI-відео на місяць"],
];

const stages = [
  ["01", "Що ламалося", "З чого почалося і скільки це коштувало щомісяця."],
  ["02", "Що побудували", "Які системи з’єднали і хто чим тепер користується."],
  ["03", "Де було складно", "Місце, через яке проєкт міг не поїхати."],
  ["04", "Що вийшло", "Цифри після запуску, а не обіцянки до нього."],
];

/* One case per chapter: copy on one side, its real media on the other. */
function CaseFile({ item, index }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const media = caseShowcase[item.slug];

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`chapter casefile${index % 2 ? " is-flip" : ""}`}
      id={item.slug}
      ref={ref}
    >
      <div className="wrap casefile-grid">
        <div className="casefile-copy">
          <span className="casefile-num" aria-hidden="true">
            0{index + 1}
          </span>
          <Meta>{item.kicker}</Meta>
          <h2 className="h-lg">{item.title}</h2>

          <div className="casefile-problem">
            <Meta>ЩО ЛАМАЛОСЯ</Meta>
            <p>{problem[item.slug]}</p>
          </div>

          <div className="casefile-built">
            <Meta>ЩО ПОБУДУВАЛИ</Meta>
            <ul>
              {media.built.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>

          <div className="casefile-foot">
            <span className="casefile-metric">
              <strong>{item.metric}</strong>
              <small>{item.metricLabel}</small>
            </span>
            <Link className="btn btn-dark" to={`/cases/${item.slug}`}>
              Читати кейс <ArrowUpRight size={16} weight="bold" />
            </Link>
          </div>
        </div>

        <Link
          className="casefile-stage"
          to={`/cases/${item.slug}`}
          aria-label={`Відкрити кейс: ${item.title}`}
        >
          <CaseScene
            item={item}
            index={index}
            total={caseItems.length}
            playing={inView}
          />
        </Link>
      </div>
    </section>
  );
}

export function Cases() {
  return (
    <main className="atlas-page atlas-cases">
      <section className="chapter c-paper casefile-hero">
        <div className="wrap casefile-hero-grid">
          <div className="casefile-hero-copy">
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

          <Reveal delay={100}>
            <nav className="casefile-index" aria-label="Кейси на сторінці">
              {caseItems.map((item, index) => (
                <a href={`#${item.slug}`} key={item.slug}>
                  <span className="casefile-index-num">0{index + 1}</span>
                  <span className="casefile-index-copy">
                    <Meta>{item.kicker}</Meta>
                    <strong>{item.title}</strong>
                  </span>
                  <span className="casefile-index-metric">{item.metric}</span>
                </a>
              ))}
            </nav>
          </Reveal>
        </div>

        <div className="wrap">
          <Reveal className="casefile-strip" delay={160}>
            {heroFacts.map(([value, label]) => (
              <span key={label}>
                <strong>{value}</strong>
                <Meta>{label}</Meta>
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {caseItems.map((item, index) => (
        <CaseFile item={item} index={index} key={item.slug} />
      ))}

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
        </div>
      </section>
      <ClosingStep
        title="Ваш процес може стати наступним кейсом."
        lede="Розкажіть, де зараз губиться час. За 30 хвилин покажемо, що автоматизувати першим і який ефект це дасть."
      />
    </main>
  );
}
