import { ArrowLeft, ArrowUpRight, Check, CircleNotch } from "@phosphor-icons/react";
import { Link, useParams } from "react-router-dom";
import { SplitText } from "../wow.jsx";
import { Meta, Reveal } from "../ui.jsx";
import { useContact } from "../layout.jsx";
import { caseItems } from "../data.js";
import { NotFound } from "./NotFound.jsx";

const detail = {
  "operatsiina-systema-kreatyvnoi-ahentsii": {
    label: "ВИРОБНИЧА СИСТЕМА · КРЕАТИВНА АГЕНЦІЯ",
    summary: "Перетворили розрізнений production на єдиний керований контур: задача заходить один раз, проходить дизайн, QA, ревізії, доставку й одразу потрапляє у фінансовий цикл.",
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
    facts: [["19", "активних сценаріїв"], ["15", "живих таблиць"], ["47", "полів задачі"], ["3×/день", "зведення керівнику"]],
    steps: [
      ["01", "Вхід", "Upsert за ID: опис, дедлайн, матеріали й вкладення заходять без ручного копіювання."],
      ["02", "Production", "Статуси DESIGN DONE та INTERNAL REVIEW розділяють готовність дизайнера і QA менеджера."],
      ["03", "Винятки", "Ревізії, cold tasks і On Hold мають правила, ліміти та адресні сповіщення."],
      ["04", "Фінал", "DELIVERED створює фінансовий рядок; CLOSED настає після перевірки finance."],
    ],
    hard: "Подієві шторми запускали до 200 сценаріїв за хвилину. Додали контроль конкурентності, пакетний запис і фізичне копіювання вкладень до 80 МБ — тимчасові посилання більше не ламали архів.",
    stack: ["n8n", "ClickUp API", "Google Sheets API", "Telegram Bot API", "PostgreSQL", "Docker"],
  },
  "ai-rekruter-dlia-ahentsii": {
    label: "AI-АГЕНТ · РЕКРУТИНГОВА АГЕНЦІЯ",
    summary: "Один Telegram-агент створює вакансії, кваліфікує вхідних кандидатів, веде вихідний пошук і контролює тестове завдання.",
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
    facts: [["01", "вакансії"], ["02", "вхідний потік"], ["03", "outbound"], ["04", "тестові"]],
    steps: [
      ["01", "Вакансія", "Рекрутер задає стек, рівень, кейси й діапазон компенсації прямо в чаті."],
      ["02", "Відбір", "Агент ставить адаптивні питання і формує shortlist за критеріями вакансії."],
      ["03", "Контакт", "Система працює з вхідним і вихідним потоком, зберігаючи контекст кандидата."],
      ["04", "Тестове", "Агент надсилає завдання, стежить за дедлайном і передає готову роботу людині."],
    ],
    hard: "Ключове обмеження — не підмінити рекрутера моделлю. Агент закриває повторювані кроки, а рішення про кандидата та складні діалоги залишаються людині.",
    stack: ["Telegram Bot", "LLM", "вакансійний контекст", "сценарії кваліфікації", "нагадування"],
  },
  "content-factory-ai-video": {
    label: "CONTENT FACTORY · AI-ВІДЕО",
    summary: "Замість разових роликів — виробнича система: ідея, сценарій, генерація, адаптація, тест і масштабування форматів.",
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
    facts: [["9:16", "reels і shorts"], ["UGC", "нативна подача"], ["AI", "персонажі"], ["A/B", "варіації"]],
    steps: [
      ["01", "Ідея", "Фіксуємо продукт, аудиторію, гіпотезу й платформу до генерації кадрів."],
      ["02", "Сценарій", "Розкладаємо хук, демонстрацію, proof і CTA на короткий production-план."],
      ["03", "Генерація", "Створюємо відео та адаптуємо під потрібне співвідношення, мову й ринок."],
      ["04", "Масштаб", "Переможний креатив розгортається у варіації без нової знімальної зміни."],
    ],
    hard: "Швидкість не повинна знищувати впізнаваність бренду. Тому генерація працює всередині зафіксованої артдирекції, а кожен ролик проходить людський монтаж і QA.",
    stack: ["AI-video", "UGC", "AI-інфлюенсери", "монтаж", "локалізація", "creative testing"],
  },
};

export function CaseDetail() {
  const { slug } = useParams();
  const openContact = useContact();
  const item = caseItems.find((c) => c.slug === slug);
  const extra = detail[slug];

  if (!item || !extra) return <NotFound />;

  const others = caseItems.filter((c) => c.slug !== slug);

  return (
    <main>
      <section className={`chapter c-ink case-hero case-hero-${item.index}`}>
        <img className="case-hero-img" src={item.image} alt="" />
        <span className="case-hero-shade" aria-hidden="true" />
        <div className="wrap">
          <Link className="back-link" to="/cases">
            <ArrowLeft size={15} weight="bold" /> Усі кейси
          </Link>
          <Meta>{extra.label}</Meta>
          <h1 className="h-xl has-split" data-reveal>
            <SplitText text={item.title} />
          </h1>
          <p className="case-hero-summary">{extra.summary}</p>
        </div>
      </section>

      <section className="chapter c-ink-2">
        <div className="wrap case-doc">
          <div>
            <Reveal>
              <Meta>01 / КОНТЕКСТ</Meta>
              <p className="lede">{extra.task}</p>
            </Reveal>
            <Reveal delay={120}>
              <Meta style={{ marginTop: 34 }}>02 / ЩО ПОБУДУВАЛИ</Meta>
              <ul className="case-doc-list">
                {extra.build.map((line) => (
                  <li key={line}>
                    <Check size={13} weight="bold" />
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal className="case-doc-figures" delay={160}>
            <Meta>03 / ПІДТВЕРДЖЕННЯ</Meta>
            {extra.result.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
            <button className="btn btn-accent" onClick={openContact}>
              Розібрати мій процес <ArrowUpRight size={15} weight="bold" />
            </button>
          </Reveal>
        </div>
      </section>

      <section className="chapter c-paper case-evidence">
        <div className="wrap">
          <Reveal className="case-fact-strip">
            {extra.facts.map(([value, label]) => (
              <div key={label}><strong>{value}</strong><span>{label}</span></div>
            ))}
          </Reveal>
          <div className="case-system-grid">
            <Reveal className="case-system-head">
              <Meta>04 / ЛОГІКА СИСТЕМИ</Meta>
              <h2 className="h-lg">Не один workflow. Повний маршрут.</h2>
            </Reveal>
            <div className="case-system-steps">
              {extra.steps.map(([number, title, copy], index) => (
                <Reveal as="article" key={number} delay={index * 55}>
                  <span className="num">{number}</span>
                  <CircleNotch size={18} weight="regular" />
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </Reveal>
              ))}
            </div>
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
            <div className="case-stack">{extra.stack.map((item) => <span key={item}>{item}</span>)}</div>
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
