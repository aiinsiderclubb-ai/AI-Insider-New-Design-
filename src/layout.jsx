import {
  Suspense,
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
  TelegramLogo,
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
import { navLinks } from "./data.js";
import { ContactModal, Meta } from "./ui.jsx";
import { getSeoForPath, Seo } from "./seo.js";

// The transparent supplied lockup is cropped by the SVG viewport, not redrawn.
// Profiles also listed as Organization.sameAs in src/seo.js
const socialLinks = [
  ["https://t.me/+FfQcOkxb2HYxNDE0", "Telegram-канал AI Insider", TelegramLogo],
  ["https://www.instagram.com/aiinsider_agency/", "Instagram AI Insider", InstagramLogo],
];

// Sitewide links to the pages people actually search for: these carry the
// internal-link weight the homepage catalogue used to give.
const footerSolutions = [
  ["/solutions/ai-inbound-call-automation", "AI-обробка дзвінків"],
  ["/solutions/crm-automation", "Автоматизація CRM"],
  ["/solutions/ai-recruiter-agency", "AI-рекрутер"],
  ["/solutions/beauty-salon-automation", "Автоматизація салону краси"],
  ["/solutions/real-estate-automation", "Автоматизація нерухомості"],
];

const footerGuides = [
  ["/insights/n8n-ukrainskoiu", "n8n українською"],
  ["/insights/n8n-kurs-ukrainskoiu", "Курс n8n"],
  ["/insights/n8n-ai-agent", "AI-агент у n8n"],
  ["/insights/google-ai-studio-guide", "Google AI Studio"],
  ["/insights/notebooklm-for-business", "NotebookLM для бізнесу"],
  ["/insights/ai-agent-what-is-it", "Що таке AI-агент"],
];

function BrandLogo({ clipId }) {
  return (
    <svg
      className="brand-logo"
      viewBox="48 173 2070 360"
      width="230"
      height="40"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="540" y="210" width="1590" height="235" />
        </clipPath>
      </defs>
      <image
        href="/assets/brand/ai-insider-logo.png"
        width="2172"
        height="724"
      />
      <image
        className="brand-logo-light-ink"
        href="/assets/brand/ai-insider-logo.png"
        width="2172"
        height="724"
        clipPath={`url(#${clipId})`}
      />
    </svg>
  );
}

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
    [
      "/services",
      "/solutions",
      "/404",
      "/cases",
      "/about",
      "/insights",
      "/studio",
    ].includes(pathname) ||
    pathname.startsWith("/cases/") ||
    getSeoForPath(pathname).isMissing;

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
    // anything already on screen is shown straight away: the first view
    // must never depend on an observer callback that may arrive late
    // (hidden tabs, previews, crawlers) or not at all
    const watch = () =>
      document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((node) => {
        const { top, bottom } = node.getBoundingClientRect();
        if (top < window.innerHeight && bottom > 0) node.classList.add("is-in");
        else observer.observe(node);
      });
    watch();
    const again = setTimeout(watch, 500);
    // pages arrive as lazy chunks, possibly after both passes above;
    // a page mounts as a direct child of .shell
    let queued = 0;
    const mutations = new MutationObserver(() => {
      if (queued) return;
      queued = window.setTimeout(() => {
        queued = 0;
        watch();
      }, 60);
    });
    const main = document.querySelector(".shell");
    if (main) mutations.observe(main, { childList: true });

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
      mutations.disconnect();
      clearTimeout(again);
      clearTimeout(queued);
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
              <BrandLogo clipId="header-brand-wordmark" />
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
        <Suspense fallback={<main className="page-loading" />}>
          <Outlet />
        </Suspense>
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
                <Link
                  className="brand"
                  to="/"
                  aria-label="AI Insider — головна"
                >
                  <BrandLogo clipId="footer-brand-wordmark" />
                </Link>
                <p>
                  Проєктуємо, будуємо та масштабуємо AI-системи з вимірюваним
                  бізнес-результатом.
                </p>
                <span className="footer-chip">
                  <i>S</i> Sweezy — наш продукт
                </span>
                <div className="footer-social">
                  {socialLinks.map(([href, label, Icon]) => (
                    <a
                      className="icon-btn"
                      href={href}
                      aria-label={label}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={href}
                    >
                      <Icon size={16} weight="fill" />
                    </a>
                  ))}
                </div>
              </div>
              <div className="footer-col">
                <Meta>ПОСЛУГИ</Meta>
                <Link to="/services">Усі послуги</Link>
                {footerSolutions.map(([to, label]) => (
                  <Link to={to} key={to}>
                    {label}
                  </Link>
                ))}
                <Link to="/solutions">Рішення за процесом</Link>
              </div>
              <div className="footer-col">
                <Meta>ГАЙДИ</Meta>
                {footerGuides.map(([to, label]) => (
                  <Link to={to} key={to}>
                    {label}
                  </Link>
                ))}
                <Link to="/insights">Усі матеріали</Link>
              </div>
              <div className="footer-col">
                <Meta>КОМПАНІЯ</Meta>
                <Link to="/cases">Кейси</Link>
                <Link to="/studio">AI-контент</Link>
                <Link to="/tools/n8n-workflow-library">n8n workflow</Link>
                <Link to="/about">Про нас</Link>
                <Link to="/contact">Контакти</Link>
                <span className="foot-status">
                  <i />
                  Київ · Цюрих · приймаємо проєкти
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
