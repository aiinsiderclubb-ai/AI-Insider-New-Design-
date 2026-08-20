import { ArrowUpRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { Meta, Reveal } from "../ui.jsx";

export function NotFound() {
  return (
    <main>
      <section className="chapter c-ink page-head is-tall">
        <div className="wrap">
          <Reveal>
            <Meta>ПОМИЛКА 404</Meta>
          </Reveal>
          <h1 className="h-xl" data-reveal>
            Такої сторінки немає.
          </h1>
          <Reveal delay={120}>
            <p className="lede page-lede">
              Можливо, посилання застаріло. Почніть з головної або подивіться,
              що ми робимо.
            </p>
            <div className="page-actions">
              <Link className="btn btn-accent" to="/">
                На головну <ArrowUpRight size={16} weight="bold" />
              </Link>
              <Link className="btn btn-outline" to="/services">
                Послуги
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
