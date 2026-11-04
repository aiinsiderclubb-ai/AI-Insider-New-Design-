import { ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { SplitText } from "../wow.jsx";
import { CityLink } from "../city-link.jsx";
import { Meta, Reveal } from "../ui.jsx";
import { useContact } from "../layout.jsx";
import { proof, teamDisciplines, values } from "../data.js";
import { ClosingStep } from "../closing.jsx";

export function About() {
  const openContact = useContact();

  return (
    <main className="atlas-page atlas-about">
      <section className="chapter c-paper atlas-hero about-atlas-hero">
        <div className="wrap atlas-hero-grid">
          <div className="atlas-hero-copy">
            <Reveal>
              <Meta>04 / ПРО НАС</Meta>
            </Reveal>
            <h1 className="h-xl has-split" data-reveal>
              <SplitText text="Ми не додаємо AI заради ефекту." />
            </h1>
            <Reveal delay={120}>
              <p className="lede">
                Перебудовуємо те, що має працювати краще, і залишаємо систему,
                якою команда користується щодня.
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
          <Reveal className="about-cities" delay={100}>
            <CityLink />
          </Reveal>
        </div>
      </section>

      <section className="c-paper atlas-board-section">
        <div className="wrap">
          <div className="about-media-board">
            <img
              src="/assets/editorial-about.webp"
              alt="Робочий простір між Києвом і Цюрихом"
            />
            <span className="about-media-shade" />
            <div className="about-media-copy">
              <Meta>КИЇВ × ЦЮРИХ</Meta>
              <h2 className="h-md">
                Українська швидкість. Швейцарська вимогливість до деталей.
              </h2>
              <p>
                Працюємо глобально, але будуємо кожну систему близько до
                реального процесу команди.
              </p>
            </div>
            <div className="about-proof-rail">
              {proof.map(([value, label]) => (
                <span key={label}>
                  <strong>{value}</strong>
                  <small>{label}</small>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="chapter c-paper about-principles">
        <div className="wrap">
          <Reveal>
            <Meta>05 / ПРИНЦИПИ</Meta>
          </Reveal>
          <div className="atlas-section-head">
            <h2 className="h-lg">
              Чотири правила, за якими ми беремося за роботу.
            </h2>
          </div>
          <div className="principle-lines">
            {values.map((item) => (
              <Reveal className="principle-line" key={item.index} as="article">
                <span className="num">{item.index}</span>
                <Meta>{item.label}</Meta>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <i />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="chapter c-ink-2 about-team">
        <div className="wrap">
          <div className="about-team-head">
            <div>
              <Reveal>
                <Meta>06 / КОМАНДА</Meta>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="h-lg">Чотири напрями. Одна команда на проєкт.</h2>
              </Reveal>
            </div>
            <Reveal delay={120}>
              <Link className="btn btn-accent" to="/team">
                Познайомитися з командою <ArrowUpRight size={16} weight="bold" />
              </Link>
            </Reveal>
          </div>
          <ol className="about-team-list">
            {teamDisciplines.map((item, index) => (
              <Reveal as="li" key={item.id} delay={index * 70}>
                <span className="num">0{index + 1}</span>
                <strong>{item.title}</strong>
                <Meta>{item.city}</Meta>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <ClosingStep />
    </main>
  );
}
