import { ArrowRight, ArrowUpRight, Clock, DownloadSimple } from "@phosphor-icons/react";
import { Link, useParams } from "react-router-dom";
import { insightArticles, insightBySlug, solutionPages } from "../content.js";
import { Meta, Reveal } from "../ui.jsx";
import { useContact } from "../layout.jsx";
import { NotFound } from "./NotFound.jsx";

const formatDate = (value) =>
  new Intl.DateTimeFormat("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00Z`));

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
  return (
    <main>
      <section className="chapter c-paper insights-head">
        <div className="wrap">
          <Reveal>
            <Meta>INSIGHTS · ПРАКТИЧНІ ГАЙДИ</Meta>
          </Reveal>
          <div className="insights-head-grid">
            <h1 className="h-xl" data-reveal>
              AI без туману. Системи, які можна перевірити.
            </h1>
            <Reveal delay={120}>
              <p className="lede">
                Гайди, порівняння й робочі інструменти для команд, які
                впроваджують AI у процеси. Власні схеми, тести й обмеження — без
                переписування документації виробників.
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
        </div>
      </section>

      <section className="chapter c-ink insights-list-section">
        <div className="wrap">
          <div className="insights-list-head">
            <Meta>ОСТАННІ МАТЕРІАЛИ</Meta>
            <Meta>{insightArticles.length} ГАЙДІВ · ОНОВЛЕНО 20.08.2026</Meta>
          </div>
          <div className="insight-grid">
            {insightArticles.map((article, index) => (
              <Reveal key={article.slug} delay={(index % 2) * 80}>
                <ArticleCard article={article} index={index} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="chapter c-paper insights-solutions">
        <div className="wrap">
          <div className="insights-solutions-head">
            <div>
              <Meta>ВІД ГАЙДУ ДО ПРОЦЕСУ</Meta>
              <h2 className="h-lg">Рішення для конкретної операції.</h2>
            </div>
            <p>Менше пошукового обсягу. Вища цінність наміру. Кожна сторінка показує flow, інтеграції, контроль і метрику запуску.</p>
          </div>
          <div className="solution-link-grid">
            {solutionPages.map((solution, index) => (
              <Link to={`/solutions/${solution.slug}`} key={solution.slug}>
                <Meta>{String(index + 1).padStart(2, "0")} · {solution.kicker}</Meta>
                <h3>{solution.title}</h3>
                <ArrowUpRight size={18} weight="bold" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="chapter c-tint insight-method">
        <div className="wrap insight-method-grid">
          <div>
            <Meta>РЕДАКЦІЙНИЙ СТАНДАРТ</Meta>
            <h2 className="h-lg">Показуємо, як перевіряли.</h2>
          </div>
          <div className="insight-method-points">
            {[
              ["01", "Власний тест", "Реальний workflow, набір документів або прототип."],
              ["02", "Чіткі межі", "Де інструмент працює, де помиляється і що перевіряє людина."],
              ["03", "Дата перевірки", "Оновлюємо матеріал після суттєвих змін продукту."],
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

  if (!article) return <NotFound />;

  const related = article.related.map((item) => insightBySlug[item]).filter(Boolean);

  return (
    <main className="article-page" style={{ "--article-accent": article.accent }}>
      <article>
        <header className="chapter c-paper article-hero">
          <div className="wrap article-hero-grid">
            <div className="article-rail" aria-hidden="true">
              <span />
              <i />
            </div>
            <div>
              <nav className="article-breadcrumb" aria-label="Навігаційний шлях">
                <Link to="/insights">Insights</Link>
                <span>/</span>
                <span>{article.category}</span>
              </nav>
              <h1>{article.title}</h1>
              <p className="article-dek">{article.dek}</p>
              <div className="article-byline">
                <span className="author-mark">AI</span>
                <div>
                  <strong>AI Insider Research</strong>
                  <span>
                    Перевірено {formatDate(article.updated)} · {article.readTime}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="article-body c-paper">
          <div className="wrap article-layout">
            <aside className="article-toc">
              <Meta>У ЦЬОМУ ГАЙДІ</Meta>
              {article.sections.map((section, index) => (
                <a href={`#${section.id}`} key={section.id}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {section.title}
                </a>
              ))}
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

              {article.comparison && (
                <div className="comparison-wrap" role="region" aria-label="Порівняння платформ" tabIndex="0">
                  <table>
                    <tbody>
                      {article.comparison.map((row, rowIndex) => (
                        <tr key={row[0]}>
                          {row.map((cell) =>
                            rowIndex === 0 ? <th key={cell}>{cell}</th> : <td key={cell}>{cell}</td>,
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {article.sections.map((section, index) => (
                <section className="article-section" id={section.id} key={section.id}>
                  <Meta>{String(index + 1).padStart(2, "0")}</Meta>
                  <h2>{section.title}</h2>
                  {section.body?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets && (
                    <ul>
                      {section.bullets.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  )}
                </section>
              ))}

              {article.slug === "n8n-ukrainskoiu" && (
                <Link className="article-asset" to="/tools/n8n-workflow-library">
                  <div>
                    <Meta>БЕЗКОШТОВНИЙ ASSET</Meta>
                    <h2>10 стартових n8n workflow</h2>
                    <p>Імпортуйте JSON, замініть blueprint nodes на власні інтеграції та додайте production-контроль.</p>
                  </div>
                  <span><DownloadSimple size={22} weight="bold" /></span>
                </Link>
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
                  Підготовлено AI Insider Research на основі практики проєктування
                  AI-систем та офіційної документації продуктів. Технічні умови й
                  тарифи змінюються — перевіряйте їх перед production-рішенням.
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
            {related.map((item, index) => <ArticleCard article={item} index={index} key={item.slug} />)}
          </div>
        </div>
      </section>
    </main>
  );
}
