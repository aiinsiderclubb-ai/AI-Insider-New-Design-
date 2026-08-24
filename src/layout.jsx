import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  ArrowUpRight,
  InstagramLogo,
  LinkedinLogo,
  List,
  X,
} from "@phosphor-icons/react";
import {
  AgentTerminal,
  Clock,
  Counter,
  Cursor,
  Device,
  Grain,
  ModuleVisual,
  NeuralGraph,
  Scramble,
  SplitText,
  Strip,
  useParallax,
  useSpotlight,
} from "./wow.jsx";
import { modules, navLinks } from "./data.js";
import { ContactModal, Meta } from "./ui.jsx";
import { Seo } from "./seo.js";

const ContactCtx = createContext(() => {});

export const useContact = () => useContext(ContactCtx);

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactIntent, setContactIntent] = useState("general");
  const [lang, setLang] = useState("UA");
  const [stuck, setStuck] = useState(false);
  const { pathname, hash } = useLocation();
  const lightHeader =
    ["/services", "/cases", "/about", "/insights", "/studio"].includes(
      pathname,
    ) || pathname.startsWith("/cases/");

  const openContact = useCallback((intent = "general") => {
    setMenuOpen(false);
    setContactIntent(typeof intent === "string" ? intent : "general");
    setContactOpen(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("is-locked", menuOpen);
  }, [menuOpen]);

  /* a new route starts at the top; an in-page anchor keeps its target */
  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  useSpotlight();
  useParallax();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" },
    );
    const watch = () =>
      document
        .querySelectorAll("[data-reveal]:not(.is-in)")
        .forEach((node) => observer.observe(node));
    watch();
    const again = setTimeout(watch, 500);

    const onScroll = () => {
      setStuck(window.scrollY > 20);
      const max = document.body.scrollHeight - window.innerHeight;
      root.style.setProperty(
        "--progress",
        max > 0 ? String(Math.min(1, window.scrollY / max)) : "0",
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      clearTimeout(again);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return (
    <ContactCtx.Provider value={openContact}>
      <Seo />
      <div className="shell">
        <Grain />
        <Cursor />
        <header
          className={`hdr${stuck ? " is-stuck" : ""}${lightHeader ? " is-light" : ""}`}
        >
          <div className="hdr-in">
            <Link className="brand" to="/" aria-label="AI Insider — головна">
              <span className="brand-mark" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </span>
              <span className="brand-text">
                AI Insider
                <small>AI-СИСТЕМИ ДЛЯ БІЗНЕСУ</small>
              </span>
            </Link>

            <nav className="hdr-nav" aria-label="Розділи сайту">
              {navLinks.map(([to, label], i) => (
                <Link key={to} to={to}>
                  <span className="hdr-nav-i">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {label}
                </Link>
              ))}
            </nav>

            <div className="hdr-right">
              <span className="hdr-live">
                <i />
                ZRH <Clock />
              </span>
              <div className="lang" role="group" aria-label="Мова">
                {["UA", "EN", "DE"].map((code) => (
                  <button
                    key={code}
                    className={lang === code ? "is-on" : ""}
                    onClick={() => setLang(code)}
                    aria-pressed={lang === code}
                  >
                    {code}
                  </button>
                ))}
              </div>
              <button className="btn btn-accent hdr-cta" onClick={openContact}>
                Обговорити проєкт
                <ArrowUpRight size={14} weight="bold" />
              </button>
              <button
                className="burger"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Закрити меню" : "Відкрити меню"}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X size={19} /> : <List size={19} />}
              </button>
            </div>
          </div>
          <i className="hdr-progress" aria-hidden="true" />
        </header>
        {menuOpen && (
          <nav className="menu" aria-label="Головна навігація">
            {navLinks.map(([to, label]) => (
              <Link key={to} to={to} onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
            ))}
            <button className="btn btn-accent" onClick={openContact}>
              Обговорити проєкт <ArrowUpRight size={16} weight="bold" />
            </button>
          </nav>
        )}
        <Outlet />
        <footer className="footer">
          <div className="wrap">
            <div className="foot-lead">
              <div>
                <Meta>ГОТОВІ ПОЧАТИ РОЗМОВУ</Meta>
                <a className="foot-mail" href="mailto:hello@aiinsider.it.com">
                  hello@aiinsider.it.com
                  <span className="foot-mail-go">
                    <ArrowUpRight size={22} weight="bold" />
                  </span>
                </a>
              </div>
              <div className="foot-clocks">
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
              </div>
            </div>

            <div className="footer-grid">
              <div className="footer-brand">
                <Link className="brand" to="/">
                  <span className="brand-mark" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="brand-text">AI Insider</span>
                </Link>
                <p>
                  Проєктуємо, будуємо та масштабуємо AI-системи з вимірюваним
                  бізнес-результатом.
                </p>
                <span className="footer-chip">
                  <i>S</i> Sweezy — наш продукт
                </span>
                <div className="footer-social">
                  <a className="icon-btn" href="#" aria-label="LinkedIn">
                    <LinkedinLogo size={16} weight="fill" />
                  </a>
                  <a className="icon-btn" href="#" aria-label="Instagram">
                    <InstagramLogo size={16} weight="fill" />
                  </a>
                </div>
              </div>
              <div className="footer-col">
                <Meta>ПОСЛУГИ</Meta>
                {modules.map((module) => (
                  <Link to={`/services#${module.id}`} key={module.id}>
                    {module.tab}
                  </Link>
                ))}
              </div>
              <div className="footer-col">
                <Meta>КОМПАНІЯ</Meta>
                <Link to="/cases">Кейси</Link>
                <Link to="/studio">AI-контент</Link>
                <Link to="/insights">Insights</Link>
                <Link to="/tools/n8n-workflow-library">n8n workflow</Link>
                <Link to="/about">Про нас</Link>
                <Link to="/contact">Контакти</Link>
              </div>
              <div className="footer-col">
                <Meta>ЛОКАЦІЇ</Meta>
                <span>Київ, Україна</span>
                <span>Цюрих, Швейцарія</span>
                <span className="foot-status">
                  <i />
                  Приймаємо проєкти
                </span>
              </div>
            </div>
          </div>

          <div className="foot-mark" aria-hidden="true">
            <span>AI INSIDER</span>
          </div>

          <div className="wrap">
            <div className="footer-bottom">
              <span>© 2026 AI Insider AG. Усі права захищені.</span>
              <div className="footer-links">
                <Link to="/privacy">Приватність</Link>
                <Link to="/terms">Умови</Link>
                <Link to="/about">Вихідні дані</Link>
              </div>
            </div>
          </div>
        </footer>
        {contactOpen && (
          <ContactModal
            intent={contactIntent}
            onClose={() => setContactOpen(false)}
          />
        )}{" "}
      </div>
    </ContactCtx.Provider>
  );
}
