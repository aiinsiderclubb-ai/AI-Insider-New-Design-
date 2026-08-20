import { ArrowUpRight } from "@phosphor-icons/react";
import { Clock, SplitText } from "../wow.jsx";
import { Faq, Meta, Reveal } from "../ui.jsx";
import { useContact } from "../layout.jsx";

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

export function Contact() {
  const openContact = useContact();

  return (
    <main>
      <section className="chapter c-ink page-head">
        <div className="wrap">
          <Reveal>
            <Meta>КОНТАКТИ</Meta>
          </Reveal>
          <h1 className="h-xl has-split" data-reveal>
            <SplitText text="Розкажіть про процес — покажемо, як його автоматизувати." />
          </h1>
          <Reveal delay={140}>
            <p className="lede page-lede">
              Навіть якщо поки є лише ідея. За 30 хвилин розберемо задачу й
              назвемо найсильніший перший крок.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="chapter c-ink-2">
        <div className="wrap contact-grid">
          <Reveal className="contact-card">
            <Meta>НАПИСАТИ</Meta>
            <a className="foot-mail" href="mailto:hello@aiinsider.it.com">
              hello@aiinsider.it.com
              <span className="foot-mail-go">
                <ArrowUpRight size={20} weight="bold" />
              </span>
            </a>
            <p>Відповідаємо протягом одного робочого дня.</p>
          </Reveal>
          <Reveal className="contact-clocks" delay={120}>
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
            <span className="foot-status">
              <i />
              Приймаємо проєкти
            </span>
          </Reveal>
        </div>
      </section>

      <section className="chapter c-ink">
        <div className="wrap">
          <Reveal>
            <Meta>ОБЕРІТЬ ФОРМАТ ПЕРШОГО КРОКУ</Meta>
          </Reveal>
          <div className="cta-cards" style={{ marginTop: 20 }}>
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
      </section>

      <section className="chapter c-paper">
        <div className="wrap faq-grid">
          <div>
            <Reveal>
              <Meta>ПЕРЕД ПОЧАТКОМ</Meta>
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
    </main>
  );
}
