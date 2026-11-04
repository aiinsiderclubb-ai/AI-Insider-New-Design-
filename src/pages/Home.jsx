import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check } from "@phosphor-icons/react";
import { Counter, Device, ReelStrip } from "../wow.jsx";
import { Faq, Meta, Reveal, SectionHead, prefersReduced } from "../ui.jsx";
import { useContact } from "../layout.jsx";
import { ClosingStep } from "../closing.jsx";
import { CaseScene } from "../case-scene.jsx";
import {
  caseItems,
  caseShowcase,
  hero,
  manifesto,
  method,
  studio,
  sweezyScreens,
  values,
  xrayKinds,
  xrayProcesses,
} from "../data.js";

/* ========================================================== 01 — hero */

function Hero({ onContact }) {
  const trackRef = useRef(null);
  const stickRef = useRef(null);
  const videoRef = useRef(null);
  const countRef = useRef(null);
  const [stage, setStage] = useState(0);
  const [system, setSystem] = useState(false);
  // chosen after mount so the prerendered page never starts the wrong file
  const [media, setMedia] = useState(null);
  const still = typeof window !== "undefined" && prefersReduced();
  const eager =
    typeof window === "undefined" ||
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  useEffect(() => {
    const portrait = window.matchMedia("(max-aspect-ratio: 4/5)");
    const pick = () =>
      setMedia(portrait.matches ? hero.media.tall : hero.media.wide);
    pick();
    portrait.addEventListener("change", pick);
    return () => portrait.removeEventListener("change", pick);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const stick = stickRef.current;
    if (!track || !stick) return undefined;

    const apply = () => {
      const rect = track.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      if (span <= 0) return;
      const p = Math.min(1, Math.max(0, -rect.top / span));

      // per-frame values go straight to CSS; React only hears about the
      // three stage changes and the moment the proof row appears
      stick.style.setProperty("--p", p.toFixed(4));
      const fill = Math.min(1, Math.max(0, (p - 0.08) / 0.8));
      stick.style.setProperty("--fill", `${(fill * 100).toFixed(2)}%`);
      if (countRef.current) {
        countRef.current.textContent = String(Math.round(p * 100)).padStart(
          3,
          "0",
        );
      }
      setStage(p < 0.34 ? 0 : p < 0.67 ? 1 : 2);
      setSystem(p > 0.72);

      if (still) return;
      const video = videoRef.current;
      if (!video || video.readyState < 1 || !video.duration) return;

      const time = p * (video.duration - 0.04);
      // remember the newest target: a seek already in flight swallows the
      // request, so it gets flushed again the moment the decoder reports back
      video.dataset.want = String(time);
      if (!video.seeking && Math.abs(video.currentTime - time) > 0.01) {
        video.currentTime = time;
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      const run = () => {
        ticking = false;
        apply();
      };
      if (typeof requestAnimationFrame === "function") {
        requestAnimationFrame(run);
        // rAF is throttled to nothing in hidden contexts — make sure the
        // position still lands even when no frame is ever served
        setTimeout(() => {
          if (ticking) run();
        }, 32);
      } else {
        run();
      }
    };

    const onSeeked = () => {
      const video = videoRef.current;
      if (!video) return;
      const want = Number.parseFloat(video.dataset.want || "");
      if (Number.isNaN(want)) return;
      if (Math.abs(video.currentTime - want) > 0.01) {
        video.currentTime = want;
      }
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const video = videoRef.current;
    video?.addEventListener("loadedmetadata", apply);
    video?.addEventListener("seeked", onSeeked);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      video?.removeEventListener("loadedmetadata", apply);
      video?.removeEventListener("seeked", onSeeked);
    };
  }, [still]);

  return (
    <section className="hero" id="top">
      <div className="hero-track" ref={trackRef}>
        <div
          className={`hero-stick${system ? " is-system" : ""}`}
          ref={stickRef}
        >
          {still ? (
            <img
              className="hero-media"
              src={media?.poster ?? hero.poster}
              alt=""
            />
          ) : (
            <video
              className="hero-media"
              ref={videoRef}
              src={media?.video}
              poster={media?.poster ?? hero.poster}
              muted
              playsInline
              preload={eager ? "auto" : "metadata"}
              tabIndex={-1}
            />
          )}
          <span className="hero-scrim" aria-hidden="true" />

          <div className="hero-layout">
            <div className="hero-copy">
              <Meta className="hero-eyebrow">
                <i aria-hidden="true" />
                {hero.eyebrow}
              </Meta>
              <h1 className="hero-title">
                {hero.lines.map((line) => (
                  <span key={line}>{line} </span>
                ))}
                <span className="hero-promise">{hero.promise}</span>
              </h1>
              <div className="hero-under">
                <p className="hero-lede">{hero.lede}</p>
                <div className="hero-actions">
                  <button className="btn btn-accent" onClick={onContact}>
                    Обговорити систему <ArrowUpRight size={16} weight="bold" />
                  </button>
                  <Link className="btn btn-outline" to="/cases">
                    Подивитися кейси
                  </Link>
                </div>
              </div>
            </div>

            <aside className="hero-route" aria-label="Від хаосу до системи">
              <div className="hero-count">
                <Meta>Маршрут</Meta>
                <Meta>
                  <b ref={countRef}>000</b> / 100
                </Meta>
              </div>
              <ol className="hero-rail">
                {hero.stages.map(([name, copy], index) => (
                  <li
                    className={index === stage ? "is-on" : undefined}
                    key={name}
                  >
                    <Meta>
                      0{index + 1} · {name}
                    </Meta>
                    <p>{copy}</p>
                  </li>
                ))}
              </ol>
            </aside>

            <nav className="hero-proof" aria-label="Результати кейсів">
              {hero.proof.map(([value, label, to]) => (
                <Link key={to} to={to} tabIndex={system ? undefined : -1}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </Link>
              ))}
              <Link
                className="hero-proof-all"
                to="/cases"
                tabIndex={system ? undefined : -1}
              >
                Усі кейси <ArrowUpRight size={15} weight="bold" />
              </Link>
            </nav>
          </div>

          <Meta className="hero-hint">
            <i aria-hidden="true" />
            Гортайте — офіс перетвориться на систему
          </Meta>
        </div>
      </div>
    </section>
  );
}

/* ========================================== 01b — manifesto on scroll */

const clamp01 = (value) => Math.min(1, Math.max(0, value));

/** Calls `apply` once per frame while scrolling, even where rAF is starved. */
function useScrollFrame(apply, deps) {
  useEffect(() => {
    let ticking = false;
    const run = () => {
      ticking = false;
      apply();
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(run);
      setTimeout(() => ticking && run(), 32);
    };
    run();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

function Manifesto() {
  const ref = useRef(null);
  const words = manifesto.text.split(" ");

  useScrollFrame(() => {
    const section = ref.current;
    if (!section) return;
    const nodes = section.querySelectorAll(".mf-word");
    const rect = section.getBoundingClientRect();
    const span = rect.height - window.innerHeight;
    const progress =
      prefersReduced() || span <= 0 ? 1 : clamp01(-rect.top / span);
    // a little ahead of the scroll so the last words light before release
    const lit = Math.round(progress * 1.15 * nodes.length);
    nodes.forEach((node, index) =>
      node.classList.toggle("is-lit", index < lit),
    );
  }, []);

  return (
    <section className="manifesto" ref={ref} aria-label="Як ми думаємо">
      <div className="manifesto-stick">
        <div className="wrap">
          <Meta>{manifesto.eyebrow}</Meta>
          <p className="manifesto-text">
            {words.map((word, index) => (
              <span
                className={`mf-word${manifesto.keys.includes(word) ? " is-key" : ""}`}
                key={`${word}-${index}`}
              >
                {word}{" "}
              </span>
            ))}
          </p>
          <div className="manifesto-proof">
            {manifesto.proof.map(([value, label]) => (
              <span key={label}>
                <strong>{value}</strong>
                <Meta>{label}</Meta>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================= 02 — process x-ray */

const XRAY_W = 1000;
const XRAY_H = 470;

/** Node positions and connecting curves for one process, wide or narrow. */
function xrayLayout(process, narrow) {
  const count = process.nodes.length;
  const width = narrow ? 400 : XRAY_W;
  const height = narrow ? 70 + (count + (process.branch ? 1 : 0)) * 92 : XRAY_H;
  const points = process.nodes.map((_, index) =>
    narrow
      ? [index % 2 ? 250 : 150, 55 + index * 92]
      : [90 + (index * (XRAY_W - 180)) / (count - 1), index % 2 ? 230 : 190],
  );
  const nodes = process.nodes.map(([title, kind], index) => ({
    title,
    kind,
    x: points[index][0],
    y: points[index][1],
    delay: index * 0.32,
  }));
  const edges = [];
  for (let index = 0; index < count - 1; index += 1) {
    const [x1, y1] = points[index];
    const [x2, y2] = points[index + 1];
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    edges.push({
      d: narrow
        ? `M${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`
        : `M${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`,
      delay: index * 0.32 + 0.15,
      human: process.nodes[index + 1][1] === "human",
    });
  }
  if (process.branch) {
    const [bx, by] = points[process.branch.from];
    const tx = narrow ? 200 : bx + 70;
    const ty = narrow ? 55 + count * 92 : 380;
    const [title, kind] = process.branch.node;
    nodes.push({
      title,
      kind,
      x: tx,
      y: ty,
      delay: process.branch.from * 0.32 + 0.5,
    });
    edges.push({
      d: narrow
        ? `M${bx} ${by} C ${bx - 90} ${by + 120}, ${tx - 90} ${ty}, ${tx} ${ty}`
        : `M${bx} ${by + 30} C ${bx} ${ty - 20}, ${tx - 40} ${ty}, ${tx - 70} ${ty}`,
      delay: process.branch.from * 0.32 + 0.4,
      human: true,
    });
  }
  return { width, height, nodes, edges };
}

function ProcessXray() {
  const [index, setIndex] = useState(0);
  const [narrow, setNarrow] = useState(false);
  const canvasRef = useRef(null);
  const process = xrayProcesses[index];
  const layout = xrayLayout(process, narrow);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    // measure the board, not the canvas: the canvas height follows its width
    const measure = () =>
      setNarrow((canvas.parentElement?.clientWidth ?? 1000) < 700);
    measure();
    window.addEventListener("resize", measure);
    const observer =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(measure);
    if (canvas.parentElement) observer?.observe(canvas.parentElement);
    return () => {
      window.removeEventListener("resize", measure);
      observer?.disconnect();
    };
  }, []);

  return (
    <div className="xray">
      <div className="xray-picks" role="group" aria-label="Оберіть процес">
        {xrayProcesses.map((item, itemIndex) => (
          <button
            key={item.id}
            className={itemIndex === index ? "is-on" : undefined}
            aria-pressed={itemIndex === index}
            onClick={() => setIndex(itemIndex)}
          >
            <i>0{itemIndex + 1}</i>
            {item.label}
          </button>
        ))}
      </div>

      <div className="xray-board">
        <div
          className="xray-canvas"
          ref={canvasRef}
          style={{ aspectRatio: `${layout.width} / ${layout.height}` }}
        >
          {/* remounting per process restarts the drawing animation */}
          <div className="xray-scene" key={`${process.id}-${narrow}`}>
            <svg
              viewBox={`0 0 ${layout.width} ${layout.height}`}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {layout.edges.map((edge, edgeIndex) => {
                const id = `xr-${process.id}-${edgeIndex}`;
                return (
                  <g key={id}>
                    <path
                      id={id}
                      className={`xray-edge${edge.human ? " is-human" : ""}`}
                      d={edge.d}
                      style={{ "--d": `${edge.delay}s` }}
                    />
                    {!edge.human && (
                      <circle
                        className="xray-packet"
                        r="3.2"
                        style={{ "--d": `${edge.delay + 0.8}s` }}
                      >
                        <animateMotion
                          dur={`${1.6 + (edgeIndex % 3) * 0.3}s`}
                          begin={`${edge.delay + 0.8}s`}
                          repeatCount="indefinite"
                        >
                          <mpath href={`#${id}`} />
                        </animateMotion>
                      </circle>
                    )}
                  </g>
                );
              })}
            </svg>
            <ol className="xray-nodes">
              {layout.nodes.map((node) => (
                <li
                  key={node.title}
                  className={`xray-node is-${node.kind}`}
                  style={{
                    left: `${(node.x / layout.width) * 100}%`,
                    top: `${(node.y / layout.height) * 100}%`,
                    "--d": `${node.delay}s`,
                  }}
                >
                  <span className="xray-kind">{xrayKinds[node.kind]}</span>
                  <strong>{node.title}</strong>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <aside className="xray-side">
          <div>
            <Meta>РОБИТЬ СИСТЕМА</Meta>
            <ul>
              {process.system.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="is-human">
            <Meta>ЛИШАЄТЬСЯ ЛЮДИНІ</Meta>
            <ul>
              {process.human.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <Link className="btn btn-accent xray-go" to={process.link[0]}>
            {process.link[1]} <ArrowUpRight size={16} weight="bold" />
          </Link>
        </aside>
      </div>

      <div className="xray-legend">
        {Object.entries(xrayKinds).map(([kind, label]) => (
          <span key={kind} className={`is-${kind}`}>
            <i aria-hidden="true" />
            <Meta>{label}</Meta>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============================================== 03 — case index */

const SHOWCASE_DWELL = 6500;

function CaseShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef(null);
  const still = typeof window !== "undefined" && prefersReduced();

  // advance only while the board is on screen and nobody is pointing at it
  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (still || paused || !visible) return undefined;
    const timer = setTimeout(
      () => setActive((index) => (index + 1) % caseItems.length),
      SHOWCASE_DWELL,
    );
    return () => clearTimeout(timer);
  }, [active, paused, visible, still]);

  const running = !still && !paused && visible;

  return (
    <div
      className={`showcase${running ? " is-running" : ""}`}
      ref={rootRef}
      onMouseLeave={() => setPaused(false)}
    >
      <ol className="showcase-list">
        {caseItems.map((item, index) => {
          const media = caseShowcase[item.slug];
          return (
            <li
              key={item.slug}
              className={`showcase-row${index === active ? " is-active" : ""}`}
            >
              <Link
                to={`/cases/${item.slug}`}
                onMouseEnter={() => {
                  setActive(index);
                  setPaused(true);
                }}
                onFocus={() => {
                  setActive(index);
                  setPaused(true);
                }}
              >
                <span
                  className={`showcase-thumb is-${media.scene}`}
                  aria-hidden="true"
                >
                  <img src={media.image} alt="" loading="lazy" />
                </span>
                <span className="showcase-index">0{index + 1}</span>
                <span className="showcase-copy">
                  <Meta>{item.kicker}</Meta>
                  <strong className="showcase-title">{item.title}</strong>
                  <span className="showcase-detail">
                    <span className="showcase-detail-inner">
                      <span className="showcase-metric">
                        <b>{item.metric}</b>
                        <span>{item.metricLabel}</span>
                      </span>
                      <span className="showcase-open">
                        Відкрити кейс <ArrowUpRight size={15} weight="bold" />
                      </span>
                    </span>
                  </span>
                </span>
                <span className="showcase-timer" aria-hidden="true">
                  <i key={`${active}-${running}`} />
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      <div className="showcase-stage" aria-hidden="true">
        {caseItems.map((item, index) => (
          <CaseScene
            key={item.slug}
            item={item}
            index={index}
            total={caseItems.length}
            active={index === active}
            playing={visible && index === active}
          />
        ))}
      </div>
    </div>
  );
}

/* ============================================ 06 — method route */

function MethodRoute() {
  const stageRef = useRef(null);
  const liveRef = useRef(null);
  const [reached, setReached] = useState(0);

  useScrollFrame(() => {
    const stage = stageRef.current;
    const live = liveRef.current;
    if (!stage || !live) return;
    const length = live.getTotalLength();
    live.style.strokeDasharray = `${length}`;
    const rect = stage.getBoundingClientRect();
    // reserve room for whatever the last stop's copy needs below the line
    const last = stage.querySelector(".route-stop.is-3");
    if (last && getComputedStyle(last).position === "absolute") {
      const overhang = last.getBoundingClientRect().bottom - rect.bottom;
      // margins collapse with the pledges' top margin, so add the gap here
      stage.style.marginBottom = `${Math.max(0, Math.ceil(overhang)) + 88}px`;
    } else {
      stage.style.marginBottom = "";
    }
    const progress = prefersReduced()
      ? 1
      : clamp01((window.innerHeight * 0.75 - rect.top) / rect.height);
    live.style.strokeDashoffset = `${length * (1 - progress)}`;
    setReached(
      progress >= 0.95 ? 3 : progress >= 0.48 ? 2 : progress >= 0.02 ? 1 : 0,
    );
  }, []);

  const path = "M60 60 C 420 60, 300 330, 600 330 S 860 600, 1140 600";

  return (
    <div className="route-stage" ref={stageRef}>
      <svg viewBox="0 0 1200 640" preserveAspectRatio="none" aria-hidden="true">
        <path className="route-base" d={path} />
        <path className="route-live" d={path} ref={liveRef} />
      </svg>
      <ol className="route-stops">
        {method.map(([number, title, copy, when], index) => (
          <li
            key={number}
            className={`route-stop is-${index + 1}${index < reached ? " is-on" : ""}`}
          >
            <span className="route-dot" aria-hidden="true" />
            <div className="route-body">
              <span className="route-num">{number}</span>
              <h3>{title}</h3>
              <Meta>{when}</Meta>
              <p>{copy}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ==================================================== 06 — ai studio */

function Studio({ onContact }) {
  const [index, setIndex] = useState(0);
  const [rotating, setRotating] = useState(false);
  const tabRefs = useRef([]);
  const rotationTimer = useRef(0);
  const item = studio[index];
  const reelHues = ["#4fe3ff", "#8b5cff", "#2b4bff", "#a9c8ff"];
  const activeHue = reelHues[index];

  useEffect(() => () => window.clearTimeout(rotationTimer.current), []);

  const selectTab = (nextIndex, focus = true) => {
    const safeIndex = (nextIndex + studio.length) % studio.length;
    if (safeIndex === index || rotating) return;
    setIndex(safeIndex);
    setRotating(true);
    window.clearTimeout(rotationTimer.current);
    rotationTimer.current = window.setTimeout(() => setRotating(false), 680);
    if (focus) tabRefs.current[safeIndex]?.focus();
  };

  const onTabKeyDown = (event, tabIndex) => {
    if (event.key === "ArrowRight") selectTab(tabIndex + 1);
    else if (event.key === "ArrowLeft") selectTab(tabIndex - 1);
    else if (event.key === "Home") selectTab(0);
    else if (event.key === "End") selectTab(studio.length - 1);
    else return;
    event.preventDefault();
  };

  return (
    <div className="cin-studio" style={{ "--hue": activeHue }}>
      <div className="cin-intro">
        <Meta>03 / AI-КОНТЕНТ</Meta>
        <h2 className="cin-title">
          Контент, який більше не впирається в людей.
        </h2>
        <p>
          Окремий напрям: віртуальні персонажі, відео, UGC-реклама та креативи —
          без знімальної групи, дизайнерів і контентних заторів.
        </p>
      </div>

      <div className="cin-tabs" role="tablist" aria-label="Напрями AI-контенту">
        {studio.map((row, i) => {
          const Icon = row.icon;
          const on = i === index;
          return (
            <button
              ref={(node) => {
                tabRefs.current[i] = node;
              }}
              id={`studio-tab-${row.id}`}
              key={row.id}
              className={on ? "is-on" : ""}
              style={{ "--row-hue": reelHues[i] }}
              role="tab"
              aria-selected={on}
              aria-controls="studio-preview"
              tabIndex={on ? 0 : -1}
              onClick={() => selectTab(i, false)}
              onKeyDown={(event) => onTabKeyDown(event, i)}
            >
              <span className="cin-tab-icon">
                <Icon size={18} weight="bold" />
              </span>
              <span className="cin-tab-copy">
                <b>{row.title}</b>
                <small>
                  {row.metric} {row.metricLabel}
                </small>
              </span>
            </button>
          );
        })}
      </div>

      <div className="cin-actions">
        <div className="cin-buttons">
          <button className="btn btn-accent" onClick={onContact}>
            Обговорити контент <ArrowUpRight size={16} weight="bold" />
          </button>
          <Link className="btn btn-outline" to="/cases">
            Дивитися приклади <ArrowRight size={15} weight="bold" />
          </Link>
        </div>
        <div className="cin-ticks">
          {[
            ["10×", "більше контенту"],
            ["−80%", "вартість"],
            ["10+", "мов"],
          ].map(([value, label]) => (
            <span key={label}>
              <Check size={13} weight="bold" />
              <b>{value}</b>
              {label}
            </span>
          ))}
        </div>
      </div>

      <div
        className="cin-stage"
        id="studio-preview"
        role="tabpanel"
        aria-labelledby={`studio-tab-${item.id}`}
      >
        <span className="cin-ambient" aria-hidden="true" />
        <ReelStrip
          items={studio.map((reel, reelIndex) => ({
            ...reel,
            hue: reelHues[reelIndex],
          }))}
          active={index}
          onPick={(nextIndex) => selectTab(nextIndex, false)}
          locked={rotating}
        />

        <div className="cin-phone">
          <Device
            key={item.id}
            video={item.video}
            poster={item.poster}
            hue={activeHue}
            label={item.handle}
          >
            <div className="stu-screen-top">
              <span className="stu-live">
                <i />
                {item.screenKicker}
              </span>
            </div>
          </Device>
        </div>

        <div className="cin-proof" key={item.id}>
          <strong>{item.metric}</strong>
          <Meta>{item.metricLabel}</Meta>
          <p>{item.screenNote}</p>
          <i aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

/* =========================================================== the page */

export function Home() {
  const openContact = useContact();

  return (
    <main>
      <Hero onContact={openContact} />

      {/* 01b — manifesto */}
      <Manifesto />

      {/* 02 — what we build */}
      <section className="chapter c-paper" id="services">
        <div className="wrap">
          <SectionHead
            eyebrow="01 / РЕНТГЕН ПРОЦЕСУ"
            title="Оберіть процес. Подивіться, як він працює без рутини."
            copy="Кожна схема — спрощена версія того, що ми будуємо в n8n і AI-агентах. Пунктиром позначено місце, де рішення лишається за людиною."
          />
          <Reveal>
            <ProcessXray />
          </Reveal>
        </div>
      </section>

      {/* 03 — cases */}
      <section className="chapter c-paper-2 cases-section" id="work">
        <div className="wrap cases-wrap">
          <div className="cases-head">
            <div>
              <Reveal>
                <Meta>02 / ВИБРАНІ РОБОТИ</Meta>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="cases-title">
                  Системи,
                  <br className="cases-title-break" /> які вже дають
                  <br className="cases-title-break" /> результат.
                </h2>
              </Reveal>
            </div>
            <Reveal className="cases-intro" delay={120}>
              <p>
                Три системи, які працюють щодня: операції креативної агенції,
                рекрутинг у Telegram і виробництво AI-відео. Наведіть на кейс,
                щоб подивитися, як він влаштований.
              </p>
            </Reveal>
          </div>

          <Reveal delay={80}>
            <CaseShowcase />
          </Reveal>
        </div>
      </section>

      {/* 04 — ai content studio */}
      <section className="chapter c-ink stu-section" id="studio">
        <div className="wrap">
          <Studio onContact={openContact} />
        </div>
      </section>

      {/* 05 — sweezy product */}
      <section className="chapter c-tint sweezy-atlas" id="sweezy">
        <div className="atlas-coordinates" aria-hidden="true">
          <span className="atlas-longitudes">
            6°E&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;7°E&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8°E&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;9°E&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10°E
          </span>
          <span className="atlas-latitude">
            48°N
            <br />
            47°N
            <br />
            46°N
          </span>
          <span className="atlas-name">SWISS ROUTE ATLAS</span>
          <span className="atlas-place">BERN, SWITZERLAND</span>
          <span className="atlas-brand">AI INSIDER</span>
        </div>
        <div className="wrap atlas-grid">
          <div className="atlas-copy">
            <svg
              className="atlas-journey atlas-journey-desktop"
              viewBox="0 0 900 560"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M0 70V316Q0 340 24 340H650Q690 340 690 380V416Q690 442 716 442H890" />
              <circle cx="0" cy="70" r="9" />
              <circle cx="160" cy="340" r="9" />
              <circle cx="362" cy="340" r="9" />
              <circle cx="567" cy="340" r="9" />
            </svg>
            <svg
              className="atlas-journey atlas-journey-mobile"
              viewBox="0 0 350 620"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M0 52V318Q0 340 22 340H346" />
              <circle cx="0" cy="52" r="8" />
              <circle cx="76" cy="340" r="8" />
              <circle cx="185" cy="340" r="8" />
              <circle cx="294" cy="340" r="8" />
            </svg>
            <Reveal className="product-badge">
              <i>S</i>
              <b>Sweezy®</b>
              <Meta>ВЛАСНИЙ ПРОДУКТ</Meta>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="atlas-title">
                Ми не лише радимо.
                <br />
                Ми будуємо власні продукти.
              </h2>
              <p className="atlas-lede">
                Sweezy перетворює переїзд до Швейцарії на персональний маршрут.
              </p>
            </Reveal>
            <div className="atlas-stats">
              {[
                ["100+", "практичних гайдів"],
                ["26", "кантонів"],
                ["3", "мови"],
              ].map(([value, label], index) => (
                <Reveal key={label} delay={index * 80}>
                  <strong>{value}</strong>
                  <Meta>{label}</Meta>
                </Reveal>
              ))}
            </div>
            <Reveal className="product-actions atlas-actions" delay={160}>
              <a
                className="btn btn-dark"
                href="https://www.sweezy.world/uk"
                target="_blank"
                rel="noreferrer"
              >
                Відкрити Sweezy <ArrowUpRight size={16} weight="bold" />
              </a>
              <button className="btn btn-outline" onClick={openContact}>
                Хочу такий продукт
              </button>
            </Reveal>
          </div>
          <Reveal className="atlas-showcase" delay={120}>
            <div className="atlas-phones">
              {sweezyScreens.map((item, i) => (
                <div
                  className={`atlas-phone atlas-phone-${item.id}`}
                  key={item.id}
                  style={{ "--i": i }}
                >
                  <Device image={item.src} hue="#4fe3ff" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 06 — how we work */}
      <section className="chapter c-paper" id="method">
        <div className="wrap">
          <SectionHead
            eyebrow="04 / ЯК МИ ПРАЦЮЄМО"
            title="Три кроки. Далі система працює на вас."
          />
          <MethodRoute />
          <ul className="pledges" aria-label="Наші гарантії">
            {values.map((item, index) => (
              <Reveal as="li" key={item.index} delay={index * 70}>
                <Meta>{item.label}</Meta>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 07 — faq */}
      <section className="chapter c-paper" id="faq">
        <div className="wrap faq-grid">
          <div>
            <Reveal>
              <Meta>05 / ПЕРЕД ПОЧАТКОМ</Meta>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="h-lg" style={{ marginTop: 14 }}>
                Корисні відповіді. Без дрібного шрифту.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <Link className="faq-more" to="/solutions">
                Рішення за процесами <ArrowRight size={16} weight="bold" />
              </Link>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <Faq />
          </Reveal>
        </div>
      </section>

      {/* 08 — closing step */}
      <ClosingStep id="contact" withRoutes />
    </main>
  );
}
