import { ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { SplitText } from "../wow.jsx";
import { Meta, Reveal } from "../ui.jsx";
import { useContact } from "../layout.jsx";
import { projectTeam, teamDisciplines, teamMembers } from "../data.js";
import { ClosingStep } from "../closing.jsx";
import { CityLink } from "../city-link.jsx";

export function Team() {
  const openContact = useContact();

  return (
    <main className="atlas-page team-page">
      <section className="chapter c-paper team-hero">
        <div className="wrap team-hero-grid">
          <div>
            <Reveal>
              <Meta>КОМАНДА</Meta>
            </Reveal>
            <h1 className="h-xl has-split" data-reveal>
              <SplitText text="Люди, які будують системи, а не презентації." />
            </h1>
            <Reveal delay={120}>
              <p className="lede">
                Стратегія в Цюриху, інженерія й дані в Києві. На кожен проєкт
                збираємо невелику команду, яка веде процес від першої розмови
                до підтримки після запуску.
              </p>
              <div className="page-actions">
                <button className="btn btn-accent" onClick={openContact}>
                  Познайомитися <ArrowUpRight size={16} weight="bold" />
                </button>
                <Link className="btn btn-outline" to="/cases">
                  Що ми зробили
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal className="about-cities" delay={100}>
            <CityLink />
          </Reveal>
        </div>
      </section>

      <section className="chapter c-paper-2 team-disciplines">
        <div className="wrap">
          <div className="team-section-head">
            <Reveal>
              <Meta>01 / НАПРЯМИ</Meta>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="h-lg">Чотири напрями, які працюють як одна команда.</h2>
            </Reveal>
          </div>
          <div className="discipline-list">
            {teamDisciplines.map((item, index) => (
              <Reveal as="article" className="discipline" key={item.id}>
                <span className="discipline-num">0{index + 1}</span>
                <div className="discipline-main">
                  <Meta>{item.city}</Meta>
                  <h3>{item.title}</h3>
                </div>
                <p>{item.copy}</p>
                <ul className="discipline-tools">
                  {item.tools.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {teamMembers.length > 0 && (
        <section className="chapter c-paper team-people">
          <div className="wrap">
            <div className="team-section-head">
              <Meta>02 / ЛЮДИ</Meta>
              <h2 className="h-lg">Хто відповідає за вашу систему.</h2>
            </div>
            <div className="people-grid">
              {teamMembers.map((person) => (
                <Reveal as="article" className="person" key={person.name}>
                  <span className="person-photo">
                    <img src={person.photo} alt={person.name} loading="lazy" />
                  </span>
                  <Meta>{person.city}</Meta>
                  <h3>{person.name}</h3>
                  <p>{person.role}</p>
                  {person.linkedin && (
                    <a href={person.linkedin} target="_blank" rel="noopener noreferrer">
                      LinkedIn <ArrowUpRight size={14} weight="bold" />
                    </a>
                  )}
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="chapter c-ink-2 team-project">
        <div className="wrap team-project-grid">
          <div>
            <Reveal>
              <Meta>{teamMembers.length > 0 ? "03" : "02"} / КОМАНДА ПРОЄКТУ</Meta>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="h-lg">Чотири ролі на кожному проєкті.</h2>
              <p>
                Одна з них — на вашому боці. Без власника процесу в компанії
                навіть найкраща автоматизація зупиняється на першому збої.
              </p>
            </Reveal>
          </div>
          <ol className="project-roles">
            {projectTeam.map(([role, copy], index) => (
              <Reveal
                as="li"
                key={role}
                delay={index * 80}
                className={index === projectTeam.length - 1 ? "is-client" : ""}
              >
                <span className="project-role-dot" aria-hidden="true" />
                <Meta>0{index + 1}</Meta>
                <strong>{role}</strong>
                <p>{copy}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <ClosingStep
        title="Познайомимося на вашому процесі."
        lede="30 хвилин з людьми, які потім будуватимуть систему: розберемо задачу й назвемо найсильніший перший крок."
      />
    </main>
  );
}
