import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  CircleNotch,
  PaperPlaneTilt,
  WarningCircle,
  X,
} from "@phosphor-icons/react";
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

const contactIntents = [
  ["studio-demo", "Безкоштовне демо", "10–15 секунд для вашої послуги"],
  ["ai-content", "AI-контент", "Відео, UGC і Content Factory"],
  ["automation", "Автоматизація", "Процеси, інтеграції та n8n"],
  ["ai-system", "AI-система", "Агенти, знання та власні продукти"],
  ["general", "Інше", "Опишіть задачу своїми словами"],
];

const fieldError = (name, value) => {
  const text = value.trim();
  if (name === "name" && text.length < 2) {
    return "Вкажіть ім’я — мінімум 2 символи.";
  }
  if (name === "contact" && text.length < 3) {
    return "Вкажіть email, телефон або Telegram для відповіді.";
  }
  if (name === "brief" && text.length < 10) {
    return "Опишіть задачу трохи детальніше — мінімум 10 символів.";
  }
  return "";
};

export function ContactModal({ onClose, intent = "general" }) {
  const initialIntent = contactIntents.some(([value]) => value === intent)
    ? intent
    : "general";
  const [fields, setFields] = useState({
    name: "",
    contact: "",
    company: "",
    brief: "",
    intent: initialIntent,
    websiteUrl: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverError, setServerError] = useState("");
  const modalRef = useRef(null);
  const requestRef = useRef(null);

  useEffect(() => {
    const previousFocus = document.activeElement;
    document.documentElement.classList.add("is-locked");
    modalRef.current?.focus({ preventScroll: true });
    modalRef.current?.scrollTo({ top: 0 });

    const onKey = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !modalRef.current) return;

      const focusable = [
        ...modalRef.current.querySelectorAll(
          'button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]), a[href]',
        ),
      ].filter((node) => !node.hidden);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable.at(-1);

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      requestRef.current?.abort();
      document.documentElement.classList.remove("is-locked");
      window.removeEventListener("keydown", onKey);
      previousFocus?.focus?.();
    };
  }, [onClose]);

  const update = (name, value) => {
    setFields((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: "" }));
  };

  const validate = () => {
    const next = {};
    for (const name of ["name", "contact", "brief"]) {
      const message = fieldError(name, fields[name]);
      if (message) next[name] = message;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (event) => {
    event.preventDefault();
    setServerError("");
    if (!validate()) return;

    const controller = new AbortController();
    requestRef.current = controller;
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...fields, source: window.location.href }),
        signal: controller.signal,
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (result.errors) setErrors(result.errors);
        if (result.code === "rate_limited") {
          throw new Error("Забагато спроб. Спробуйте знову через 10 хвилин.");
        }
        throw new Error("Не вдалося надіслати запит.");
      }

      setStatus("success");
    } catch (error) {
      if (error.name === "AbortError") return;
      setStatus("error");
      setServerError(
        error.message || "Не вдалося надіслати запит. Спробуйте ще раз.",
      );
    } finally {
      requestRef.current = null;
    }
  };

  const isDemo = fields.intent === "studio-demo";

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-title"
      onMouseDown={onClose}
    >
      <div
        className="modal"
        ref={modalRef}
        tabIndex="-1"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Закрити">
          <X size={17} />
        </button>
        {status === "success" ? (
          <div className="modal-success">
            <span className="modal-check">
              <Check size={26} weight="bold" />
            </span>
            <Meta>ПОВІДОМЛЕННЯ ОТРИМАНО</Meta>
            <h2 className="h-md" id="contact-title">
              Запит уже в команді.
            </h2>
            <p>
              {isDemo
                ? "Переглянемо ваш бізнес і зв’яжемося, щоб узгодити демо-ролик."
                : "Відповімо протягом одного робочого дня."}
            </p>
            <button className="btn btn-accent" onClick={onClose}>
              Повернутися на сайт
            </button>
          </div>
        ) : (
          <>
            <Meta>
              {isDemo ? "БЕЗКОШТОВНЕ ДЕМО · 10–15 С" : "ПОЧАТИ РОЗМОВУ"}
            </Meta>
            <h2 className="h-md" id="contact-title">
              {isDemo
                ? "Покажіть, що потрібно перетворити на відео."
                : "Розкажіть, що має змінити AI."}
            </h2>
            <p className="modal-copy">
              {isDemo
                ? "Дайте посилання або коротко опишіть послугу. Ми повернемося з форматом демо."
                : "Опишіть процес або можливість — запропонуємо практичний наступний крок."}
            </p>

            <form onSubmit={submit} noValidate>
              <fieldset className="modal-intents">
                <legend>Що вас цікавить?</legend>
                <div>
                  {contactIntents.map(([value, label, copy]) => (
                    <label
                      key={value}
                      className={fields.intent === value ? "is-selected" : ""}
                    >
                      <input
                        type="radio"
                        name="intent"
                        value={value}
                        checked={fields.intent === value}
                        onChange={(event) => update("intent", event.target.value)}
                      />
                      <span>
                        <b>{label}</b>
                        <small>{copy}</small>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {serverError && (
                <div className="modal-alert" role="alert">
                  <WarningCircle size={18} weight="fill" />
                  <span>
                    {serverError} Напишіть нам на{" "}
                    <a href="mailto:hello@aiinsider.it.com">
                      hello@aiinsider.it.com
                    </a>
                  </span>
                </div>
              )}

              <label htmlFor="contact-name">
                <span className="modal-field-label">Ім’я</span>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  value={fields.name}
                  onChange={(event) => update("name", event.target.value)}
                  onBlur={() =>
                    setErrors((current) => ({
                      ...current,
                      name: fieldError("name", fields.name),
                    }))
                  }
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={
                    errors.name ? "contact-name-error" : undefined
                  }
                  placeholder="Ваше ім’я"
                />
                {errors.name && (
                  <small className="modal-field-error" id="contact-name-error">
                    {errors.name}
                  </small>
                )}
              </label>

              <label htmlFor="contact-channel">
                <span className="modal-field-label">
                  Email, телефон або Telegram
                </span>
                <input
                  id="contact-channel"
                  name="contact"
                  autoComplete="email"
                  value={fields.contact}
                  onChange={(event) => update("contact", event.target.value)}
                  onBlur={() =>
                    setErrors((current) => ({
                      ...current,
                      contact: fieldError("contact", fields.contact),
                    }))
                  }
                  aria-invalid={Boolean(errors.contact)}
                  aria-describedby={
                    errors.contact ? "contact-channel-error" : undefined
                  }
                  placeholder="name@company.com або @username"
                />
                {errors.contact && (
                  <small
                    className="modal-field-error"
                    id="contact-channel-error"
                  >
                    {errors.contact}
                  </small>
                )}
              </label>

              <label htmlFor="contact-company">
                <span className="modal-field-label">
                  Компанія або сайт <small>необов’язково</small>
                </span>
                <input
                  id="contact-company"
                  name="company"
                  autoComplete="organization"
                  value={fields.company}
                  onChange={(event) => update("company", event.target.value)}
                  placeholder="company.com"
                />
              </label>

              <label htmlFor="contact-brief">
                <span className="modal-field-label">
                  Що потрібно створити або покращити?
                </span>
                <textarea
                  id="contact-brief"
                  name="brief"
                  rows="4"
                  maxLength="1600"
                  value={fields.brief}
                  onChange={(event) => update("brief", event.target.value)}
                  onBlur={() =>
                    setErrors((current) => ({
                      ...current,
                      brief: fieldError("brief", fields.brief),
                    }))
                  }
                  aria-invalid={Boolean(errors.brief)}
                  aria-describedby={`contact-brief-count${
                    errors.brief ? " contact-brief-error" : ""
                  }`}
                  placeholder={
                    isDemo
                      ? "Яку послугу показати, для кого вона і де використаєте ролик?"
                      : "Коротко опишіть задачу, процес або ідею…"
                  }
                />
                <span className="modal-field-foot">
                  {errors.brief ? (
                    <small
                      className="modal-field-error"
                      id="contact-brief-error"
                    >
                      {errors.brief}
                    </small>
                  ) : (
                    <span />
                  )}
                  <small id="contact-brief-count">
                    {fields.brief.length} / 1600
                  </small>
                </span>
              </label>

              <label className="modal-honeypot" aria-hidden="true">
                Website
                <input
                  name="websiteUrl"
                  tabIndex="-1"
                  autoComplete="off"
                  value={fields.websiteUrl}
                  onChange={(event) => update("websiteUrl", event.target.value)}
                />
              </label>

              <button
                className="btn btn-accent"
                type="submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? (
                  <>
                    Надсилаємо
                    <CircleNotch
                      className="is-spinning"
                      size={17}
                      weight="bold"
                    />
                  </>
                ) : (
                  <>
                    {isDemo ? "Отримати демо" : "Надіслати запит"}
                    <PaperPlaneTilt size={16} weight="bold" />
                  </>
                )}
              </button>

              <p className="modal-privacy">
                Надсилаючи форму, ви погоджуєтеся з{" "}
                <a href="/privacy">політикою приватності</a>.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
