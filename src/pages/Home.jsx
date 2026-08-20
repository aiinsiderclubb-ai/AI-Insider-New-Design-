import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Lightning,
  Star,
} from "@phosphor-icons/react";
import {
  AgentTerminal,
  Counter,
  Device,
  ModuleVisual,
  NeuralGraph,
  Scramble,
  SplitText,
  Strip,
} from "../wow.jsx";
import { Faq, Meta, Reveal, SectionHead, prefersReduced } from "../ui.jsx";
import { useContact } from "../layout.jsx";
import {
  answers,
  caseItems,
  hero,
  method,
  modules,
  proof,
  stories,
  stripItems,
  studio,
  sweezyScreens,
  values,
} from "../data.js";

/* ======================================================= 01 — journey */

function Journey({ onContact }) {
  const trackRef = useRef(null);
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const still = typeof window !== "undefined" && prefersReduced();
  const eager =
    typeof window === "undefined" ||
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const apply = () => {
      const rect = track.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      if (span <= 0) return;
      const p = Math.min(1, Math.max(0, -rect.top / span));
      setProgress(p);

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
    <section className="journey" id="top">
      <div className="journey-track" ref={trackRef}>
        <div className="journey-stick">
          <div className="stage is-on">
            {still ? (
              <img className="stage-media" src={hero.poster} alt="" />
            ) : (
              <video
                className="stage-media"
                ref={videoRef}
                src={hero.video}
                poster={hero.poster}
                muted
                playsInline
                preload={eager ? "auto" : "metadata"}
                tabIndex={-1}
              />
            )}
            <span className="stage-scrim" />
            <span className="stage-vignette" aria-hidden="true" />
          </div>

          <div className="journey-bar">
            <Meta>AI INSIDER</Meta>
            <div className="journey-scale">
              <Meta>ХАОС</Meta>
              <span className="rail" style={{ "--fill": progress }}>
                <i />
              </span>
              <Meta>СИСТЕМА</Meta>
            </div>
            <Meta className="num">
              {String(Math.round(progress * 100)).padStart(3, "0")} / 100
            </Meta>
          </div>

          <div className="journey-copy">
            <div className="inner">
              <div className="journey-slide">
                <span className="journey-rule" aria-hidden="true" />
                <Meta>{hero.eyebrow}</Meta>
                <h1 className="h-xl journey-title has-split is-in">
                  <SplitText text={hero.title} from={260} />{" "}
                  <span className="hl hl-wipe">{hero.accent}</span>
                </h1>
                <p className="lede">{hero.lede}</p>
                <div className="journey-actions">
                  <button className="btn btn-accent" onClick={onContact}>
                    Обговорити систему <ArrowUpRight size={16} weight="bold" />
                  </button>
                  <Link className="btn btn-outline" to="/services">
                    Що ми закриваємо
                  </Link>
                </div>
                <Meta className="journey-note">{hero.note}</Meta>
              </div>
            </div>
          </div>

          <span
            className="journey-scroll"
            style={{ opacity: progress > 0.04 ? 0 : 1 }}
          >
            <i />
            <Meta>ГОРТАЙТЕ, ЩОБ ЗАПУСТИТИ</Meta>
          </span>
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
  const item = studio[index];

  return (
    <div className="stu" style={{ "--hue": item.hue }}>
      <div className="stu-grid">
        <div className="stu-left">
          <ul className="stu-list">
            {studio.map((row, i) => {
              const Icon = row.icon;
              const on = i === index;
              return (
                <li key={row.id}>
                  <button
                    className={on ? "is-on" : ""}
                    style={{ "--row-hue": row.hue }}
                    onClick={() => setIndex(i)}
                    aria-pressed={on}
                  >
                    <span className="stu-num meta">0{i + 1}</span>
                    <span className="stu-ico">
                      <Icon size={17} weight="bold" />
                    </span>
                    <span className="stu-name">
                      <b>{row.title}</b>
                      <small>{row.sub}</small>
                    </span>
                    <span className="stu-metric">
                      <strong>{row.metric}</strong>
                      <small>{row.metricLabel}</small>
                    </span>
                    <ArrowRight size={15} weight="bold" />
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="stu-actions">
            <button className="btn btn-accent" onClick={onContact}>
              Обговорити контент <ArrowUpRight size={16} weight="bold" />
            </button>
            <Link className="btn btn-outline" to="/cases">
              Дивитися приклади
            </Link>
          </div>

          <div className="stu-ticks">
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

        <div className="stu-stage">
          <span className="stu-bloom" aria-hidden="true" data-parallax="0.3" />

          <Device
            key={item.id}
            video={item.video}
            poster={item.poster}
            hue={item.hue}
            label={item.handle}
          >
            <div className="stu-screen-top">
              <span className="stu-live">
                <i />
                {item.screenKicker}
              </span>
            </div>
          </Device>

          <div className="float float-stats" key={`s-${item.id}`}>
            <Meta>ПОКАЗНИКИ</Meta>
            {item.stats.map(([label, value]) => (
              <span key={label}>
                {label}
                <b>{value}</b>
              </span>
            ))}
          </div>

          <div className="float float-note" key={`n-${item.id}`}>
            <span className="float-dot" aria-hidden="true" />
            <b>{item.title}</b>
            <p>{item.screenNote}</p>
          </div>
        </div>
      </div>

      <button className="feature" onClick={onContact}>
        <span className="feature-glow" aria-hidden="true" />
        <span className="feature-mark">
          <Lightning size={22} weight="fill" />
        </span>
        <span className="feature-main">
          <span className="feature-line">
            <b>Content Factory</b>
            <em>НОВЕ</em>
          </span>
          <span className="feature-copy">
            Система сама шукає ідеї, створює контент і публікує у соцмережі. Ви
            лише погоджуєте в Telegram.
          </span>
        </span>
        <span className="feature-figs">
          <span>
            <strong>500+</strong>
            <Meta>ДОПИСІВ/МІС</Meta>
          </span>
          <span>
            <strong>1</strong>
            <Meta>КНОПКА СХВАЛЕННЯ</Meta>
          </span>
        </span>
        <span className="feature-go" aria-hidden="true">
          <ArrowUpRight size={20} weight="bold" />
        </span>
      </button>
    </div>
  );
}

/* ======================================================= 08 — stories */

function Stories() {
  const [index, setIndex] = useState(0);
  const item = stories[index];
  const move = (delta) =>
    setIndex((prev) => (prev + delta + stories.length) % stories.length);

  return (
    <>
      <div className="story-lead" data-reveal>
        <div className="story-top">
          <span className="rating-stars" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} size={11} weight="fill" color="#4fe3ff" />
            ))}
          </span>
          <Meta className="num">ВІДГУК / 0{index + 1}</Meta>
        </div>
        <blockquote className="story-quote">{item.quote}</blockquote>
        <span className="story-glyph" aria-hidden="true">
          &rdquo;
        </span>
        <div className="story-foot">
          <span className="avatar">{item.initials}</span>
          <span>
            <b>{item.name}</b>
            <Meta>{item.role}</Meta>
          </span>
          <div className="story-nav">
            <button onClick={() => move(-1)} aria-label="Попередній відгук">
              <ArrowLeft size={15} weight="bold" />
            </button>
            <button onClick={() => move(1)} aria-label="Наступний відгук">
              <ArrowRight size={15} weight="bold" />
            </button>
          </div>
        </div>
      </div>

      <div className="story-mini">
        {stories
          .filter((_, i) => i !== index)
          .slice(0, 2)
          .map((story) => (
            <article key={story.name} data-reveal>
              <p>{story.quote}</p>
              <div className="story-foot">
                <span className="avatar">{story.initials}</span>
                <span>
                  <b>{story.name}</b>
                  <Meta>{story.role}</Meta>
                </span>
              </div>
            </article>
          ))}
      </div>
    </>
  );
}

/* =========================================================== the page */

export function Home() {
  const openContact = useContact();

  return (
    <main>
      <Journey onContact={openContact} />

      {/* 02 — proof */}
      <section className="chapter c-paper proof">
        <div className="wrap">
          <div className="proof-grid">
            {proof.map(([value, label], index) => (
              <Reveal className="proof-cell" key={label} delay={index * 70}>
                <strong>
                  <Counter value={value} />
                </strong>
                <span>{label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — answers */}
      <Strip items={stripItems} />

      {/* 03 — bento */}
      <section className="chapter c-ink" id="services">
        <div className="wrap">
          <SectionHead
            eyebrow="01 / ЩО МИ ЗАКРИВАЄМО"
            title="Від питання до системи, яка його вирішує."
            copy="Чотири зони, де AI дає найшвидший вимірюваний ефект. Починаємо з тієї, де ціна ручної роботи найвища."
          />
          <div className="bento">
            <Reveal className="tile tile-w4 tile-tall tile-canvas" as="article">
              <NeuralGraph />
              <div className="tile-over">
                <div className="tile-head">
                  <Meta>ЖИВА СИСТЕМА · НАВЕДІТЬ КУРСОР</Meta>
                  <Meta className="num">01</Meta>
                </div>
                <div className="tile-body">
                  <h3 className="h-md">
                    <Scramble text="Знання компанії" />
                  </h3>
                  <p>
                    Одна база правди замість десяти папок і трьох чатів. Кожен
                    вузол — джерело, кожен зв’язок — відповідь.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal
              className="tile tile-w2 tile-tall t-accent"
              as="article"
              delay={80}
            >
              <div className="tile-head">
                <Meta>ПІДТРИМКА · 24/7</Meta>
                <ArrowUpRight size={18} weight="bold" />
              </div>
              <div className="tile-metric" style={{ marginTop: "auto" }}>
                <strong>
                  <Counter value="68" />%
                </strong>
                <div className="pulse-row">
                  <span className="pulse" />
                  <Meta>ЗВЕРНЕНЬ БЕЗ ОПЕРАТОРА</Meta>
                </div>
                <div className="bars">
                  {[0.5, 0.7, 0.45, 0.85, 0.6, 1, 0.75, 0.9].map((v, i) => (
                    <i
                      key={i}
                      style={{
                        height: `${v * 100}%`,
                        animationDelay: `${i * 0.14}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal className="tile tile-w2" as="article" delay={40}>
              <img
                className="tile-art"
                src="/assets/capability-orb.png"
                alt=""
                data-parallax="0.22"
              />
              <div className="tile-head">
                <Meta className="num">02</Meta>
                <ArrowUpRight size={18} weight="bold" />
              </div>
              <div className="tile-body">
                <h3 className="h-md">Підтримка й продажі</h3>
                <p>
                  Агент відповідає, кваліфікує та передає людині лише складне.
                </p>
              </div>
            </Reveal>

            <Reveal className="tile tile-w2 t-violet" as="article" delay={120}>
              <div className="tile-head">
                <Meta className="num">03</Meta>
                <ArrowUpRight size={18} weight="bold" />
              </div>
              <div className="tile-body">
                <h3 className="h-md">Операційна рутина</h3>
                <p>
                  Документи, узгодження й переноси даних працюють без людини.
                </p>
              </div>
            </Reveal>

            <Reveal className="tile tile-w2 t-paper" as="article" delay={160}>
              <div className="tile-head">
                <Meta className="num">04</Meta>
                <ArrowUpRight size={18} weight="bold" />
              </div>
              <div className="tile-body">
                <h3 className="h-md">Рішення на даних</h3>
                <p>Прогнози й пріоритети замість інтуїції на нараді.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 03b — live agent terminal */}
      <section className="chapter c-ink-2">
        <div className="wrap term-wrap">
          <div>
            <Reveal>
              <Meta>02 / ЯК ЦЕ ВИГЛЯДАЄ НАСПРАВДІ</Meta>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="h-lg" style={{ margin: "14px 0 18px" }}>
                Ви описуєте процес. Система відповідає планом.
              </h2>
              <p>
                Не чат-бот із привітанням. Агент читає ваш процес, знаходить
                вузьке місце й одразу рахує ефект від його усунення — так само,
                як це відбувається на першій діагностиці.
              </p>
            </Reveal>
            <Reveal delay={160} className="journey-actions">
              <button className="btn btn-accent" onClick={openContact}>
                Запустити на своєму процесі{" "}
                <ArrowUpRight size={16} weight="bold" />
              </button>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <AgentTerminal />
          </Reveal>
        </div>
      </section>

      {/* 04 — cases */}
      <section className="chapter c-paper-2 cases-section" id="work">
        <div className="wrap cases-wrap">
          <div className="cases-head">
            <div>
              <Reveal>
                <Meta>03 / ВИБРАНІ РОБОТИ</Meta>
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

      {/* 05 — modules */}
      {/* 05b — ai content studio */}
      <section className="chapter c-ink stu-section" id="studio">
        <div className="wrap">
          <SectionHead
            eyebrow="04 / AI-КОНТЕНТ"
            title="Контент, який більше не впирається в людей."
            copy="Окремий напрям: віртуальні персонажі, відео, UGC-реклама та креативи — без знімальної групи, дизайнерів і контентних заторів."
          />
          <Studio onContact={openContact} />
        </div>
      </section>

      <section className="chapter c-paper">
        <div className="wrap">
          <SectionHead
            eyebrow="05 / ОДНА СИСТЕМА, ЧОТИРИ ЧАСТИНИ"
            title="Не набір інструментів. Робоча система."
            copy="Ми не додаємо AI заради ефекту — перебудовуємо те, що має працювати краще, і залишаємо систему, якою користуються щодня."
          />
          <Reveal>
            <Modules />
          </Reveal>
        </div>
      </section>

      {/* 06 — values */}
      <section className="chapter c-ink-2">
        <div className="wrap">
          <SectionHead
            eyebrow="06 / ЧОМУ З НАМИ"
            title="Менше пошуку. Більше завершених задач."
          />
          <div className="value-grid">
            {values.map((item, index) => (
              <Reveal
                className={`value ${item.tone}`}
                key={item.index}
                as="article"
                delay={index * 80}
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

      {/* 07 — method */}
      <section className="chapter c-paper" id="method">
        <div className="wrap">
          <SectionHead
            eyebrow="07 / СТАРТ ЗА ДНІ"
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

      {/* 08 — stories */}
      <section className="chapter c-ink-2">
        <div className="wrap">
          <SectionHead
            eyebrow="08 / ГОЛОСИ КЛІЄНТІВ"
            title="Що змінюється після запуску."
          />
          <Reveal className="rating">
            <span className="stars">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={13} weight="fill" />
              ))}
            </span>
            <b>4.9 / 5</b>
            <span>за 100+ запущеними системами</span>
          </Reveal>
          <Stories />
        </div>
      </section>

      {/* 09 — sweezy product */}
      <section className="chapter c-tint" id="sweezy">
        <div className="wrap product-grid">
          <div>
            <Reveal className="product-badge">
              <i>S</i>
              <b>Sweezy®</b>
              <Meta>ВЛАСНИЙ ПРОДУКТ</Meta>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="h-lg">
                Ми не лише радимо. Ми будуємо власні продукти.
              </h2>
              <p className="lede">
                Sweezy — застосунок, що перетворює переїзд до Швейцарії на
                зрозумілий персональний маршрут: дозволи, документи, робота та
                місцеві сервіси. Спроєктований і запущений командою AI Insider.
              </p>
            </Reveal>
            <div className="product-stats">
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
            <Reveal className="product-actions" delay={160}>
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
          <Reveal className="sw-showcase" delay={120}>
            <div className="sw-fan">
              <span className="sw-bloom" aria-hidden="true" />
              {sweezyScreens.map((item, i) => (
                <div className="sw-card" key={item.id} style={{ "--i": i }}>
                  <Device image={item.src} hue="#c8ff3d" />
                  <span className="sw-tag">{item.tab}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 10 — faq */}
      <section className="chapter c-paper" id="faq">
        <div className="wrap faq-grid">
          <div>
            <Reveal>
              <Meta>09 / ПЕРЕД ПОЧАТКОМ</Meta>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="h-lg" style={{ marginTop: 14 }}>
                Корисні відповіді. Без дрібного шрифту.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <Faq />
          </Reveal>
        </div>
      </section>

      {/* 11 — cta */}
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
              <button className="btn btn-dark" onClick={openContact}>
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
