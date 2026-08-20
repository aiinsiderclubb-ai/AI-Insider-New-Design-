import { Meta, Reveal } from "../ui.jsx";

const docs = {
  privacy: {
    label: "ПРИВАТНІСТЬ",
    title: "Політика приватності",
    intro:
      "Ми збираємо мінімум даних, потрібних, щоб відповісти на ваш запит, і не передаємо їх третім сторонам для маркетингу.",
    blocks: [
      [
        "Які дані ми отримуємо",
        "Ім’я, робочий email і текст, який ви залишаєте у формі. Технічні дані сервера — стандартні логи запитів.",
      ],
      [
        "Навіщо",
        "Щоб відповісти на звернення та підготувати пропозицію. Іншого використання немає.",
      ],
      [
        "Скільки зберігаємо",
        "Листування — доки триває комунікація та розумний строк після неї. Ви можете попросити видалити дані у будь-який момент.",
      ],
      [
        "Ваші права",
        "Запросити копію, виправлення або видалення даних — напишіть на hello@aiinsider.it.com.",
      ],
    ],
  },
  terms: {
    label: "УМОВИ",
    title: "Умови користування",
    intro:
      "Сайт має інформаційний характер. Він описує послуги AI Insider і не є публічною офертою.",
    blocks: [
      [
        "Матеріали сайту",
        "Тексти, візуали й код належать AI Insider. Використання без письмової згоди не дозволяється.",
      ],
      [
        "Показники в кейсах",
        "Цифри відображають результати конкретних проєктів і не є гарантією такого ж ефекту в іншому контексті.",
      ],
      [
        "Співпраця",
        "Обсяг, строки та вартість робіт фіксуються окремим договором.",
      ],
    ],
  },
};

export function Legal({ kind }) {
  const doc = docs[kind];

  return (
    <main>
      <section className="chapter c-ink page-head">
        <div className="wrap">
          <Reveal>
            <Meta>{doc.label}</Meta>
          </Reveal>
          <h1 className="h-xl" data-reveal>
            {doc.title}
          </h1>
          <Reveal delay={120}>
            <p className="lede page-lede">{doc.intro}</p>
          </Reveal>
        </div>
      </section>

      <section className="chapter c-paper">
        <div className="wrap">
          <div className="legal">
            {doc.blocks.map(([title, copy], index) => (
              <Reveal className="legal-row" key={title} delay={index * 70}>
                <Meta className="num">0{index + 1}</Meta>
                <div>
                  <h2 className="h-md">{title}</h2>
                  <p>{copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
