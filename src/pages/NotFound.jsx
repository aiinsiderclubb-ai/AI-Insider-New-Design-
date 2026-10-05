import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { Meta } from "../ui.jsx";

export function NotFound() {
  return (
    <main className="lost-page">
      <section className="lost-atlas">
        <div className="wrap lost-layout">
          <div className="lost-copy">
            <Meta>404 / МАРШРУТ НЕ ЗНАЙДЕНО</Meta>
            <h1>
              Загубили сторінку.
              <br />
              Знайдемо напрям.
            </h1>
            <p>
              Це посилання більше не веде до сторінки. Гайди, рішення та реальні
              кейси — поруч.
            </p>
            <Link className="btn btn-dark" to="/">
              <ArrowLeft size={16} weight="bold" /> Повернутися на головну
            </Link>
          </div>
          <div className="lost-map" aria-hidden="true">
            <span className="lost-number">404</span>
            <svg viewBox="0 0 600 240" fill="none">
              <path d="M20 180H145C185 180 185 65 230 65H310" />
              <path d="M355 65H420C465 65 465 180 510 180H580" />
              <circle cx="20" cy="180" r="6" />
              <circle cx="580" cy="180" r="6" />
              <circle className="lost-node" cx="333" cy="65" r="11" />
            </svg>
            <Meta>ПОСИЛАННЯ ОБІРВАЛОСЯ. ШЛЯХ ТРИВАЄ.</Meta>
          </div>
          <nav className="lost-directions" aria-label="Знайти потрібний розділ">
            {[
              [
                "/insights",
                "Практичні гайди",
                "n8n, AI-агенти, Google AI Studio",
              ],
              [
                "/services",
                "Рішення для бізнесу",
                "Процеси, інтеграції, контроль",
              ],
              ["/cases", "Реальні кейси", "Рекрутинг, операції, AI-відео"],
            ].map(([to, title, copy]) => (
              <Link to={to} key={to}>
                <div>
                  <h2>{title}</h2>
                  <p>{copy}</p>
                </div>
                <ArrowUpRight size={22} weight="bold" />
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </main>
  );
}
