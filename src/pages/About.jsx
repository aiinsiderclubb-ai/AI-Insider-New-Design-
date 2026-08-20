import { ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { Clock, SplitText } from "../wow.jsx";
import { Meta, Reveal } from "../ui.jsx";
import { useContact } from "../layout.jsx";
import { method, proof, values } from "../data.js";

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
          <Reveal className="about-coordinate" delay={100}>
            <span>
              <Meta>КИЇВ</Meta>
              <strong>
                <Clock zone="Europe/Kyiv" />
              </strong>
            </span>
            <i>
              <b />
            </i>
            <span>
              <Meta>ЦЮРИХ</Meta>
              <strong>
                <Clock zone="Europe/Zurich" />
              </strong>
            </span>
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

      <section className="chapter c-paper-2 atlas-process">
        <div className="wrap">
          <Reveal>
            <Meta>06 / ЯК МИ ПРАЦЮЄМО</Meta>
          </Reveal>
          <div className="atlas-process-head">
            <h2 className="h-lg">Три кроки від розмови до робочої системи.</h2>
            <p>Менше презентацій. Більше перевірки на реальних даних.</p>
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

      <section className="chapter c-paper about-offices">
        <div className="wrap">
          <Reveal>
            <Meta>07 / ДЕ МИ</Meta>
          </Reveal>
          <div className="atlas-section-head">
            <h2 className="h-lg">Київ і Цюрих. Працюємо глобально.</h2>
          </div>
          <div className="office-lines">
            {[
              ["Київ", "Europe/Kyiv", "Розробка, дані, інтеграції"],
              ["Цюрих", "Europe/Zurich", "Стратегія, клієнти, партнерства"],
            ].map(([city, zone, role]) => (
              <Reveal className="office-line" key={city}>
                <Meta>{city.toUpperCase()}</Meta>
                <strong>
                  <Clock zone={zone} />
                </strong>
                <p>{role}</p>
                <button className="btn btn-outline" onClick={openContact}>
                  Написати нам <ArrowUpRight size={15} />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
