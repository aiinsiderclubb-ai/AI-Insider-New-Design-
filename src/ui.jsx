import { useEffect, useState } from "react";
import { ArrowUpRight, Check, PaperPlaneTilt, X } from "@phosphor-icons/react";
import { SplitText } from "./wow.jsx";
import { faqItems } from "./data.js";

/* ============================================================= helpers */

export const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const Meta = ({ children, className = "" }) => (
  <span className={`meta ${className}`.trim()}>{children}</span>
);

export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
}) {
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

export function SectionHead({ eyebrow, title, copy, wide = false }) {
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

/* =========================================================== 10 — faq */

export function Faq() {
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

export function ContactModal({ onClose }) {
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
