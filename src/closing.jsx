import { ArrowUpRight } from "@phosphor-icons/react";
import { useContact } from "./layout.jsx";
import { Meta } from "./ui.jsx";

const routes = [
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
];

/**
 * The one dark close every page ends on: cyan only as light on the button
 * and a thin route line. It runs straight into the footer on the same ink.
 */
export function ClosingStep({
  id,
  eyebrow = "ГОТОВІ ПОЧАТИ",
  title = "Розкажіть про процес. Ми покажемо, як його автоматизувати.",
  lede = "Навіть якщо поки є лише ідея — за 30 хвилин розберемо задачу й назвемо найсильніший перший крок.",
  withRoutes = false,
}) {
  const openContact = useContact();

  return (
    <section className="cta-outer" id={id}>
      <div className="wrap" style={{ padding: 0 }}>
        <div className="cta-panel">
          <Meta>{eyebrow}</Meta>
          <h2 className="h-xl">{title}</h2>
          <p className="lede">{lede}</p>
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

          {withRoutes && (
            <div className="cta-inner">
              <div className="cta-inner-head">
                <Meta>ОБЕРІТЬ ФОРМАТ ПЕРШОГО КРОКУ</Meta>
                <Meta className="num">03 ВАРІАНТИ</Meta>
              </div>
              <div className="cta-cards">
                {routes.map((card) => (
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
          )}
        </div>
      </div>
    </section>
  );
}
