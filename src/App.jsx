import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Brain,
  ChatCircleDots,
  Check,
  CirclesThreePlus,
  InstagramLogo,
  LinkedinLogo,
  List,
  PaperPlaneTilt,
  ImageSquare,
  Lightning,
  Star,
  Target,
  UsersThree,
  VideoCamera,
  Sparkle,
  X,
} from "@phosphor-icons/react";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource-variable/unbounded";
import {
  AgentTerminal,
  Clock,
  Counter,
  Device,
  Cursor,
  Grain,
  NeuralGraph,
  ModuleVisual,
  Scramble,
  SplitText,
  Strip,
  useParallax,
  useSpotlight,
} from "./wow.jsx";

/* ================================================================ data */

/* Кінематографічний проїзд «хаос → система».
   Чотири кліпи склеєні кадр-у-кадр: останній кадр кліпу N дорівнює
   першому кадру кліпу N+1, тому кожен грає один раз і завмирає на
   останньому кадрі — перехід між стадіями непомітний. */
/* Один суцільний проїзд «хаос → система»: чотири кадри склеєні в
   один файл, тому сцен більше немає — є єдиний рух, який веде скрол. */
const hero = {
  video: "/assets/journey/hero.mp4",
  poster: "/assets/journey/hero.jpg",
  eyebrow: "AI-СИСТЕМИ ДЛЯ БІЗНЕСУ · КИЇВ × ЦЮРИХ",
  title: "Ваш бізнес уже готовий до AI.",
  accent: "Побудуємо систему.",
  lede: "Стратегія, AI-агенти, автоматизація та власні інтелектуальні системи — спроєктовані під вимірюваний результат, а не під демо на нараді.",
  note: "ПЕРША РОЗМОВА — 30 ХВИЛИН, БЕЗ ЗОБОВ’ЯЗАНЬ",
};

const proof = [
  ["100+", "запущених систем"],
  ["96%", "клієнтів залишаються"],
  ["4.9", "середня оцінка"],
  ["40+", "індустрій"],
];

const stripItems = [
  "AI-АГЕНТИ",
  "АВТОМАТИЗАЦІЯ",
  "RAG І БАЗИ ЗНАНЬ",
  "ГОЛОСОВІ АСИСТЕНТИ",
  "ПРОГНОЗУВАННЯ",
  "ІНТЕГРАЦІЇ",
  "AI-СТРАТЕГІЯ",
  "COPILOT-РІШЕННЯ",
];

const answers = [
  {
    index: "01",
    title: "Підтримка й продажі",
    copy: "Агент відповідає, кваліфікує та передає людині лише складне.",
    art: "/assets/capability-orb.png",
  },
  {
    index: "02",
    title: "Операційна рутина",
    copy: "Документи, узгодження й переноси даних працюють без людини.",
    tone: "is-accent",
    art: "/assets/capability-system.png",
  },
  {
    index: "03",
    title: "Знання компанії",
    copy: "Одна база правди замість десяти папок і трьох чатів.",
    art: "/assets/hero-glass.png",
  },
  {
    index: "04",
    title: "Рішення на даних",
    copy: "Прогнози й пріоритети замість інтуїції на нараді.",
    art: "/assets/delivery-wave-crop.png",
  },
];

const caseItems = [
  {
    index: "01",
    kicker: "ЛОГІСТИКА · ЦЮРИХ",
    title: "AI-підтримка, що тримає якість на піку",
    metric: "62%",
    metricLabel: "звернень закриває AI",
    image: "/assets/case-industrial.png",
  },
  {
    index: "02",
    kicker: "INSURTECH · БЕРН",
    title: "Андеррайтинг за хвилини замість днів",
    metric: "3.1×",
    metricLabel: "швидша оцінка заявки",
    image: "/assets/hero-glass.png",
    invert: true,
  },
  {
    index: "03",
    kicker: "РІТЕЙЛ · КИЇВ",
    title: "Менше ручної роботи, більше точних рішень",
    metric: "41%",
    metricLabel: "нижча вартість операції",
    image: "/assets/case-retail.jpg",
  },
];

const modules = [
  {
    id: "agents",
    hue: "#4fe3ff",
    visual: "chat",
    tab: "AI-агенти",
    icon: ChatCircleDots,
    kicker: "AI-АГЕНТИ",
    title: "Розмовляють, допомагають і виконують дії",
    copy: "Мультимовні голосові та чат-агенти для підтримки, продажів і внутрішніх команд. Пам’ятають контекст і передають людині лише те, що справді потребує людини.",
    metrics: [
      ["68%", "звернень без оператора"],
      ["−42 с", "до першої відповіді"],
      ["24/7", "робота без змін"],
    ],
    flow: ["Голос і чат", "Пам’ять контексту", "Передача оператору", "CRM"],
  },
  {
    id: "automation",
    hue: "#8b5cff",
    visual: "flow",
    tab: "Автоматизація",
    icon: CirclesThreePlus,
    kicker: "АВТОМАТИЗАЦІЯ",
    title: "Процеси, що йдуть без ручної рутини",
    copy: "Проєктуємо наскрізні сценарії: від першого сигналу до виконаної задачі. Менше перемикань між вікнами, менше копіпасту, менше втрат між системами.",
    metrics: [
      ["41%", "нижча вартість операції"],
      ["3.4×", "швидший процес"],
      ["0", "ручних переносів"],
    ],
    flow: ["Інтеграції", "Документи", "Узгодження", "Контроль якості"],
  },
  {
    id: "custom",
    hue: "#2b4bff",
    visual: "graph",
    tab: "Власний AI",
    icon: Brain,
    kicker: "ВЛАСНИЙ AI",
    title: "Інтелект вашої компанії на ваших даних",
    copy: "Пошук знань, copilot-рішення, прогнозування та інтелектуальні робочі простори з керованою якістю відповідей — у вашому контурі даних.",
    metrics: [
      ["96%", "точність відповідей"],
      ["1", "база правди"],
      ["100%", "дані у вашому контурі"],
    ],
    flow: ["RAG", "Copilot", "Прогнози", "Приватний хостинг"],
  },
  {
    id: "strategy",
    hue: "#5ff0c8",
    visual: "roadmap",
    tab: "AI-стратегія",
    icon: Target,
    kicker: "AI-СТРАТЕГІЯ",
    title: "Від можливості до архітектури впровадження",
    copy: "Знаходимо сценарії з реальним ROI, перевіряємо їх прототипом і створюємо архітектуру, яку можна безпечно масштабувати — без ставки наосліп.",
    metrics: [
      ["2–3", "тижні до прототипу"],
      ["1", "план із бюджетом"],
      ["ROI", "рахуємо до старту"],
    ],
    flow: ["Аудит", "Пріоритети", "Оцінка ROI", "Roadmap"],
  },
];

/* Реальні екрани застосунку. Поклади PNG у /public/assets/sweezy/
   з цими іменами — і вони з'являться в макеті телефона. */
const sweezyScreens = [
  {
    id: "home",
    src: "/assets/sweezy/home.png",
    tab: "Головна",
    title: "Твій шлях у Швейцарії",
    note: "Сім кроків із прогресом і планом на сьогодні.",
  },
  {
    id: "guides",
    src: "/assets/sweezy/guides.png",
    tab: "Довідник",
    title: "Знайди потрібну відповідь",
    note: "Гайди, інструменти та чек-листи з пошуком і фільтрами.",
  },
  {
    id: "tools",
    src: "/assets/sweezy/tools.png",
    tab: "Інструменти",
    title: "Обери завдання",
    note: "Кар'єрний хаб, готовність документів, німецька щодня.",
  },
  {
    id: "career",
    src: "/assets/sweezy/career.png",
    tab: "Робота",
    title: "Знайди роботу, яка тобі підходить",
    note: "AI Match, збережені вакансії та трекер заявок.",
  },
];

const studio = [
  {
    id: "influencers",
    video: "/assets/studio/influencers.mp4",
    poster: "/assets/studio/influencers.jpg",
    hue: "#4fe3ff",
    icon: UsersThree,
    title: "AI-інфлюенсери",
    sub: "Віртуальні амбасадори бренду",
    metric: "3M+",
    metricLabel: "переглядів",
    handle: "@brand.ai",
    screenKicker: "ЖИВИЙ ЕФІР",
    screenTitle: "Персонаж, який ніколи не втомлюється",
    screenNote: "Один образ — усі майданчики й усі мови.",
    stats: [
      ["Залучення", "+340%"],
      ["Дописів/міс", "500+"],
      ["Вартість", "−80%"],
    ],
  },
  {
    id: "video",
    video: "/assets/studio/video.mp4",
    poster: "/assets/studio/video.jpg",
    hue: "#8b5cff",
    icon: VideoCamera,
    title: "AI-відео",
    sub: "Ролики без знімальної групи",
    metric: "500+",
    metricLabel: "відео/міс",
    handle: "@brand.reels",
    screenKicker: "РЕНДЕР 04 / 12",
    screenTitle: "Від брифу до готового ролика",
    screenNote: "Сценарій, озвучка, монтаж і субтитри — за годину.",
    stats: [
      ["Час на ролик", "−94%"],
      ["Мов озвучки", "10+"],
      ["Форматів", "6"],
    ],
  },
  {
    id: "ugc",
    video: "/assets/studio/ugc.mp4",
    poster: "/assets/studio/ugc.jpg",
    hue: "#2b4bff",
    icon: Sparkle,
    title: "UGC-реклама",
    sub: "Креативи, що масштабуються",
    metric: "−80%",
    metricLabel: "вартість креативу",
    handle: "@brand.ugc",
    screenKicker: "ВАРІАНТ B · ТЕСТ",
    screenTitle: "Сотня версій одного офера",
    screenNote: "Ротація гіпотез без нової зйомки щотижня.",
    stats: [
      ["Гіпотез/тиждень", "40+"],
      ["CPA", "−37%"],
      ["Час на партію", "1 день"],
    ],
  },
  {
    id: "creative",
    /* поклади ролик 9:16 у /public/assets/studio/ і впиши шлях */
    video: null,
    poster: null,
    hue: "#5ff0c8",
    icon: ImageSquare,
    title: "Креативна студія",
    sub: "Банери й пости без дизайнера",
    metric: "100+",
    metricLabel: "креативів/міс",
    handle: "@brand.studio",
    screenKicker: "ПАРТІЯ 07",
    screenTitle: "Уся сітка форматів за один прогін",
    screenNote: "Айдентика тримається сама — без правок від руки.",
    stats: [
      ["Форматів", "24"],
      ["Правок", "−70%"],
      ["Узгодження", "1 крок"],
    ],
  },
];

const values = [
  {
    index: "01",
    label: "ЧІТКІСТЬ",
    title: "Знаєте, що буде далі",
    copy: "Кожен етап має результат, дату й відповідального. Без «десь у розробці».",
    tone: "is-paper",
  },
  {
    index: "02",
    label: "ШВИДКІСТЬ",
    title: "Прототип за 2–3 тижні",
    copy: "Перевіряємо гіпотезу на ваших даних раніше, ніж закінчиться квартал.",
    tone: "is-accent",
  },
  {
    index: "03",
    label: "КОНТРОЛЬ",
    title: "Дані лишаються вашими",
    copy: "Власний хмарний акаунт, приватний хостинг або on-premise — на ваш вибір.",
    tone: "is-cobalt",
  },
  {
    index: "04",
    label: "ЕФЕКТ",
    title: "Цифри, а не демо",
    copy: "Рахуємо ефект до старту й після запуску. Не спрацювало — кажемо прямо.",
    tone: "is-sky",
  },
];

const method = [
  [
    "01",
    "Розкажіть ситуацію",
    "Процеси, дані, команда й те, що зараз болить найбільше.",
    "тиждень 1",
  ],
  [
    "02",
    "Отримайте маршрут",
    "Сценарії з ROI, архітектура рішення й чесна оцінка ризиків.",
    "тижні 2–3",
  ],
  [
    "03",
    "Запускайте систему",
    "Інтеграція, навчання команди, підтримка й масштабування.",
    "тижні 4–8",
  ],
];

const stories = [
  {
    quote:
      "За шість тижнів команда закрила процес, який ми не могли розв’язати два роки.",
    name: "Marc Bühler",
    role: "COO · логістична група, Цюрих",
    initials: "MB",
  },
  {
    quote:
      "AI-агент узяв понад половину звернень у перший місяць. Люди нарешті працюють зі складними кейсами.",
    name: "Олена Дорошенко",
    role: "Head of Customer Care · Київ",
    initials: "ОД",
  },
  {
    quote:
      "Прототип за два тижні й цифри на столі. Найпрозоріший AI-проєкт, який ми запускали.",
    name: "Andreas Keller",
    role: "CEO · insurtech, Берн",
    initials: "AK",
  },
];

const faqItems = [
  {
    q: "Скільки часу до першого результату?",
    a: "Перший робочий прототип — 2–3 тижні. Він працює на ваших реальних даних, тому вже на цьому етапі видно ефект і вартість масштабування.",
  },
  {
    q: "Де зберігаються наші дані?",
    a: "У вашому контурі: власний хмарний акаунт, приватний хостинг або on-premise. Ми проєктуємо систему так, щоб чутливі дані не залишали вашу інфраструктуру.",
  },
  {
    q: "Ми не маємо технічної команди. Це проблема?",
    a: "Ні. Ми беремо на себе архітектуру, розробку та інтеграцію, навчаємо вашу команду й залишаємо документацію та зрозумілі процеси підтримки.",
  },
  {
    q: "Скільки це коштує?",
    a: "AI Sprint — від CHF 15 000. Власна AI-система — від CHF 75 000. Точна цифра залежить від обсягу інтеграцій і рівня невизначеності; ми називаємо її після першої розмови.",
  },
  {
    q: "Що, якщо AI не дасть результату?",
    a: "Тому ми й починаємо зі спринту. Він коштує менше, ніж помилка на повному впровадженні, і завершується чесною відповіддю: масштабувати, переробити чи зупинитись.",
  },
];

const navLinks = [
  ["#services", "Послуги"],
  ["#work", "Кейси"],
  ["#studio", "AI-контент"],
  ["#method", "Як працюємо"],
  ["#sweezy", "Sweezy"],
  ["#faq", "FAQ"],
];

/* ============================================================= helpers */

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const Meta = ({ children, className = "" }) => (
  <span className={`meta ${className}`.trim()}>{children}</span>
);

function Reveal({ children, as: Tag = "div", className = "", delay = 0 }) {
  return (
    <Tag
      className={className}
      data-reveal
      style={delay ? { "--reveal-delay": `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

function SectionHead({ eyebrow, title, copy, wide = false }) {
  return (
    <div className={`sec-head${wide ? " is-wide" : ""}`}>
      <Reveal>
        <Meta>{eyebrow}</Meta>
      </Reveal>
      <Reveal delay={90}>
        <div className="sec-head-body">
          <h2 className="h-lg has-split">
            <SplitText text={title} />
          </h2>
        </div>
        {copy && <p>{copy}</p>}
      </Reveal>
    </div>
  );
}

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
                  <a className="btn btn-outline" href="#services">
                    Що ми закриваємо
                  </a>
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
            <a className="btn btn-outline" href="#work">
              Дивитися приклади
            </a>
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

/* =========================================================== 10 — faq */

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq-list">
      {faqItems.map((item, index) => {
        const isOpen = open === index;
        return (
          <div className={`faq-item${isOpen ? " is-open" : ""}`} key={item.q}>
            <button
              onClick={() => setOpen(isOpen ? -1 : index)}
              aria-expanded={isOpen}
            >
              {item.q}
              <span className="faq-sign" aria-hidden="true" />
            </button>
            <div className="faq-a">
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ========================================================= 13 — modal */

function ContactModal({ onClose }) {
  const [sent, setSent] = useState(false);
  useEffect(() => {
    const onKey = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-title"
      onMouseDown={onClose}
    >
      <div className="modal" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Закрити">
          <X size={17} />
        </button>
        {sent ? (
          <div className="modal-success">
            <span className="modal-check">
              <Check size={26} weight="bold" />
            </span>
            <Meta>ПОВІДОМЛЕННЯ ОТРИМАНО</Meta>
            <h2 className="h-md" id="contact-title">
              Дякуємо. Ми на зв’язку.
            </h2>
            <p>Відповімо протягом одного робочого дня.</p>
            <button className="btn btn-accent" onClick={onClose}>
              Повернутися на сайт
            </button>
          </div>
        ) : (
          <>
            <Meta>ПОЧАТИ РОЗМОВУ</Meta>
            <h2 className="h-md" id="contact-title">
              Розкажіть, що має змінити AI.
            </h2>
            <p className="modal-copy">
              Опишіть процес або можливість — запропонуємо практичний наступний
              крок.
            </p>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setSent(true);
              }}
            >
              <label>
                <Meta>ІМ’Я</Meta>
                <input required name="name" placeholder="Ваше ім’я" />
              </label>
              <label>
                <Meta>РОБОЧИЙ EMAIL</Meta>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                />
              </label>
              <label>
                <Meta>ЩО ПОТРІБНО ПОКРАЩИТИ?</Meta>
                <textarea
                  required
                  name="brief"
                  rows="4"
                  placeholder="Коротко опишіть задачу, процес або ідею…"
                />
              </label>
              <button className="btn btn-accent" type="submit">
                Надіслати бриф <PaperPlaneTilt size={16} weight="bold" />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* =========================================================== the app */

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [lang, setLang] = useState("UA");
  const [sweezyScreen, setSweezyScreen] = useState(0);
  const [stuck, setStuck] = useState(false);

  const screen = sweezyScreens[sweezyScreen];

  const openContact = useCallback(() => {
    setMenuOpen(false);
    setContactOpen(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("is-locked", menuOpen);
  }, [menuOpen]);

  useSpotlight();
  useParallax();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" },
    );
    const watch = () =>
      document
        .querySelectorAll("[data-reveal]:not(.is-in)")
        .forEach((node) => observer.observe(node));
    watch();
    const again = setTimeout(watch, 500);

    const onScroll = () => {
      setStuck(window.scrollY > 20);
      const max = document.body.scrollHeight - window.innerHeight;
      root.style.setProperty(
        "--progress",
        max > 0 ? String(Math.min(1, window.scrollY / max)) : "0",
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const fine = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const magnets =
      fine && !prefersReduced() ? [...document.querySelectorAll(".btn")] : [];
    const onMove = (event) => {
      const el = event.currentTarget;
      const rect = el.getBoundingClientRect();
      el.style.setProperty(
        "--mx",
        `${(event.clientX - rect.left - rect.width / 2) * 0.16}px`,
      );
      el.style.setProperty(
        "--my",
        `${(event.clientY - rect.top - rect.height / 2) * 0.22}px`,
      );
    };
    const onLeave = (event) => {
      event.currentTarget.style.setProperty("--mx", "0px");
      event.currentTarget.style.setProperty("--my", "0px");
    };
    magnets.forEach((node) => {
      node.addEventListener("pointermove", onMove);
      node.addEventListener("pointerleave", onLeave);
    });

    return () => {
      observer.disconnect();
      clearTimeout(again);
      window.removeEventListener("scroll", onScroll);
      magnets.forEach((node) => {
        node.removeEventListener("pointermove", onMove);
        node.removeEventListener("pointerleave", onLeave);
      });
    };
  }, []);

  return (
    <div className="shell">
      <Grain />
      <Cursor />
      <header className={`hdr${stuck ? " is-stuck" : ""}`}>
        <div className="hdr-in">
          <a className="brand" href="#top" aria-label="AI Insider — головна">
            <span className="brand-mark" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </span>
            <span className="brand-text">
              AI Insider
              <small>AI-СИСТЕМИ ДЛЯ БІЗНЕСУ</small>
            </span>
          </a>

          <nav className="hdr-nav" aria-label="Розділи сайту">
            {navLinks.map(([href, label], i) => (
              <a key={href} href={href}>
                <span className="hdr-nav-i">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {label}
              </a>
            ))}
          </nav>

          <div className="hdr-right">
            <span className="hdr-live">
              <i />
              ZRH <Clock />
            </span>
            <div className="lang" role="group" aria-label="Мова">
              {["UA", "EN", "DE"].map((code) => (
                <button
                  key={code}
                  className={lang === code ? "is-on" : ""}
                  onClick={() => setLang(code)}
                  aria-pressed={lang === code}
                >
                  {code}
                </button>
              ))}
            </div>
            <button className="btn btn-accent hdr-cta" onClick={openContact}>
              Обговорити проєкт
              <ArrowUpRight size={14} weight="bold" />
            </button>
            <button
              className="burger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Закрити меню" : "Відкрити меню"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={19} /> : <List size={19} />}
            </button>
          </div>
        </div>
        <i className="hdr-progress" aria-hidden="true" />
      </header>

      {menuOpen && (
        <nav className="menu" aria-label="Головна навігація">
          {navLinks.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <button className="btn btn-accent" onClick={openContact}>
            Обговорити проєкт <ArrowUpRight size={16} weight="bold" />
          </button>
        </nav>
      )}

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
              <Reveal
                className="tile tile-w4 tile-tall tile-canvas"
                as="article"
              >
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

              <Reveal
                className="tile tile-w2 t-violet"
                as="article"
                delay={120}
              >
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
                  вузьке місце й одразу рахує ефект від його усунення — так
                  само, як це відбувається на першій діагностиці.
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
                  Виробництво, страхування, рітейл і медтех — там, де ціна
                  помилки висока, а ручна робота дорога.
                </p>
              </Reveal>
            </div>

            <div className="cases-board">
              <Reveal className="case-featured" delay={80}>
                <a className="case-panel" href="#contact">
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
                </a>
              </Reveal>

              <div className="case-rail">
                {caseItems.slice(1).map((item, index) => (
                  <Reveal
                    className="case-compact"
                    key={item.index}
                    delay={120 + index * 80}
                  >
                    <a className="case-panel" href="#contact">
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
                    </a>
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
                  місцеві сервіси. Спроєктований і запущений командою AI
                  Insider.
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
              <div className="sw-stage">
                <span className="sw-bloom" aria-hidden="true" />
                <Device
                  key={screen.id}
                  image={screen.src}
                  hue="#c8ff3d"
                  label={`SWEEZY · ${screen.tab.toUpperCase()}`}
                />
              </div>
              <div className="sw-switch" role="tablist" aria-label="Екрани Sweezy">
                {sweezyScreens.map((item, i) => (
                  <button
                    key={item.id}
                    role="tab"
                    aria-selected={i === sweezyScreen}
                    className={i === sweezyScreen ? "is-on" : ""}
                    onClick={() => setSweezyScreen(i)}
                  >
                    <span className="num">0{i + 1}</span>
                    {item.tab}
                  </button>
                ))}
              </div>
              <p className="sw-caption">
                <b>{screen.title}</b>
                {screen.note}
              </p>
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

      <footer className="footer">
        <div className="wrap">
          <div className="foot-lead">
            <div>
              <Meta>ГОТОВІ ПОЧАТИ РОЗМОВУ</Meta>
              <a className="foot-mail" href="mailto:hello@aiinsider.it.com">
                hello@aiinsider.it.com
                <span className="foot-mail-go">
                  <ArrowUpRight size={22} weight="bold" />
                </span>
              </a>
            </div>
            <div className="foot-clocks">
              {[
                ["КИЇВ", "Europe/Kyiv"],
                ["ЦЮРИХ", "Europe/Zurich"],
              ].map(([city, zone]) => (
                <span key={city}>
                  <Meta>{city}</Meta>
                  <b>
                    <Clock zone={zone} />
                  </b>
                </span>
              ))}
            </div>
          </div>

          <div className="footer-grid">
            <div className="footer-brand">
              <a className="brand" href="#top">
                <span className="brand-mark" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
                <span className="brand-text">AI Insider</span>
              </a>
              <p>
                Проєктуємо, будуємо та масштабуємо AI-системи з вимірюваним
                бізнес-результатом.
              </p>
              <span className="footer-chip">
                <i>S</i> Sweezy — наш продукт
              </span>
              <div className="footer-social">
                <a className="icon-btn" href="#" aria-label="LinkedIn">
                  <LinkedinLogo size={16} weight="fill" />
                </a>
                <a className="icon-btn" href="#" aria-label="Instagram">
                  <InstagramLogo size={16} weight="fill" />
                </a>
              </div>
            </div>
            <div className="footer-col">
              <Meta>ПОСЛУГИ</Meta>
              {modules.map((module) => (
                <a href="#services" key={module.id}>
                  {module.tab}
                </a>
              ))}
            </div>
            <div className="footer-col">
              <Meta>КОМПАНІЯ</Meta>
              <a href="#work">Кейси</a>
              <a href="#studio">AI-контент</a>
              <a href="#method">Як працюємо</a>
              <a href="#sweezy">Sweezy</a>
              <a href="#faq">FAQ</a>
            </div>
            <div className="footer-col">
              <Meta>ЛОКАЦІЇ</Meta>
              <span>Київ, Україна</span>
              <span>Цюрих, Швейцарія</span>
              <span className="foot-status">
                <i />
                Приймаємо проєкти
              </span>
            </div>
          </div>
        </div>

        <div className="foot-mark" aria-hidden="true">
          <span>AI INSIDER</span>
        </div>

        <div className="wrap">
          <div className="footer-bottom">
            <span>© 2026 AI Insider AG. Усі права захищені.</span>
            <div className="footer-links">
              <a href="#">Приватність</a>
              <a href="#">Умови</a>
              <a href="#">Вихідні дані</a>
            </div>
          </div>
        </div>
      </footer>

      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </div>
  );
}
