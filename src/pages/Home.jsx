import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check } from "@phosphor-icons/react";
import { Counter, Device, ModuleVisual, ReelStrip } from "../wow.jsx";
import { Faq, Meta, Reveal, SectionHead, prefersReduced } from "../ui.jsx";
import { useContact } from "../layout.jsx";
import {
  caseItems,
  hero,
  method,
  modules,
  studio,
  sweezyScreens,
  values,
} from "../data.js";

/* ========================================================== 01 — hero */

function Hero({ onContact }) {
  const trackRef = useRef(null);
  const stickRef = useRef(null);
  const videoRef = useRef(null);
  const countRef = useRef(null);
  const [stage, setStage] = useState(0);
  const [system, setSystem] = useState(false);
  const still = typeof window !== "undefined" && prefersReduced();
  const eager =
    typeof window === "undefined" ||
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  useEffect(() => {
    const track = trackRef.current;
    const stick = stickRef.current;
    if (!track || !stick) return undefined;

    const apply = () => {
      const rect = track.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      if (span <= 0) return;
      const p = Math.min(1, Math.max(0, -rect.top / span));

      // per-frame values go straight to CSS; React only hears about the
      // three stage changes and the moment the proof row appears
      stick.style.setProperty("--p", p.toFixed(4));
      const fill = Math.min(1, Math.max(0, (p - 0.08) / 0.8));
      stick.style.setProperty("--fill", `${(fill * 100).toFixed(2)}%`);
      if (countRef.current) {
        countRef.current.textContent = String(Math.round(p * 100)).padStart(
          3,
          "0",
        );
      }
      setStage(p < 0.34 ? 0 : p < 0.67 ? 1 : 2);
      setSystem(p > 0.72);

      if (still) return;
      const video = videoRef.current;
      if (!video || video.readyState < 1 || !video.duration) return;

      const time = p * (video.duration - 0.04);
      // remember the newest target: a seek already in flight swallows the
      // request, so it gets flushed again the moment the decoder reports back
      video.dataset.want = String(time);
      if (!video.seeking && Math.abs(video.currentTime - time) > 0.01) {
        video.currentTime = time;
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      const run = () => {
        ticking = false;
        apply();
      };
      if (typeof requestAnimationFrame === "function") {
        requestAnimationFrame(run);
        // rAF is throttled to nothing in hidden contexts — make sure the
        // position still lands even when no frame is ever served
        setTimeout(() => {
          if (ticking) run();
        }, 32);
      } else {
        run();
      }
    };

    const onSeeked = () => {
      const video = videoRef.current;
      if (!video) return;
      const want = Number.parseFloat(video.dataset.want || "");
      if (Number.isNaN(want)) return;
      if (Math.abs(video.currentTime - want) > 0.01) {
        video.currentTime = want;
      }
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const video = videoRef.current;
    video?.addEventListener("loadedmetadata", apply);
    video?.addEventListener("seeked", onSeeked);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      video?.removeEventListener("loadedmetadata", apply);
      video?.removeEventListener("seeked", onSeeked);
    };
  }, [still]);

  return (
    <section className="hero" id="top">
      <div className="hero-track" ref={trackRef}>
        <div
          className={`hero-stick${system ? " is-system" : ""}`}
          ref={stickRef}
        >
          {still ? (
            <img className="hero-media" src={hero.poster} alt="" />
          ) : (
            <video
              className="hero-media"
              ref={videoRef}
              src={hero.video}
              poster={hero.poster}
              muted
              playsInline
              preload={eager ? "auto" : "metadata"}
              tabIndex={-1}
            />
          )}
          <span className="hero-scrim" aria-hidden="true" />

          <div className="hero-layout">
            <div className="hero-copy">
              <Meta className="hero-eyebrow">
                <i aria-hidden="true" />
                {hero.eyebrow}
              </Meta>
              <h1 className="hero-title">
                {hero.lines.map((line) => (
                  <span key={line}>{line} </span>
                ))}
                <span className="hero-promise">{hero.promise}</span>
              </h1>
              <div className="hero-under">
                <p className="hero-lede">{hero.lede}</p>
                <div className="hero-actions">
                  <button className="btn btn-accent" onClick={onContact}>
                    Обговорити систему <ArrowUpRight size={16} weight="bold" />
                  </button>
                  <Link className="btn btn-outline" to="/cases">
                    Подивитися кейси
                  </Link>
                </div>
              </div>
            </div>

            <aside className="hero-route" aria-label="Від хаосу до системи">
              <div className="hero-count">
                <Meta>Маршрут</Meta>
                <Meta>
                  <b ref={countRef}>000</b> / 100
                </Meta>
              </div>
              <ol className="hero-rail">
                {hero.stages.map(([name, copy], index) => (
                  <li
                    className={index === stage ? "is-on" : undefined}
                    key={name}
                  >
                    <Meta>
                      0{index + 1} · {name}
                    </Meta>
                    <p>{copy}</p>
                  </li>
                ))}
              </ol>
            </aside>

            <nav className="hero-proof" aria-label="Результати кейсів">
              {hero.proof.map(([value, label, to]) => (
                <Link key={to} to={to} tabIndex={system ? undefined : -1}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </Link>
              ))}
              <Link
                className="hero-proof-all"
                to="/cases"
                tabIndex={system ? undefined : -1}
              >
                Усі кейси <ArrowUpRight size={15} weight="bold" />
              </Link>
            </nav>
          </div>

          <Meta className="hero-hint">
            <i aria-hidden="true" />
            Гортайте — офіс перетвориться на систему
          </Meta>
        </div>
      </div>
    </section>
  );
}

/* ===================================================== 05 — tab panel */

function Modules() {
  const [index, setIndex] = useState(0);
  const item = modules[index];
  const Icon = item.icon;

  return (
    <div className="mod" style={{ "--hue": item.hue }}>
      <div className="mod-tabs" role="tablist" aria-label="Напрями роботи">
        <span
          className="mod-thumb"
          aria-hidden="true"
          style={{ "--n": index, "--count": modules.length }}
        />
        {modules.map((module, i) => (
          <button
            key={module.id}
            role="tab"
            aria-selected={i === index}
            className={i === index ? "is-on" : ""}
            onClick={() => setIndex(i)}
          >
            {module.tab}
          </button>
        ))}
      </div>

      <div className="mod-panel" key={item.id}>
        <span className="mod-glow" aria-hidden="true" />

        <div className="mod-top">
          <span className="mod-kicker">
            <Icon size={15} weight="bold" />
            <Meta>{item.kicker}</Meta>
          </span>
          <Meta className="num">
            0{index + 1} / 0{modules.length}
          </Meta>
        </div>

        <div className="mod-grid">
          <div className="mod-copy">
            <h3 className="h-lg">{item.title}</h3>
            <p>{item.copy}</p>
            <div className="mod-chips">
              {item.flow.map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
            </div>
          </div>

          <div className="mod-stage">
            <span className="mod-stage-label meta">ЖИВИЙ ПРИКЛАД</span>
            <ModuleVisual kind={item.visual} />
          </div>
        </div>

        <div className="mod-metrics">
          {item.metrics.map(([value, label]) => (
            <div key={label}>
              <strong>
                <Counter value={value} />
              </strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ==================================================== 06 — ai studio */

function Studio({ onContact }) {
  const [index, setIndex] = useState(0);
  const [rotating, setRotating] = useState(false);
  const tabRefs = useRef([]);
  const rotationTimer = useRef(0);
  const item = studio[index];
  const reelHues = ["#4fe3ff", "#8b5cff", "#2b4bff", "#a9c8ff"];
  const activeHue = reelHues[index];

  useEffect(
    () => () => window.clearTimeout(rotationTimer.current),
    [],
  );

  const selectTab = (nextIndex, focus = true) => {
    const safeIndex = (nextIndex + studio.length) % studio.length;
    if (safeIndex === index || rotating) return;
    setIndex(safeIndex);
    setRotating(true);
    window.clearTimeout(rotationTimer.current);
    rotationTimer.current = window.setTimeout(() => setRotating(false), 680);
    if (focus) tabRefs.current[safeIndex]?.focus();
  };

  const onTabKeyDown = (event, tabIndex) => {
    if (event.key === "ArrowRight") selectTab(tabIndex + 1);
    else if (event.key === "ArrowLeft") selectTab(tabIndex - 1);
    else if (event.key === "Home") selectTab(0);
    else if (event.key === "End") selectTab(studio.length - 1);
    else return;
    event.preventDefault();
  };

  return (
    <div className="cin-studio" style={{ "--hue": activeHue }}>
      <div className="cin-intro">
        <Meta>03 / AI-КОНТЕНТ</Meta>
        <h2 className="cin-title">
          Контент, який більше не впирається в людей.
        </h2>
        <p>
          Окремий напрям: віртуальні персонажі, відео, UGC-реклама та креативи —
          без знімальної групи, дизайнерів і контентних заторів.
        </p>
      </div>

      <div className="cin-tabs" role="tablist" aria-label="Напрями AI-контенту">
        {studio.map((row, i) => {
          const Icon = row.icon;
          const on = i === index;
          return (
            <button
              ref={(node) => {
                tabRefs.current[i] = node;
              }}
              id={`studio-tab-${row.id}`}
              key={row.id}
              className={on ? "is-on" : ""}
              style={{ "--row-hue": reelHues[i] }}
              role="tab"
              aria-selected={on}
              aria-controls="studio-preview"
              tabIndex={on ? 0 : -1}
              onClick={() => selectTab(i, false)}
              onKeyDown={(event) => onTabKeyDown(event, i)}
            >
              <span className="cin-tab-icon">
                <Icon size={18} weight="bold" />
              </span>
              <span className="cin-tab-copy">
                <b>{row.title}</b>
                <small>
                  {row.metric} {row.metricLabel}
                </small>
              </span>
            </button>
          );
        })}
      </div>

      <div className="cin-actions">
        <div className="cin-buttons">
          <button className="btn btn-accent" onClick={onContact}>
            Обговорити контент <ArrowUpRight size={16} weight="bold" />
          </button>
          <Link className="btn btn-outline" to="/cases">
            Дивитися приклади <ArrowRight size={15} weight="bold" />
          </Link>
        </div>
        <div className="cin-ticks">
          {[
            ["10×", "більше контенту"],
            ["−80%", "вартість"],
            ["10+", "мов"],
          ].map(([value, label]) => (
            <span key={label}>
              <Check size={13} weight="bold" />
              <b>{value}</b>
              {label}
            </span>
          ))}
        </div>
      </div>

      <div
        className="cin-stage"
        id="studio-preview"
        role="tabpanel"
        aria-labelledby={`studio-tab-${item.id}`}
      >
        <span className="cin-ambient" aria-hidden="true" />
        <ReelStrip
          items={studio.map((reel, reelIndex) => ({
            ...reel,
            hue: reelHues[reelIndex],
          }))}
          active={index}
          onPick={(nextIndex) => selectTab(nextIndex, false)}
          locked={rotating}
        />

        <div className="cin-phone">
          <Device
            key={item.id}
            video={item.video}
            poster={item.poster}
            hue={activeHue}
            label={item.handle}
          >
            <div className="stu-screen-top">
              <span className="stu-live">
                <i />
                {item.screenKicker}
              </span>
            </div>
          </Device>
        </div>

        <div className="cin-proof" key={item.id}>
          <strong>{item.metric}</strong>
          <Meta>{item.metricLabel}</Meta>
          <p>{item.screenNote}</p>
          <i aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

/* =========================================================== the page */

export function Home() {
  const openContact = useContact();

  return (
    <main>
      <Hero onContact={openContact} />

      {/* 02 — what we build */}
      <section className="chapter c-paper" id="services">
        <div className="wrap">
          <SectionHead
            eyebrow="01 / ЩО МИ РОБИМО"
            title="Не набір інструментів. Робоча система."
            copy="Чотири напрями, які складаються в одну систему. Починаємо з того, де ручна робота коштує найдорожче."
          />
          <Reveal>
            <Modules />
          </Reveal>
        </div>
      </section>

      {/* 03 — cases */}
      <section className="chapter c-paper-2 cases-section" id="work">
        <div className="wrap cases-wrap">
          <div className="cases-head">
            <div>
              <Reveal>
                <Meta>02 / ВИБРАНІ РОБОТИ</Meta>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="cases-title">
                  Системи,
                  <br className="cases-title-break" /> які вже дають
                  <br className="cases-title-break" /> результат.
                </h2>
              </Reveal>
            </div>
            <Reveal className="cases-intro" delay={120}>
              <p>
                Виробництво, страхування, рітейл і медтех — там, де ціна помилки
                висока, а ручна робота дорога.
              </p>
            </Reveal>
          </div>

          <div className="cases-board">
            <Reveal className="case-featured" delay={80}>
              <Link className="case-panel" to={`/cases/${caseItems[0].slug}`}>
                <img
                  className="case-panel-img"
                  data-parallax="0.1"
                  src={caseItems[0].image}
                  alt="Автоматизована виробнича лінія для логістичного кейсу"
                />
                <span className="case-panel-shade" aria-hidden="true" />
                <div className="case-panel-content">
                  <Meta>{caseItems[0].kicker}</Meta>
                  <h3>{caseItems[0].title}</h3>
                  <span className="case-accent-line" aria-hidden="true" />
                  <div className="case-result">
                    <strong>{caseItems[0].metric}</strong>
                    <span>{caseItems[0].metricLabel}</span>
                  </div>
                  <span className="case-action">
                    Відкрити кейс <ArrowUpRight size={17} weight="bold" />
                  </span>
                </div>
              </Link>
            </Reveal>

            <div className="case-rail">
              {caseItems.slice(1).map((item, index) => (
                <Reveal
                  className="case-compact"
                  key={item.index}
                  delay={120 + index * 80}
                >
                  <Link className="case-panel" to={`/cases/${item.slug}`}>
                    <img
                      className={`case-panel-img${item.invert ? " is-inverted" : ""}`}
                      data-parallax="0.14"
                      src={item.image}
                      alt=""
                    />
                    <span className="case-panel-shade" aria-hidden="true" />
                    <div className="case-panel-content">
                      <Meta>{item.kicker}</Meta>
                      <h3>{item.title}</h3>
                      <span className="case-accent-line" aria-hidden="true" />
                      <div className="case-result">
                        <strong>{item.metric}</strong>
                        <span>{item.metricLabel}</span>
                      </div>
                      <span className="case-action">
                        Відкрити кейс <ArrowUpRight size={15} weight="bold" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 04 — ai content studio */}
      <section className="chapter c-ink stu-section" id="studio">
        <div className="wrap">
          <Studio onContact={openContact} />
        </div>
      </section>

      {/* 05 — sweezy product */}
      <section className="chapter c-tint sweezy-atlas" id="sweezy">
        <div className="atlas-coordinates" aria-hidden="true">
          <span className="atlas-longitudes">
            6°E&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;7°E&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8°E&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;9°E&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10°E
          </span>
          <span className="atlas-latitude">
            48°N
            <br />
            47°N
            <br />
            46°N
          </span>
          <span className="atlas-name">SWISS ROUTE ATLAS</span>
          <span className="atlas-place">BERN, SWITZERLAND</span>
          <span className="atlas-brand">AI INSIDER</span>
        </div>
        <div className="wrap atlas-grid">
          <div className="atlas-copy">
            <svg
              className="atlas-journey atlas-journey-desktop"
              viewBox="0 0 900 560"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M0 70V316Q0 340 24 340H650Q690 340 690 380V416Q690 442 716 442H890" />
              <circle cx="0" cy="70" r="9" />
              <circle cx="160" cy="340" r="9" />
              <circle cx="362" cy="340" r="9" />
              <circle cx="567" cy="340" r="9" />
            </svg>
            <svg
              className="atlas-journey atlas-journey-mobile"
              viewBox="0 0 350 620"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M0 52V318Q0 340 22 340H346" />
              <circle cx="0" cy="52" r="8" />
              <circle cx="76" cy="340" r="8" />
              <circle cx="185" cy="340" r="8" />
              <circle cx="294" cy="340" r="8" />
            </svg>
            <Reveal className="product-badge">
              <i>S</i>
              <b>Sweezy®</b>
              <Meta>ВЛАСНИЙ ПРОДУКТ</Meta>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="atlas-title">
                Ми не лише радимо.
                <br />
                Ми будуємо власні продукти.
              </h2>
              <p className="atlas-lede">
                Sweezy перетворює переїзд до Швейцарії на персональний маршрут.
              </p>
            </Reveal>
            <div className="atlas-stats">
              {[
                ["100+", "практичних гайдів"],
                ["26", "кантонів"],
                ["3", "мови"],
              ].map(([value, label], index) => (
                <Reveal key={label} delay={index * 80}>
                  <strong>{value}</strong>
                  <Meta>{label}</Meta>
                </Reveal>
              ))}
            </div>
            <Reveal className="product-actions atlas-actions" delay={160}>
              <a
                className="btn btn-dark"
                href="https://www.sweezy.world/uk"
                target="_blank"
                rel="noreferrer"
              >
                Відкрити Sweezy <ArrowUpRight size={16} weight="bold" />
              </a>
              <button className="btn btn-outline" onClick={openContact}>
                Хочу такий продукт
              </button>
            </Reveal>
          </div>
          <Reveal className="atlas-showcase" delay={120}>
            <div className="atlas-phones">
              {sweezyScreens.map((item, i) => (
                <div
                  className={`atlas-phone atlas-phone-${item.id}`}
                  key={item.id}
                  style={{ "--i": i }}
                >
                  <Device image={item.src} hue="#4fe3ff" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 06 — how we work */}
      <section className="chapter c-paper" id="method">
        <div className="wrap">
          <SectionHead
            eyebrow="04 / ЯК МИ ПРАЦЮЄМО"
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
          <ul className="pledges" aria-label="Наші гарантії">
            {values.map((item, index) => (
              <Reveal as="li" key={item.index} delay={index * 70}>
                <Meta>{item.label}</Meta>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 07 — faq */}
      <section className="chapter c-paper" id="faq">
        <div className="wrap faq-grid">
          <div>
            <Reveal>
              <Meta>05 / ПЕРЕД ПОЧАТКОМ</Meta>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="h-lg" style={{ marginTop: 14 }}>
                Корисні відповіді. Без дрібного шрифту.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <Link className="faq-more" to="/solutions">
                Рішення за процесами <ArrowRight size={16} weight="bold" />
              </Link>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <Faq />
          </Reveal>
        </div>
      </section>

      {/* 08 — closing step */}
      <section className="cta-outer" id="contact">
        <div className="wrap" style={{ padding: 0 }}>
          <div className="cta-panel">
            <Meta>ГОТОВІ ПОЧАТИ</Meta>
            <h2 className="h-xl">
              Розкажіть про процес. Ми покажемо, як його автоматизувати.
            </h2>
            <p className="lede">
              Навіть якщо поки є лише ідея — за 30 хвилин розберемо задачу й
              назвемо найсильніший перший крок.
            </p>
            <div className="cta-actions">
              <button className="btn btn-accent" onClick={openContact}>
                Забронювати розмову <ArrowUpRight size={16} weight="bold" />
              </button>
              <button className="btn btn-outline" onClick={openContact}>
                Надіслати бриф
              </button>
            </div>
            <Meta className="cta-note">
              КИЇВ · ЦЮРИХ · ВІДПОВІДАЄМО ЗА 1 РОБОЧИЙ ДЕНЬ
            </Meta>

            <div className="cta-inner">
              <div className="cta-inner-head">
                <Meta>ОБЕРІТЬ ФОРМАТ ПЕРШОГО КРОКУ</Meta>
                <Meta className="num">03 ВАРІАНТИ</Meta>
              </div>
              <div className="cta-cards">
                {[
                  {
                    index: "01",
                    when: "30 хвилин",
                    title: "Стратегічна розмова",
                    copy: "Задача, контекст і найсильніший перший крок.",
                    featured: true,
                  },
                  {
                    index: "02",
                    when: "без дзвінка",
                    title: "Надіслати бриф",
                    copy: "Опишіть виклик — повернемося з першими ідеями.",
                  },
                  {
                    index: "03",
                    when: "2–3 тижні",
                    title: "AI Sprint",
                    copy: "Прототип на ваших даних із розрахунком ефекту.",
                  },
                ].map((card) => (
                  <button
                    className={`route${card.featured ? " is-featured" : ""}`}
                    key={card.title}
                    onClick={openContact}
                  >
                    <span className="route-sheen" aria-hidden="true" />
                    <span className="route-top">
                      <span className="route-index">{card.index}</span>
                      <span className="route-when">{card.when}</span>
                    </span>
                    <span className="route-body">
                      <strong>{card.title}</strong>
                      <span className="route-copy">{card.copy}</span>
                    </span>
                    <span className="route-foot">
                      <span className="route-cta">Обрати</span>
                      <span className="route-go">
                        <ArrowUpRight size={17} weight="bold" />
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
