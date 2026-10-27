import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  DownloadSimple,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { insightArticles, insightBySlug, solutionPages } from "../content.js";
import { Meta, Reveal } from "../ui.jsx";
import { useContact } from "../layout.jsx";
import { NotFound } from "./NotFound.jsx";
import { topicGroups } from "../content-practice.js";

const formatDate = (value) =>
  new Intl.DateTimeFormat("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00Z`));

/* A workflow drawn as connected nodes. `nodes` are [title, note] pairs. */
function FlowDiagram({ nodes, caption }) {
  return (
    <figure className="flow-figure">
      <ol className="flow-chain">
        {nodes.map(([title, note], index) => (
          <li key={title}>
            <span className="flow-index">{String(index + 1).padStart(2, "0")}</span>
            <strong>{title}</strong>
            {note && <small>{note}</small>}
          </li>
        ))}
      </ol>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

function SectionBlocks({ section }) {
  return (
    <>
      {section.body?.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.flow && (
        <FlowDiagram nodes={section.flow} caption={section.flowCaption} />
      )}
      {section.steps && (
        <ol className="step-list">
          {section.steps.map(([title, body], index) => (
            <li key={title}>
              <span className="step-num">{index + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </li>
          ))}
        </ol>
      )}
      {section.bullets && (
        <ul>
          {section.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {section.code && (
        <figure className="code-figure">
          <figcaption>{section.code.label}</figcaption>
          <pre>
            <code>{section.code.text}</code>
          </pre>
        </figure>
      )}
      {section.table && (
        <div
          className="comparison-wrap"
          role="region"
          tabIndex="0"
          aria-label={section.title}
        >
          <table>
            <thead>
              <tr>
                {section.table.head.map((cell) => (
                  <th key={cell}>{cell}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, index) => (
                    <td key={`${row[0]}-${index}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {section.after?.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.links && (
        <nav className="section-links" aria-label={section.title}>
          {section.links.map(([to, title, note]) => (
            <Link to={to} key={to}>
              <span>
                <strong>{title}</strong>
                {note && <small>{note}</small>}
              </span>
              <ArrowRight size={16} weight="bold" />
            </Link>
          ))}
        </nav>
      )}
      {section.callout && (
        <aside className={`callout is-${section.callout.tone || "note"}`}>
          <Meta>{section.callout.label || "ВАЖЛИВО"}</Meta>
          <p>{section.callout.text}</p>
        </aside>
      )}
    </>
  );
}

/** Highlights the table-of-contents entry for the section being read. */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join("|");
  useEffect(() => {
    const nodes = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!nodes.length || typeof IntersectionObserver === "undefined")
      return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [key]);
  return active;
}

function ArticleCard({ article, index }) {
  return (
    <Link
      className="insight-card"
      to={`/insights/${article.slug}`}
      style={{ "--article-accent": article.accent }}
    >
      <div className="insight-card-top">
        <Meta>{article.category}</Meta>
        <Meta className="num">{String(index + 1).padStart(2, "0")}</Meta>
      </div>
      <div>
        <h2>{article.shortTitle}</h2>
        <p>{article.description}</p>
      </div>
      <div className="insight-card-foot">
        <span>
          <Clock size={14} /> {article.readTime}
        </span>
        <span className="insight-arrow">
          <ArrowUpRight size={18} weight="bold" />
        </span>
      </div>
    </Link>
  );
}

export function Insights() {
  const [featured, ...articles] = insightArticles;
  const latestUpdate = insightArticles.reduce(
    (latest, article) => (article.updated > latest ? article.updated : latest),
    "",
  );

  return (
    <main className="atlas-page atlas-insights">
      <section className="chapter c-paper atlas-hero insights-atlas-hero">
        <div className="wrap atlas-hero-grid">
          <div className="atlas-hero-copy">
            <Reveal>
              <Meta>03 / INSIGHTS · ПРАКТИЧНІ ГАЙДИ</Meta>
            </Reveal>
            <h1 className="h-xl" data-reveal>
              n8n та AI-агенти. Практичні гайди українською.
            </h1>
            <Reveal delay={120}>
              <p className="lede">
                Гайди, порівняння й робочі інструменти для команд, які
                впроваджують AI у процеси.
              </p>
              <div className="insights-quicklinks">
                <Link to="/tools/n8n-workflow-library">
                  10 n8n workflow <DownloadSimple size={15} />
                </Link>
                <Link to="/tools/ai-automation-calculator">
                  Калькулятор ROI <ArrowRight size={15} />
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal className="insight-topics" delay={100}>
            {topicGroups.map((topic, index) => (
              <a key={topic.id} href={`#topic-${topic.id}`}>
                <i className="num">0{index + 1}</i>
                {topic.title}
                <b />
              </a>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="c-paper atlas-board-section">
        <div className="wrap">
          <Link className="insight-feature" to={`/insights/${featured.slug}`}>
            <img
              src="/assets/editorial-insights.webp"
              alt="Редакційне дослідження AI-систем"
            />
            <span className="insight-feature-shade" />
            <span className="insight-feature-copy">
              <Meta>
                01 / {featured.category} · {featured.readTime}
              </Meta>
              <h2 className="h-lg">{featured.title}</h2>
              <p>{featured.dek}</p>
              <span className="arrow-link">
                Читати гайд <ArrowUpRight size={18} weight="bold" />
              </span>
            </span>
            <span className="insight-standard">
              <Meta>РЕДАКЦІЙНИЙ СТАНДАРТ</Meta>
              {["Практичне завдання", "Чіткі межі", "Дата оновлення"].map(
                (item, index) => (
                  <span key={item}>
                    <i className="num">0{index + 1}</i>
                    {item}
                  </span>
                ),
              )}
            </span>
          </Link>
        </div>
      </section>

      <section className="chapter c-paper learning-paths">
        <div className="wrap">
          <Meta>ОБЕРІТЬ ТЕМУ</Meta>
          {topicGroups.map((group) => (
            <div
              className="learning-group"
              id={`topic-${group.id}`}
              key={group.id}
            >
              <div>
                <h2>{group.title}</h2>
                <p>{group.description}</p>
              </div>
              <nav aria-label={group.title}>
                {group.slugs
                  .map((slug) => insightBySlug[slug])
                  .filter(Boolean)
                  .map((article) => (
                    <Link to={`/insights/${article.slug}`} key={article.slug}>
                      {article.shortTitle}
                      <ArrowUpRight size={15} />
                    </Link>
                  ))}
              </nav>
            </div>
          ))}
        </div>
      </section>

      <section className="chapter c-paper insight-index-section">
        <div className="wrap">
          <div className="atlas-list-head">
            <Meta>04 / ОСТАННІ МАТЕРІАЛИ</Meta>
            <Meta>
              {insightArticles.length} ГАЙДІВ · ОНОВЛЕНО{" "}
              {formatDate(latestUpdate)}
            </Meta>
          </div>
          <div className="insight-index-rows">
            {articles.map((article, index) => (
              <Reveal key={article.slug}>
                <Link to={`/insights/${article.slug}`}>
                  <span className="num">0{index + 2}</span>
                  <Meta>{article.category}</Meta>
                  <div>
                    <h2>{article.shortTitle}</h2>
                    <p>{article.description}</p>
                  </div>
                  <span className="insight-read">
                    <Clock size={14} />
                    {article.readTime}
                  </span>
                  <i>
                    <ArrowUpRight size={18} weight="bold" />
                  </i>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="chapter c-paper-2 insights-solutions atlas-solutions">
        <div className="wrap">
          <div className="insights-solutions-head">
            <div>
              <Meta>05 / ВІД ГАЙДУ ДО ПРОЦЕСУ</Meta>
              <h2 className="h-lg">Рішення для конкретної операції.</h2>
            </div>
            <p>
              Знайдіть свій процес: CRM, дзвінки, підтримка чи рекрутинг.
              Перевірте сценарій, інтеграції та умови запуску.
            </p>
          </div>
          <div className="atlas-solution-rows">
            {solutionPages.map((solution, index) => (
              <Link to={`/solutions/${solution.slug}`} key={solution.slug}>
                <span className="num">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Meta>{solution.kicker}</Meta>
                <h3>{solution.title}</h3>
                <ArrowUpRight size={18} weight="bold" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="chapter c-paper insight-method atlas-insight-method">
        <div className="wrap insight-method-grid">
          <div>
            <Meta>РЕДАКЦІЙНИЙ СТАНДАРТ</Meta>
            <h2 className="h-lg">Даємо спосіб перевірити.</h2>
          </div>
          <div className="insight-method-points">
            {[
              [
                "01",
                "Практичне завдання",
                "Навчальний сценарій, вхідні дані та очікувана поведінка.",
              ],
              [
                "02",
                "Чіткі межі",
                "Де інструмент працює, де помиляється і що перевіряє людина.",
              ],
              [
                "03",
                "Дата оновлення",
                "Оновлюємо матеріал після суттєвих змін продукту.",
              ],
            ].map(([number, title, copy]) => (
              <div key={number}>
                <Meta>{number}</Meta>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export function InsightArticle() {
  const { slug } = useParams();
  const article = insightBySlug[slug];
  const openContact = useContact();
  const active = useActiveSection(
    article
      ? [
          ...article.sections.map((section) => section.id),
          ...(article.practice ? ["practice"] : []),
        ]
      : [],
  );

  if (!article) return <NotFound />;

  const related = article.related
    .map((item) => insightBySlug[item])
    .filter(Boolean);

  return (
    <main
      className="article-page"
      style={{ "--article-accent": article.accent }}
    >
      <article>
        <header className="chapter c-paper article-hero">
          <div className="wrap article-hero-grid">
            <div className="article-rail" aria-hidden="true">
              <span />
              <i />
            </div>
            <div>
              <nav
                className="article-breadcrumb"
                aria-label="Навігаційний шлях"
              >
                <Link to="/insights">Insights</Link>
                <span>/</span>
                <span>{article.category}</span>
              </nav>
              <h1>{article.title}</h1>
              <p className="article-dek">{article.dek}</p>
              <div className="article-byline">
                <span className="author-mark" aria-hidden="true" />
                <div>
                  <strong>Команда AI Insider</strong>
                  <span>Інженери автоматизації · Київ × Цюрих</span>
                </div>
              </div>
            </div>
            <aside className="article-facts" aria-label="Про матеріал">
              <Meta>ПРО МАТЕРІАЛ</Meta>
              <dl>
                <div>
                  <dt>Формат</dt>
                  <dd>{article.level || "Практичний гайд"}</dd>
                </div>
                <div>
                  <dt>Читання</dt>
                  <dd>{article.readTime}</dd>
                </div>
                <div>
                  <dt>Оновлено</dt>
                  <dd>{formatDate(article.updated)}</dd>
                </div>
                {article.build && (
                  <div>
                    <dt>Результат</dt>
                    <dd>{article.build}</dd>
                  </div>
                )}
              </dl>
            </aside>
          </div>
        </header>

        <section className="article-body c-paper">
          <div className="wrap article-layout">
            <aside className="article-toc">
              <Meta>У ЦЬОМУ ГАЙДІ</Meta>
              {article.sections.map((section, index) => (
                <a
                  href={`#${section.id}`}
                  key={section.id}
                  className={active === section.id ? "is-active" : undefined}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {section.title}
                </a>
              ))}
              {article.practice && (
                <a
                  href="#practice"
                  className={active === "practice" ? "is-active" : undefined}
                >
                  <span>↗</span>Практичне завдання
                </a>
              )}
            </aside>

            <div className="article-content">
              <section className="article-summary">
                <Meta>КОРОТКО</Meta>
                <ul>
                  {article.takeaways.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              {article.practice && (
                <section className="article-practice" id="practice">
                  <Meta>ПРАКТИЧНЕ ЗАВДАННЯ · НАВЧАЛЬНІ ДАНІ</Meta>
                  <h2>{article.practice.title}</h2>
                  <p>{article.practice.intro}</p>
                  <ol>
                    {article.practice.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                  {article.practice.sample && (
                    <pre>
                      <code>{article.practice.sample}</code>
                    </pre>
                  )}
                  <h3>Що перевірити</h3>
                  <div
                    className="comparison-wrap"
                    role="region"
                    tabIndex="0"
                    aria-label="Контрольні приклади"
                  >
                    <table>
                      <thead>
                        <tr>
                          <th>Приклад</th>
                          <th>Очікуваний результат</th>
                        </tr>
                      </thead>
                      <tbody>
                        {article.practice.checks.map(([input, expected]) => (
                          <tr key={input}>
                            <td>{input}</td>
                            <td>{expected}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="practice-limit">{article.practice.limit}</p>
                  <a
                    className="arrow-link"
                    href={`/downloads/guides/${article.slug}.md`}
                    download
                  >
                    Завантажити завдання <DownloadSimple size={18} />
                  </a>
                </section>
              )}

              {article.comparison && (
                <div
                  className="comparison-wrap"
                  role="region"
                  aria-label="Порівняння платформ"
                  tabIndex="0"
                >
                  <table>
                    <tbody>
                      {article.comparison.map((row, rowIndex) => (
                        <tr key={row[0]}>
                          {row.map((cell) =>
                            rowIndex === 0 ? (
                              <th key={cell}>{cell}</th>
                            ) : (
                              <td key={cell}>{cell}</td>
                            ),
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {article.sections.map((section, index) => (
                <section
                  className="article-section"
                  id={section.id}
                  key={section.id}
                >
                  <Meta>{String(index + 1).padStart(2, "0")}</Meta>
                  <h2>{section.title}</h2>
                  <SectionBlocks section={section} />
                </section>
              ))}

              {article.slug.startsWith("n8n") && (
                <Link
                  className="article-asset"
                  to="/tools/n8n-workflow-library"
                >
                  <div>
                    <Meta>БЕЗКОШТОВНИЙ ASSET</Meta>
                    <h2>10 стартових n8n workflow</h2>
                    <p>
                      Стартові схеми у JSON. Підключіть власні інтеграції,
                      перевірте помилки й дублікати перед запуском.
                    </p>
                  </div>
                  <span>
                    <DownloadSimple size={22} weight="bold" />
                  </span>
                </Link>
              )}

              {article.destination && (
                <Link
                  className="article-destination"
                  to={article.destination.to}
                >
                  <div>
                    <Meta>{article.destination.kicker}</Meta>
                    <h2>{article.destination.title}</h2>
                    <p>{article.destination.copy}</p>
                  </div>
                  <ArrowUpRight size={22} weight="bold" />
                </Link>
              )}

              {article.sources?.length > 0 && (
                <section
                  className="article-sources"
                  aria-labelledby="article-sources-title"
                >
                  <Meta id="article-sources-title">ОФІЦІЙНІ ДЖЕРЕЛА</Meta>
                  <ul>
                    {article.sources.map(([label, url]) => (
                      <li key={url}>
                        <a href={url} target="_blank" rel="noreferrer">
                          {label} <ArrowUpRight size={14} weight="bold" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <section className="article-faq">
                <Meta>ЧАСТІ ПИТАННЯ</Meta>
                {article.faq.map(([question, answer]) => (
                  <details key={question}>
                    <summary>{question}</summary>
                    <p>{answer}</p>
                  </details>
                ))}
              </section>

              <section className="article-review-note">
                <Meta>ЯК СТВОРЕНО МАТЕРІАЛ</Meta>
                <p>
                  {article.method ||
                    "Підготовлено командою AI Insider на основі власних впроваджень і офіційної документації продуктів. Технічні умови й тарифи змінюються — перевіряйте їх перед production-рішенням."}
                </p>
              </section>
            </div>
          </div>
        </section>
      </article>

      <section className="chapter c-ink article-related">
        <div className="wrap">
          <div className="article-related-head">
            <div>
              <Meta>ПРОДОВЖИТИ ДОСЛІДЖЕННЯ</Meta>
              <h2 className="h-lg">Пов’язані матеріали.</h2>
            </div>
            <button className="btn btn-accent" onClick={openContact}>
              Обговорити систему <ArrowUpRight size={16} weight="bold" />
            </button>
          </div>
          <div className="insight-grid is-related">
            {related.map((item, index) => (
              <ArticleCard article={item} index={index} key={item.slug} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
