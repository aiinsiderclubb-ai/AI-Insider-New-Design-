import { ArrowLeft, ArrowUpRight, Check, Play } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Device, SplitText } from "../wow.jsx";
import { Meta, Reveal } from "../ui.jsx";
import { useContact } from "../layout.jsx";
import { caseItems } from "../data.js";
import { NotFound } from "./NotFound.jsx";

const detail = {
  "operatsiina-systema-kreatyvnoi-ahentsii": {
    label: "ВИРОБНИЧА СИСТЕМА · КРЕАТИВНА АГЕНЦІЯ",
    summary:
      "Перетворили розрізнений production на єдиний керований контур: задача заходить один раз, проходить дизайн, QA, ревізії, доставку й одразу потрапляє у фінансовий цикл.",
    task: "Команда приблизно з 20 людей вела production у кількох системах. Задачі переносили вручну, статуси розходилися, вкладення зникали, а виплати рахували наприкінці місяця.",
    build: [
      "ClickUp став єдиним джерелом правди для статусів, QA, ревізій і відповідальності",
      "n8n синхронізує задачі, переносить файли, контролює SLA й фіксує помилки",
      "Google Sheets рахує собівартість, виплати й маржу в момент закриття задачі",
    ],
    result: [
      ["539", "задач під контролем"],
      ["0", "втрат при переносі"],
      ["45 с", "побудова звіту замість 4 хв"],
    ],
    steps: [
      [
        "01",
        "Вхід",
        "Upsert за ID: опис, дедлайн, матеріали й вкладення заходять без ручного копіювання.",
      ],
      [
        "02",
        "Production",
        "Статуси DESIGN DONE та INTERNAL REVIEW розділяють готовність дизайнера і QA менеджера.",
      ],
      [
        "03",
        "Винятки",
        "Ревізії, cold tasks і On Hold мають правила, ліміти та адресні сповіщення.",
      ],
      [
        "04",
        "Фінал",
        "DELIVERED створює фінансовий рядок; CLOSED настає після перевірки finance.",
      ],
    ],
    hard: "Подієві шторми запускали до 200 сценаріїв за хвилину. Додали контроль конкурентності, пакетний запис і фізичне копіювання вкладень до 80 МБ — тимчасові посилання більше не ламали архів.",
    stack: [
      "n8n",
      "ClickUp API",
      "Google Sheets API",
      "Telegram Bot API",
      "PostgreSQL",
      "Docker",
    ],
    media: [
      ["/assets/case-industrial.png", "Єдиний production", "58% center"],
      ["/assets/editorial-insights.webp", "Контроль статусів", "72% center"],
      ["/assets/case-retail.jpg", "Фінальний контур", "64% center"],
    ],
    proofImage: "/assets/case-industrial.png",
    proofTitle: "Один маршрут замість ручних переносів",
    proofCopy:
      "Задача проходить production, QA, доставку й фінанси без повторного введення даних.",
    proofStages: ["Вхід", "Production", "QA", "Фінанси"],
    system: {
      title: "Один ID веде задачу від брифу до фінансів.",
      copy: "Кожен перехід змінює не просто статус. Він запускає наступну відповідальність, переносить потрібні матеріали й залишає перевірний слід для команди.",
      outcome: ["0", "втрат під час переносу задач між етапами"],
      controls: [
        [
          "ЄДИНЕ ДЖЕРЕЛО",
          "Опис, файли, ревізії, дедлайн і відповідальний живуть біля одного task ID.",
        ],
        [
          "HUMAN GATE",
          "QA та finance підтверджують критичні переходи; автоматизація не закриває їх мовчки.",
        ],
      ],
    },
  },
  "ai-rekruter-dlia-ahentsii": {
    label: "AI-АГЕНТ · РЕКРУТИНГОВА АГЕНЦІЯ",
    summary:
      "Один Telegram-агент створює вакансії, кваліфікує вхідних кандидатів, веде вихідний пошук і контролює тестове завдання.",
    task: "Рекрутери паралельно ведуть понад 12 активних проєктів. Опис вакансії, перший скринінг, розсилка й тестове завдання забирали увагу ще до живої розмови з сильним кандидатом.",
    build: [
      "Керування вакансіями через чат без участі розробника",
      "Адаптивна кваліфікація, shortlist і коректна відмова",
      "Автоматична видача тестового, дедлайн, нагадування та передача рекрутеру",
    ],
    result: [
      ["4", "модулі в одному агенті"],
      ["12+", "активних проєктів у контексті"],
      ["9–11", "днів планового запуску"],
    ],
    steps: [
      [
        "01",
        "Вакансія",
        "Рекрутер задає стек, рівень, кейси й діапазон компенсації прямо в чаті.",
      ],
      [
        "02",
        "Відбір",
        "Агент ставить адаптивні питання і формує shortlist за критеріями вакансії.",
      ],
      [
        "03",
        "Контакт",
        "Система працює з вхідним і вихідним потоком, зберігаючи контекст кандидата.",
      ],
      [
        "04",
        "Тестове",
        "Агент надсилає завдання, стежить за дедлайном і передає готову роботу людині.",
      ],
    ],
    hard: "Ключове обмеження — не підмінити рекрутера моделлю. Агент закриває повторювані кроки, а рішення про кандидата та складні діалоги залишаються людині.",
    stack: [
      "Telegram Bot",
      "LLM",
      "вакансійний контекст",
      "сценарії кваліфікації",
      "нагадування",
    ],
    media: [
      [
        "/assets/cases/ai-recruiter-demo-poster.webp",
        "Зведення процесу",
        "center",
      ],
      [
        "/assets/cases/ai-recruiter-criteria.webp",
        "Критерії відбору",
        "center",
      ],
      [
        "/assets/cases/ai-recruiter-control.webp",
        "Керування вакансіями",
        "center",
      ],
    ],
    proofImage: "/assets/cases/ai-recruiter-demo-poster.webp",
    proofVideo: "/assets/cases/ai-recruiter-demo.mp4",
    proofLayout: "portrait",
    proofEyebrow: "LIVE CASE · 01:05",
    proofTitle: "Подивіться агента в роботі",
    proofCopy:
      "Реальна демонстрація: вакансія, критерії, розсилка, shortlist, тестове та підсумкова статистика в одному Telegram-контурі.",
    proofStages: ["Вакансія", "Відбір", "Контакт", "Тестове"],
    system: {
      title: "Кандидат рухається далі лише коли сигналів достатньо.",
      copy: "Агент пам’ятає критерії конкретної вакансії, ставить уточнення, фіксує відповідь і сам готує наступну дію. Рекрутер бачить контекст, а не розрізнені повідомлення.",
      outcome: [
        "10/11",
        "кандидатів, які отримали тестове в демо, здали роботу",
      ],
      controls: [
        [
          "ПАМ’ЯТЬ ВАКАНСІЇ",
          "Стек, рівень, кейси, компенсація та вага кожного критерію супроводжують діалог.",
        ],
        [
          "РІШЕННЯ ЛЮДИНИ",
          "Агент готує shortlist і нагадування. Найм, складна відмова та оцінка роботи залишаються рекрутеру.",
        ],
      ],
    },
  },
  "content-factory-ai-video": {
    label: "CONTENT FACTORY · AI-ВІДЕО",
    summary:
      "Замість разових роликів — виробнича система: ідея, сценарій, генерація, адаптація, тест і масштабування форматів.",
    task: "Брендам потрібні десятки варіацій для Reels, UGC і performance-реклами. Класичний продакшн робить кожну нову версію окремою зйомкою — повільною та дорогою.",
    build: [
      "Єдина бібліотека героїв, продуктів, сцен і перевірених форматів",
      "AI-відео, UGC-подача, AI-інфлюенсери та продуктові креативи в одному потоці",
      "Локалізація й адаптація переможних концептів без повторної зйомки",
    ],
    result: [
      ["500+", "відео на місяць"],
      ["10+", "мов для адаптації"],
      ["−80%", "вартість креативу"],
    ],
    steps: [
      [
        "01",
        "Ідея",
        "Фіксуємо продукт, аудиторію, гіпотезу й платформу до генерації кадрів.",
      ],
      [
        "02",
        "Сценарій",
        "Розкладаємо хук, демонстрацію, proof і CTA на короткий production-план.",
      ],
      [
        "03",
        "Генерація",
        "Створюємо відео та адаптуємо під потрібне співвідношення, мову й ринок.",
      ],
      [
        "04",
        "Масштаб",
        "Переможний креатив розгортається у варіації без нової знімальної зміни.",
      ],
    ],
    hard: "Швидкість не повинна знищувати впізнаваність бренду. Тому генерація працює всередині зафіксованої артдирекції, а кожен ролик проходить людський монтаж і QA.",
    stack: [
      "AI-video",
      "UGC",
      "AI-інфлюенсери",
      "монтаж",
      "локалізація",
      "creative testing",
    ],
    media: [
      ["/assets/studio/influencers.jpg", "AI-інфлюенсери", "center"],
      ["/assets/studio/beauty-spf.webp", "Beauty reels", "center"],
      ["/assets/studio/product-shampoo.webp", "Product CGI", "center"],
    ],
    proofImage: "/assets/case-industrial.png",
    proofVideo: "/assets/studio/ugc.mp4",
    proofTitle: "Дивіться, як це працює",
    proofCopy:
      "Від брифу до готового відео й адаптацій для десяти мов — в одному production-потоці.",
    proofStages: ["Бриф", "AI-виробництво", "Локалізація", "Публікація"],
    system: {
      title: "Одна creative-система випускає десятки варіацій.",
      copy: "Бриф не починається з чистого аркуша на кожному ролику. Герой, продукт, артдирекція й перевірені hooks переходять у нові формати та ринки як керована бібліотека.",
      outcome: ["10+", "мов для адаптації без повторної знімальної зміни"],
      controls: [
        [
          "BRAND MEMORY",
          "Референси, персонажі, голос, заборони та переможні концепти зберігаються між ітераціями.",
        ],
        [
          "HUMAN QA",
          "Монтажер перевіряє продукт, анатомію, титри, звук і відповідність майданчику до публікації.",
        ],
      ],
    },
  },
};

function CaseProofMedia({ image, video, layout, eyebrow }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playVideo = () => {
    videoRef.current?.play();
  };

  return (
    <div
      className={`case-proof-media${layout === "portrait" ? " is-portrait" : ""}`}
      style={
        layout === "portrait"
          ? { "--proof-poster": `url(${image})` }
          : undefined
      }
    >
      {layout === "portrait" && (
        <div className="case-proof-media-copy" aria-hidden="true">
          <span>{eyebrow}</span>
          <strong>
            Від вакансії
            <br />
            до зданого тестового
          </strong>
          <small>Натисніть play — повна 64-секундна демонстрація</small>
        </div>
      )}
      {video ? (
        <video
          ref={videoRef}
          controls={isPlaying}
          playsInline
          preload="metadata"
          poster={image}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        >
          <source src={video} type="video/mp4" />
        </video>
      ) : (
        <img src={image} alt="" />
      )}
      {video ? (
        !isPlaying && (
          <button
            className="case-proof-play"
            type="button"
            aria-label="Відтворити демонстрацію"
            onClick={playVideo}
          >
            <Play size={22} weight="fill" />
          </button>
        )
      ) : (
        <span className="case-proof-play" aria-hidden="true">
          <Play size={22} weight="fill" />
        </span>
      )}
    </div>
  );
}

export function CaseDetail() {
  const { slug } = useParams();
  const openContact = useContact();
  const item = caseItems.find((c) => c.slug === slug);
  const extra = detail[slug];

  if (!item || !extra) return <NotFound />;

  const others = caseItems.filter((c) => c.slug !== slug);

  return (
    <main className="case-editorial-page">
      <section className="case-editorial-hero c-paper">
        <div className="wrap">
          <Link className="back-link" to="/cases">
            <ArrowLeft size={15} weight="bold" /> Усі кейси
          </Link>
          <div className="case-editorial-grid">
            <div className="case-editorial-copy">
              <Meta>{extra.label}</Meta>
              <h1 data-reveal>
                <SplitText text={item.title} />
              </h1>
              <p>{extra.summary}</p>
              <div className="case-result-route" aria-label="Результати кейсу">
                {extra.result.map(([value, label], index) => (
                  <div key={label}>
                    <i aria-hidden="true" />
                    <small>{String(index + 1).padStart(2, "0")}</small>
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                ))}
                <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
              </div>
            </div>
            <Reveal className="case-media-flow" delay={90}>
              {extra.media.map(([src, label], index) => (
                <figure className={index === 0 ? "is-main" : ""} key={label}>
                  <span className="case-shot">
                    <Device image={src} hue="var(--accent)" />
                  </span>
                  <figcaption>{label}</figcaption>
                </figure>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="case-proof-board-wrap c-paper">
        <div className="case-proof-board">
          <div className="case-proof-intro">
            <Meta>AI PROOF</Meta>
            <h2>{extra.proofTitle}</h2>
            <p>{extra.proofCopy}</p>
          </div>
          <CaseProofMedia
            image={extra.proofImage}
            video={extra.proofVideo}
            layout={extra.proofLayout}
            eyebrow={extra.proofEyebrow}
          />
          <ol className="case-proof-stages">
            {extra.proofStages.map((stage, index) => (
              <li className={index === 1 ? "is-active" : ""} key={stage}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {stage}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="case-story c-paper">
        <div className="wrap case-story-grid">
          <Reveal as="article">
            <Meta>01 / КОНТЕКСТ</Meta>
            <h2>Що стримувало масштаб</h2>
            <p>{extra.task}</p>
          </Reveal>
          <Reveal as="article" delay={70}>
            <Meta>02 / СИСТЕМА</Meta>
            <h2>Що змінили</h2>
            <ul className="case-doc-list">
              {extra.build.map((line) => (
                <li key={line}>
                  <Check size={13} weight="bold" />
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal as="article" delay={140}>
            <Meta>03 / РЕЗУЛЬТАТ</Meta>
            <h2>Що працює тепер</h2>
            <p>{extra.hard}</p>
            <button className="btn btn-dark" onClick={openContact}>
              Розібрати мій процес <ArrowUpRight size={15} weight="bold" />
            </button>
          </Reveal>
        </div>
      </section>

      <section className="chapter c-paper-2 case-evidence">
        <div className="wrap case-system-canvas">
          <div className="case-system-overview">
            <Reveal>
              <Meta>04 / ЛОГІКА СИСТЕМИ</Meta>
              <h2 className="h-lg">{extra.system.title}</h2>
              <p className="lede">{extra.system.copy}</p>
            </Reveal>
            <Reveal className="case-system-outcome" delay={80}>
              <Meta>СИГНАЛ ІЗ ДЕМО</Meta>
              <strong>{extra.system.outcome[0]}</strong>
              <p>{extra.system.outcome[1]}</p>
            </Reveal>
          </div>

          <div className="case-system-map" aria-label="Маршрут системи">
            <div className="case-system-route" aria-hidden="true">
              <span />
            </div>
            <div className="case-system-stage-grid">
              {extra.steps.map(([number, title, copy], index) => (
                <Reveal as="article" key={number} delay={index * 65}>
                  <div className="case-system-stage-head">
                    <span className="num">{number}</span>
                    <i aria-hidden="true" />
                  </div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </Reveal>
              ))}
            </div>

            <Reveal className="case-system-controls" delay={160}>
              {extra.system.controls.map(([label, copy]) => (
                <div key={label}>
                  <Meta>{label}</Meta>
                  <p>{copy}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="chapter c-paper-2 case-hard-section">
        <div className="wrap case-hard-grid">
          <Reveal>
            <Meta>05 / СКЛАДНИЙ ВУЗОЛ</Meta>
            <h2 className="h-md">Те, що не видно на красивій схемі.</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="lede">{extra.hard}</p>
            <div className="case-stack">
              {extra.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="chapter c-paper-2">
        <div className="wrap">
          <Meta>ІНШІ КЕЙСИ</Meta>
          <div className="case-list" style={{ marginTop: 20 }}>
            {others.map((other) => (
              <Reveal as="article" className="case-row" key={other.slug}>
                <Link className="case-row-link" to={`/cases/${other.slug}`}>
                  <span className="case-row-shot">
                    <img src={other.image} alt="" />
                    <span className="case-row-index num">{other.index}</span>
                  </span>
                  <span className="case-row-body">
                    <Meta>{other.kicker}</Meta>
                    <h2 className="h-md">{other.title}</h2>
                  </span>
                  <span className="case-row-go">
                    <ArrowUpRight size={20} weight="bold" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
