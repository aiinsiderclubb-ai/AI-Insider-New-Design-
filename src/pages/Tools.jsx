import { useMemo, useState } from "react";
import { ArrowUpRight, Check, DownloadSimple, Info } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { workflowTemplates } from "../content.js";
import { Meta, Reveal } from "../ui.jsx";
import { useContact } from "../layout.jsx";

export function WorkflowLibrary() {
  const [filter, setFilter] = useState("ALL");
  const categories = ["ALL", ...new Set(workflowTemplates.map((item) => item.category))];
  const visible = filter === "ALL" ? workflowTemplates : workflowTemplates.filter((item) => item.category === filter);

  return (
    <main>
      <section className="chapter c-ink tool-hero">
        <div className="wrap tool-hero-grid">
          <div>
            <Meta>FREE TOOL · N8N LIBRARY</Meta>
            <h1 className="h-xl">10 n8n workflow для старту.</h1>
          </div>
          <div>
            <p className="lede">
              Імпортовані starter blueprints для лідів, підтримки, документів,
              контенту й операцій. Кожен JSON відкривається в n8n та показує
              логіку сценарію без чужих credentials.
            </p>
            <div className="tool-warning">
              <Info size={18} />
              Blueprint, не production-рішення. Перед запуском додайте інтеграції,
              валідацію, error handling, monitoring і власника процесу.
            </div>
          </div>
        </div>
      </section>

      <section className="chapter c-paper tool-library">
        <div className="wrap">
          <div className="tool-filter" aria-label="Фільтр workflow">
            {categories.map((category) => (
              <button
                key={category}
                className={filter === category ? "is-active" : ""}
                onClick={() => setFilter(category)}
              >
                {category === "ALL" ? "УСІ" : category}
              </button>
            ))}
          </div>
          <div className="workflow-grid">
            {visible.map((template) => (
              <article className="workflow-card" key={template.slug}>
                <div className="workflow-card-top">
                  <Meta>{template.category}</Meta>
                  <Meta>{template.index}</Meta>
                </div>
                <div>
                  <h2>{template.title}</h2>
                  <p>{template.flow}</p>
                </div>
                <a
                  href={`/downloads/ai-insider-${template.slug}.json`}
                  download={`ai-insider-${template.slug}.json`}
                >
                  Завантажити JSON <DownloadSimple size={18} weight="bold" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="chapter c-tint tool-guide">
        <div className="wrap tool-guide-grid">
          <div>
            <Meta>ПЕРЕД ІМПОРТОМ</Meta>
            <h2 className="h-lg">Три production-шари.</h2>
          </div>
          <div className="tool-steps">
            {[
              ["01", "Credentials", "Створіть окремі доступи з мінімальними правами."],
              ["02", "Failure path", "Додайте retry, alert, log і ручне відновлення."],
              ["03", "Acceptance test", "Перевірте нормальний, порожній і пошкоджений payload."],
            ].map(([number, title, copy]) => (
              <div key={number}>
                <Meta>{number}</Meta><h3>{title}</h3><p>{copy}</p>
              </div>
            ))}
          </div>
          <Link className="btn btn-dark" to="/insights/n8n-ukrainskoiu">
            Прочитати гайд <ArrowUpRight size={16} weight="bold" />
          </Link>
        </div>
      </section>
    </main>
  );
}

const money = new Intl.NumberFormat("uk-UA", { maximumFractionDigits: 0 });

export function AutomationCalculator() {
  const [hours, setHours] = useState(30);
  const [cost, setCost] = useState(550);
  const [share, setShare] = useState(60);
  const [setup, setSetup] = useState(180000);
  const [tools, setTools] = useState(6000);
  const openContact = useContact();

  const result = useMemo(() => {
    const savedHours = hours * 4.33 * (share / 100);
    const gross = savedHours * cost;
    const net = Math.max(0, gross - tools);
    return {
      savedHours,
      gross,
      net,
      payback: net > 0 ? setup / net : 0,
      annual: net * 12 - setup,
    };
  }, [hours, cost, share, setup, tools]);

  return (
    <main>
      <section className="chapter c-paper calculator-hero">
        <div className="wrap">
          <Meta>FREE TOOL · ROI MODEL</Meta>
          <div className="calculator-title-grid">
            <h1 className="h-xl">Скільки поверне автоматизація?</h1>
            <p className="lede">
              Швидка модель для одного повторюваного процесу. Результат —
              напрямок для перевірки, не фінансова гарантія.
            </p>
          </div>
        </div>
      </section>

      <section className="chapter c-ink calculator-section">
        <div className="wrap calculator-grid">
          <form className="calculator-form" onSubmit={(event) => event.preventDefault()}>
            <CalcField label="ГОДИН КОМАНДИ НА ТИЖДЕНЬ" value={hours} setValue={setHours} min={1} max={500} suffix="год" />
            <CalcField label="ВАРТІСТЬ ГОДИНИ" value={cost} setValue={setCost} min={50} max={5000} suffix="₴" />
            <CalcField label="БЕЗПЕЧНО АВТОМАТИЗУВАТИ" value={share} setValue={setShare} min={5} max={95} suffix="%" />
            <CalcField label="РАЗОВИЙ ЗАПУСК" value={setup} setValue={setSetup} min={0} max={2000000} step={5000} suffix="₴" />
            <CalcField label="ІНСТРУМЕНТИ НА МІСЯЦЬ" value={tools} setValue={setTools} min={0} max={200000} step={1000} suffix="₴" />
          </form>

          <div className="calculator-result" aria-live="polite">
            <Meta>ОРІЄНТОВНИЙ РЕЗУЛЬТАТ</Meta>
            <strong>{money.format(result.net)} ₴</strong>
            <span>чистий ефект на місяць</span>
            <div className="calculator-metrics">
              <div><Meta>ВИВІЛЬНЕНО</Meta><b>{money.format(result.savedHours)} год/міс</b></div>
              <div><Meta>ОКУПНІСТЬ</Meta><b>{result.payback ? `${result.payback.toFixed(1)} міс` : "—"}</b></div>
              <div><Meta>ЕФЕКТ РІК 1</Meta><b>{money.format(result.annual)} ₴</b></div>
            </div>
            <div className="calculator-assumptions">
              <Check size={15} /> 4,33 тижня в місяці
              <Check size={15} /> час × ставка, без прогнозу додаткового revenue
              <Check size={15} /> tools відняті щомісяця, запуск — у першому році
            </div>
            <button className="btn btn-accent" onClick={openContact}>
              Перевірити процес на даних <ArrowUpRight size={16} weight="bold" />
            </button>
          </div>
        </div>
      </section>

      <section className="chapter c-paper calculator-next">
        <div className="wrap">
          <Meta>ЩО ДАЛІ</Meta>
          <h2 className="h-lg">Не автоматизуйте поганий процес швидше.</h2>
          <p className="lede">
            Зафіксуйте baseline за чотири тижні: обсяг, час, помилки, SLA і
            винятки. Потім перевірте один вузький workflow та порівняйте факт з
            цією моделлю.
          </p>
          <Link className="btn btn-dark" to="/insights/ai-agent-what-is-it">
            Як рахувати ROI агента <ArrowUpRight size={16} weight="bold" />
          </Link>
        </div>
      </section>
    </main>
  );
}

function CalcField({ label, value, setValue, min, max, step = 1, suffix }) {
  return (
    <label className="calc-field">
      <span><Meta>{label}</Meta><b>{money.format(value)} {suffix}</b></span>
      <input
        className="calc-number"
        type="number"
        aria-label={label}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
      />
      <input
        className="calc-range"
        type="range"
        aria-label={`${label} — слайдер`}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
      />
    </label>
  );
}
