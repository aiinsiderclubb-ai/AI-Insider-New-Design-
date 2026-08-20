import { ArrowLeft, ArrowUpRight, Check } from "@phosphor-icons/react";
import { Link, useParams } from "react-router-dom";
import { SplitText } from "../wow.jsx";
import { Meta, Reveal } from "../ui.jsx";
import { useContact } from "../layout.jsx";
import { caseItems } from "../data.js";
import { NotFound } from "./NotFound.jsx";

const detail = {
  "ai-pidtrymka-logistyka": {
    task: "Служба підтримки логістичної групи не встигала за піками: у сезон черга зверталень росла швидше, ніж встигали відповідати оператори.",
    build: [
      "Агент читає звернення й одразу тягне статус вантажу з трьох систем",
      "Складні випадки передає людині з уже зібраним контекстом",
      "Мови: німецька, англійська, українська",
    ],
    result: [
      ["62%", "звернень закриває AI"],
      ["−41 с", "до першої відповіді"],
      ["0", "нових операторів у сезон"],
    ],
  },
  "anderrayting-insurtech": {
    task: "Оцінка складних заявок займала дні: андеррайтер збирав дані вручну з пошти, PDF і внутрішньої бази.",
    build: [
      "Модель на власних даних компанії, у їхньому контурі",
      "Витяг даних із документів і перевірка на повноту",
      "Пояснення рішення — щоб андеррайтер бачив логіку, а не вирок",
    ],
    result: [
      ["3.1×", "швидша оцінка заявки"],
      ["96%", "точність на контрольній вибірці"],
      ["1", "джерело правди замість чотирьох"],
    ],
  },
  "dokumentoobih-riteyl": {
    task: "Мережа втрачала години на ручному перенесенні даних між CRM, поштою та обліковою системою.",
    build: [
      "Наскрізний сценарій від першого сигналу до виконаної задачі",
      "Автоматичне звіряння й позначення розбіжностей",
      "Контроль якості: усе спірне йде людині",
    ],
    result: [
      ["41%", "нижча вартість операції"],
      ["3.4×", "швидший процес"],
      ["0", "ручних переносів"],
    ],
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
      <section className="chapter c-ink case-hero">
        <img className="case-hero-img" src={item.image} alt="" />
        <span className="case-hero-shade" aria-hidden="true" />
        <div className="wrap">
          <Link className="back-link" to="/cases">
            <ArrowLeft size={15} weight="bold" /> Усі кейси
          </Link>
          <Meta>{item.kicker}</Meta>
          <h1 className="h-xl has-split" data-reveal>
            <SplitText text={item.title} />
          </h1>
        </div>
      </section>

      <section className="chapter c-ink-2">
        <div className="wrap case-doc">
          <div>
            <Reveal>
              <Meta>ЗАДАЧА</Meta>
              <p className="lede">{extra.task}</p>
            </Reveal>
            <Reveal delay={120}>
              <Meta style={{ marginTop: 34 }}>ЩО ПОБУДУВАЛИ</Meta>
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
            <Meta>РЕЗУЛЬТАТ</Meta>
            {extra.result.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
            <button className="btn btn-accent" onClick={openContact}>
              Порахувати для себе <ArrowUpRight size={15} weight="bold" />
            </button>
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
