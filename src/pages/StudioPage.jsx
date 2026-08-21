import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Lightning,
  Pause,
  Play,
} from "@phosphor-icons/react";
import { Meta, Reveal } from "../ui.jsx";
import { useContact } from "../layout.jsx";
import { studio } from "../data.js";

const production = [
  ["01", "Ідея", "Досліджуємо бренд, аудиторію та формуємо креативну ідею."],
  ["02", "Сценарій", "Пишемо сценарій, підбираємо референси та стиль."],
  ["03", "Генерація", "Створюємо відео й адаптації під потрібні формати."],
  ["04", "Тест", "Тестуємо креативи й аналізуємо performance."],
  ["05", "Масштаб", "Масштабуємо переможні креативи на нові аудиторії."],
];

function ActiveStudioMedia({ item, playing, onPlayingChange }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || !playing) {
          video.pause();
          return;
        }
        video.play().catch(() => {});
      },
      { threshold: 0.24 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [item.id, playing]);

  if (!item.video) {
    return <img src={item.poster} alt="" />;
  }

  return (
    <video
      ref={videoRef}
      key={item.id}
      src={item.video}
      poster={item.poster}
      muted
      loop
      playsInline
      autoPlay={playing}
      preload="metadata"
      onPlay={() => onPlayingChange(true)}
      onPause={() => onPlayingChange(false)}
    />
  );
}

export function StudioPage() {
  const openContact = useContact();
  const frameRefs = useRef([]);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const current = studio[active];
  const visibleSlides = Array.from({ length: 4 }, (_, offset) => {
    const index = (active + offset) % studio.length;
    return { item: studio[index], index };
  });

  useEffect(() => {
    if (!window.matchMedia("(max-width: 720px)").matches) return;
    frameRefs.current[active]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [active]);

  const select = (index) => {
    if (index === active && studio[index].video) {
      setPlaying((value) => !value);
      return;
    }

    const activate = () => {
      setActive(index);
      setPlaying(Boolean(studio[index].video));
    };
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!document.startViewTransition || reducedMotion) {
      activate();
      return;
    }

    document.documentElement.dataset.studioMotion = "running";
    const transition = document.startViewTransition(() => {
      flushSync(activate);
    });

    transition.finished.finally(() => {
      delete document.documentElement.dataset.studioMotion;
    });
  };

  return (
    <main className="atlas-page studio-atlas-page">
      <section className="chapter c-paper atlas-hero studio-atlas-hero">
        <div className="wrap atlas-hero-grid">
          <div className="atlas-hero-copy">
            <Reveal>
              <Meta>04 / AI-КОНТЕНТ</Meta>
            </Reveal>
            <h1 className="h-xl" data-reveal>
              Студія, що працює у швидкості соцмереж.
            </h1>
            <Reveal delay={120}>
              <p className="lede">
                Створюємо AI-відео, UGC-рекламу й креативи для брендів та
                агентств. Від ідеї до готового контенту — за дні, а не тижні.
              </p>
              <div className="page-actions">
                <button className="btn btn-accent" onClick={openContact}>
                  Обговорити контент <ArrowUpRight size={16} weight="bold" />
                </button>
              </div>
            </Reveal>
          </div>

          <Reveal className="studio-proof-route" delay={100}>
            {[
              ["500+", "відео/міс", "Стабільний production під ваші задачі"],
              ["10+", "мов", "Локалізація для будь-якого ринку"],
              ["−80%", "вартість", "Ефективніше за традиційне виробництво"],
            ].map(([value, label, copy]) => (
              <span key={label}>
                <i />
                <strong>{value}</strong>
                <Meta>{label}</Meta>
                <small>{copy}</small>
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="c-paper studio-board-section">
        <div className="wrap">
          <div className="studio-contact-sheet">
            <div className="studio-film">
              <div className="studio-film-code" aria-hidden="true">
                {visibleSlides.map(({ item, index }, position) => (
                  <span key={item.id}>
                    00:00:{String((index + 1) * 4).padStart(2, "0")}
                    {position === 0 && ` · 0${active + 1}/0${studio.length}`}
                  </span>
                ))}
              </div>

              <div
                className="studio-frames"
                role="tablist"
                aria-label="Формати AI-контенту"
              >
                {visibleSlides.map(({ item, index }) => (
                  <button
                    key={item.id}
                    ref={(node) => {
                      frameRefs.current[index] = node;
                    }}
                    className={active === index ? "is-active" : ""}
                    onClick={() => select(index)}
                    role="tab"
                    aria-selected={active === index}
                    aria-controls="studio-detail"
                    aria-label={`${String(index + 1).padStart(2, "0")} · ${item.title}`}
                    style={{ viewTransitionName: `studio-${item.id}` }}
                  >
                    <span className="studio-frame-media">
                      {active === index ? (
                        <ActiveStudioMedia
                          item={item}
                          playing={playing}
                          onPlayingChange={setPlaying}
                        />
                      ) : (
                        <img src={item.poster} alt="" loading="lazy" />
                      )}
                      <span className="studio-frame-shade" />
                      {item.video && (
                        <span className="studio-frame-play" aria-hidden="true">
                          {active === index && playing ? (
                            <Pause size={15} weight="fill" />
                          ) : (
                            <Play size={15} weight="fill" />
                          )}
                        </span>
                      )}
                    </span>
                    <span className="studio-frame-meta">
                      <i className="num">
                        {String(index + 1).padStart(2, "0")}
                      </i>
                      <b>{item.title}</b>
                    </span>
                  </button>
                ))}
              </div>

              <div className="studio-film-progress" aria-hidden="true">
                <i
                  style={{
                    "--studio-progress": `${((active + 1) / studio.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div
              className="studio-detail"
              id="studio-detail"
              role="tabpanel"
              key={current.id}
              style={{ viewTransitionName: "studio-detail-panel" }}
            >
              <Meta>
                {String(active + 1).padStart(2, "0")} / {current.title}
              </Meta>
              <h2 className="h-md">{current.screenTitle}</h2>
              <p>{current.screenNote}</p>
              <div className="studio-detail-stats">
                {current.stats.map(([label, value]) => (
                  <span key={label}>
                    <strong>{value}</strong>
                    <small>{label}</small>
                  </span>
                ))}
              </div>
              <button className="btn btn-accent" onClick={openContact}>
                Обговорити проєкт <ArrowRight size={16} weight="bold" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="chapter c-paper studio-production">
        <div className="wrap">
          <Reveal>
            <Meta>05 / ВІД ІДЕЇ ДО МАСШТАБУ</Meta>
          </Reveal>
          <div className="studio-production-route">
            {production.map(([index, title, copy]) => (
              <Reveal className="studio-production-step" key={index}>
                <span className="num">{index}</span>
                <i />
                <h3>{title}</h3>
                <p>{copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="chapter c-paper-2 studio-factory-section">
        <div className="wrap">
          <button className="studio-factory" onClick={openContact}>
            <span className="studio-factory-title">
              <Meta>ОКРЕМИЙ ПРОДУКТ</Meta>
              <strong>Content Factory</strong>
              <span>
                Повний цикл контенту: від ідеї до публікації й аналітики.
              </span>
            </span>
            <span className="studio-factory-flow">
              {["Бриф", "Генерація", "Адаптація", "Публікація"].map(
                (item, index) => (
                  <span key={item}>
                    <i className="num">0{index + 1}</i>
                    {item}
                  </span>
                ),
              )}
            </span>
            <span className="studio-factory-go">
              <Lightning size={20} weight="fill" />
              Запустити Content Factory
              <ArrowUpRight size={18} weight="bold" />
            </span>
          </button>
        </div>
      </section>
    </main>
  );
}
