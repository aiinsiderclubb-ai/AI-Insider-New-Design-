import { useEffect, useRef, useState } from "react";

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const fine = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/* ------------------------------------------------------------- grain */

export const Grain = () => <div className="grain" aria-hidden="true" />;

/* ------------------------------------------------------------ cursor */

export function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (!fine() || reduced()) return undefined;
    document.documentElement.classList.add("has-cursor");
    const s = { x: innerWidth / 2, y: innerHeight / 2, rx: 0, ry: 0 };
    let raf = 0;

    const move = (event) => {
      s.x = event.clientX;
      s.y = event.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${s.x}px, ${s.y}px, 0)`;
      }
      const hit = event.target.closest(
        "a, button, .tile, .case, .story-lead, input, textarea",
      );
      ring.current?.classList.toggle("is-on", Boolean(hit));
    };

    const loop = () => {
      s.rx += (s.x - s.rx) * 0.17;
      s.ry += (s.y - s.ry) * 0.17;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${s.rx}px, ${s.ry}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <span className="cur-dot" ref={dot} aria-hidden="true" />
      <span className="cur-ring" ref={ring} aria-hidden="true" />
    </>
  );
}

/* ------------------------------------------------- cursor spotlight */

export function useSpotlight() {
  useEffect(() => {
    if (!fine() || reduced()) return undefined;
    const zones = [...document.querySelectorAll(".c-ink, .c-ink-2")];
    let rects = [];
    let queued = false;
    let px = 0;
    let py = 0;

    // reading layout on every pointermove thrashes; cache instead
    const measure = () => {
      rects = zones.map((zone) => zone.getBoundingClientRect());
    };

    const paint = () => {
      queued = false;
      zones.forEach((zone, i) => {
        const rect = rects[i];
        if (!rect) return;
        const inside = py > rect.top - 80 && py < rect.bottom + 80;
        zone.classList.toggle("is-lit", inside);
        if (!inside) return;
        zone.style.setProperty("--sx", `${px - rect.left}px`);
        zone.style.setProperty("--sy", `${py - rect.top}px`);
      });
    };

    const move = (event) => {
      px = event.clientX;
      py = event.clientY;
      if (queued) return;
      queued = true;
      requestAnimationFrame(paint);
    };

    const remeasure = () => {
      measure();
      if (!queued) {
        queued = true;
        requestAnimationFrame(paint);
      }
    };

    measure();
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", remeasure, { passive: true });
    window.addEventListener("resize", remeasure);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", remeasure);
      window.removeEventListener("resize", remeasure);
    };
  }, []);
}

/* --------------------------------------------------------- scramble */

const GLYPHS = "АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЮЯ01#/\\<>%*";

export function Scramble({ text, className = "", speed = 34 }) {
  const ref = useRef(null);
  const [out, setOut] = useState(text);

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced()) return undefined;
    let raf = 0;
    let done = false;

    const run = () => {
      const start = performance.now();
      const total = text.length * speed + 320;
      const tick = (now) => {
        const p = Math.min(1, (now - start) / total);
        const revealed = Math.floor(p * text.length * 1.25);
        setOut(
          text
            .split("")
            .map((ch, i) => {
              if (ch === " " || i < revealed) return ch;
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            })
            .join(""),
        );
        if (p < 1) raf = requestAnimationFrame(tick);
        else setOut(text);
      };
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || done) return;
        done = true;
        observer.disconnect();
        run();
      },
      { threshold: 0.6 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [text, speed]);

  return (
    <span ref={ref} className={`scramble ${className}`.trim()}>
      {out}
    </span>
  );
}

/* ---------------------------------------------------------- counter */

export function Counter({ value }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const node = ref.current;
    const match = String(value).match(/^([^\d]*)([\d.,]+)(.*)$/);
    if (!node || !match || reduced()) return undefined;
    const [, pre, digits, post] = match;
    const decimals = digits.includes(".") ? 1 : 0;
    const target = Number.parseFloat(digits.replace(",", "."));
    let raf = 0;
    let frame = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        const total = 56;
        const tick = () => {
          frame += 1;
          const eased = 1 - Math.pow(1 - frame / total, 3);
          setShown(`${pre}${(target * eased).toFixed(decimals)}${post}`);
          if (frame < total) raf = requestAnimationFrame(tick);
          else setShown(value);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return <span ref={ref}>{shown}</span>;
}

/* ------------------------------------------------------ neural graph */

export function NeuralGraph() {
  const canvas = useRef(null);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return undefined;
    const ctx = el.getContext("2d");
    const still = reduced();
    let raf = 0;
    let w = 0;
    let h = 0;
    let nodes = [];
    const pointer = { x: -999, y: -999 };

    const build = () => {
      const rect = el.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = rect.width;
      h = rect.height;
      el.width = w * dpr;
      el.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(72, Math.max(34, (w * h) / 5200)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: 1 + Math.random() * 1.7,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        if (!still) {
          a.x += a.vx;
          a.y += a.vy;
          if (a.x < 0 || a.x > w) a.vx *= -1;
          if (a.y < 0 || a.y > h) a.vy *= -1;
        }

        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 132) continue;
          const near =
            Math.hypot(pointer.x - a.x, pointer.y - a.y) < 130 ||
            Math.hypot(pointer.x - b.x, pointer.y - b.y) < 130;
          ctx.strokeStyle = near
            ? `rgba(79, 227, 255, ${0.5 * (1 - dist / 132)})`
            : `rgba(130, 160, 200, ${0.18 * (1 - dist / 132)})`;
          ctx.lineWidth = near ? 1 : 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      nodes.forEach((n) => {
        const d = Math.hypot(pointer.x - n.x, pointer.y - n.y);
        const hot = d < 130;
        ctx.fillStyle = hot ? "#4fe3ff" : "rgba(180, 200, 230, 0.55)";
        if (hot) {
          ctx.shadowBlur = 12;
          ctx.shadowColor = "rgba(79, 227, 255, 0.9)";
        }
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + (hot ? 0.9 : 0), 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      if (!still && visible) raf = requestAnimationFrame(draw);
    };

    let visible = true;
    const vis = new IntersectionObserver(
      (entries) => {
        const wasVisible = visible;
        visible = entries[0].isIntersecting;
        if (visible && !wasVisible && !still) {
          raf = requestAnimationFrame(draw);
        }
      },
      { threshold: 0 },
    );
    vis.observe(el);

    const onMove = (event) => {
      const rect = el.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = -999;
      pointer.y = -999;
    };

    build();
    draw();
    const resize = () => {
      build();
      if (still) draw();
    };
    window.addEventListener("resize", resize);
    el.parentElement?.addEventListener("pointermove", onMove);
    el.parentElement?.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      vis.disconnect();
      window.removeEventListener("resize", resize);
      el.parentElement?.removeEventListener("pointermove", onMove);
      el.parentElement?.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvas} aria-hidden="true" />;
}

/* ----------------------------------------------------- agent terminal */

const script = [
  { tag: "you", kind: "is-user", text: "У нас 400 заявок на тиждень вручну." },
  { tag: "sys", kind: "is-think", text: "Читаю процес · 6 кроків · 3 системи" },
  { tag: "sys", kind: "is-think", text: "Шукаю вузьке місце…" },
  {
    tag: "out",
    kind: "is-out",
    text: "Вузьке місце: ручне звіряння даних між CRM і поштою.",
  },
  { tag: "out", kind: "is-out", text: "Сценарій: агент читає заявку," },
  { tag: "out", kind: "is-out", text: "перевіряє дані, готує рішення." },
  { tag: "ok", kind: "is-ok", text: "✓ Прогноз: −41% вартості операції" },
  { tag: "ok", kind: "is-ok", text: "✓ Прототип: 2–3 тижні" },
];

export function AgentTerminal() {
  const ref = useRef(null);
  const [lines, setLines] = useState([]);
  const [typing, setTyping] = useState("");

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (reduced()) {
      setLines(script);
      return undefined;
    }

    let cancelled = false;
    const timers = [];

    const play = async () => {
      for (let i = 0; i < script.length; i += 1) {
        if (cancelled) return;
        const line = script[i];
        for (let c = 1; c <= line.text.length; c += 1) {
          if (cancelled) return;
          setTyping(line.text.slice(0, c));
          // eslint-disable-next-line no-await-in-loop
          await new Promise((resolve) => {
            timers.push(setTimeout(resolve, line.kind === "is-user" ? 26 : 13));
          });
        }
        if (cancelled) return;
        setTyping("");
        setLines((prev) => [...prev, line]);
        // eslint-disable-next-line no-await-in-loop
        await new Promise((resolve) => {
          timers.push(setTimeout(resolve, 340));
        });
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        play();
      },
      { threshold: 0.35 },
    );
    observer.observe(node);

    return () => {
      cancelled = true;
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  const current = script[lines.length];

  return (
    <div className="term" ref={ref}>
      <div className="term-bar">
        <b />
        <b />
        <b />
        <span className="meta">AI INSIDER · ДІАГНОСТИКА ПРОЦЕСУ</span>
      </div>
      <div className="term-body">
        {lines.map((line, index) => (
          <div
            className={`term-line ${line.kind}`}
            key={`${line.text}-${index}`}
          >
            <span className="tag">{line.tag}&nbsp;›</span>
            <span className="txt">{line.text}</span>
          </div>
        ))}
        {typing && current && (
          <div className={`term-line ${current.kind}`}>
            <span className="tag">{current.tag}&nbsp;›</span>
            <span className="txt">
              {typing}
              <i className="caret" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- strip */

export function Strip({ items }) {
  const row = [...items, ...items];
  return (
    <div className="strip" aria-hidden="true">
      <div className="strip-track">
        {row.map((item, index) => (
          <span key={`${item}-${index}`}>
            {item}
            <i />
          </span>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------------------------- module visuals */

function ChatVisual() {
  return (
    <div className="mv mv-chat">
      {[
        ["in", "Де моє замовлення 4471?"],
        ["out", "Знайшов. Виїхало вчора, Цюрих → Берн."],
        ["in", "Можна перенести на пʼятницю?"],
        ["out", "Готово. Курʼєр приїде 14:00–16:00."],
      ].map(([side, text], i) => (
        <span
          className={`mv-bubble mv-${side}`}
          key={text}
          style={{ animationDelay: `${i * 0.55}s` }}
        >
          {text}
        </span>
      ))}
      <span className="mv-typing" style={{ animationDelay: "2.4s" }}>
        <i />
        <i />
        <i />
      </span>
    </div>
  );
}

function FlowVisual() {
  const steps = ["Сигнал", "Дані", "Рішення", "Дія"];
  return (
    <div className="mv mv-flow">
      {steps.map((step, i) => (
        <span className="mv-node" key={step} style={{ "--i": i }}>
          <i />
          <b>{step}</b>
        </span>
      ))}
      <span className="mv-wire" aria-hidden="true">
        <i />
      </span>
    </div>
  );
}

function RoadmapVisual() {
  const rows = [
    ["Аудит", 100],
    ["Прототип", 78],
    ["Інтеграція", 46],
    ["Масштаб", 22],
  ];
  return (
    <div className="mv mv-road">
      {rows.map(([label, value], i) => (
        <span className="mv-row" key={label} style={{ "--i": i }}>
          <b>{label}</b>
          <span className="mv-bar">
            <i style={{ "--w": `${value}%` }} />
          </span>
          <em>{value}%</em>
        </span>
      ))}
    </div>
  );
}

export function ModuleVisual({ kind }) {
  if (kind === "chat") return <ChatVisual />;
  if (kind === "flow") return <FlowVisual />;
  if (kind === "roadmap") return <RoadmapVisual />;
  return (
    <div className="mv mv-graph">
      <NeuralGraph />
    </div>
  );
}

/* ------------------------------------------------------- 3D device */

export function Device({ video, poster, image, hue, children, label }) {
  const shell = useRef(null);
  const media = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [pct, setPct] = useState(0);
  const [muted, setMuted] = useState(true);

  // cursor parallax — the shell tilts, the screen stays legible
  useEffect(() => {
    const el = shell.current;
    if (!el || !fine() || reduced()) return undefined;
    const onMove = (event) => {
      const r = el.getBoundingClientRect();
      const x = (event.clientX - r.left) / r.width - 0.5;
      const y = (event.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--ry", `${x * 16}deg`);
      el.style.setProperty("--rx", `${y * -12}deg`);
      el.style.setProperty("--gx", `${(x + 0.5) * 100}%`);
    };
    const onLeave = () => {
      el.style.setProperty("--ry", "0deg");
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--gx", "50%");
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  useEffect(() => {
    const v = media.current;
    if (!v) return undefined;
    const onTime = () =>
      setPct(v.duration ? (v.currentTime / v.duration) * 100 : 0);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, [video]);

  const toggle = () => {
    const v = media.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  const toggleSound = () => {
    const v = media.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const seek = (event) => {
    const v = media.current;
    if (!v || !v.duration) return;
    const r = event.currentTarget.getBoundingClientRect();
    v.currentTime = ((event.clientX - r.left) / r.width) * v.duration;
  };

  return (
    <div className="dev-wrap" style={{ "--hue": hue }}>
      <div className="dev" ref={shell}>
        <span className="dev-shadow" aria-hidden="true" />
        <span className="dev-frame" aria-hidden="true" />
        <span className="dev-rail dev-rail-vol" aria-hidden="true" />
        <span className="dev-rail dev-rail-act" aria-hidden="true" />
        <span className="dev-rail dev-rail-pwr" aria-hidden="true" />

        <div className="dev-screen">
          {image ? (
            <img className="dev-media dev-shot" src={image} alt="" />
          ) : video ? (
            <video
              className="dev-media"
              ref={media}
              src={video}
              poster={poster}
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <span className="dev-media dev-placeholder" aria-hidden="true" />
          )}

          <span className="dev-island" aria-hidden="true" />
          {children}

          {video && (
            <div className="dev-player">
              <button
                className="dev-play"
                onClick={toggle}
                aria-label={playing ? "Пауза" : "Відтворити"}
              >
                {playing ? (
                  <span className="ic-pause">
                    <i />
                    <i />
                  </span>
                ) : (
                  <span className="ic-play" />
                )}
              </button>
              <span
                className="dev-track"
                onClick={seek}
                role="presentation"
                aria-label="Позиція відтворення"
              >
                <i style={{ width: `${pct}%` }} />
              </span>
              <button
                className="dev-sound"
                onClick={toggleSound}
                aria-label={muted ? "Увімкнути звук" : "Вимкнути звук"}
              >
                {muted ? "🔇" : "🔊"}
              </button>
            </div>
          )}

          <span className="dev-glare" aria-hidden="true" />
          <span className="dev-home" aria-hidden="true" />
        </div>
      </div>
      {label && <span className="dev-label meta">{label}</span>}
    </div>
  );
}

/* ---------------------------------------------------------- clocks */

export function Clock({ zone = "Europe/Zurich" }) {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("uk-UA", {
      timeZone: zone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 20000);
    return () => clearInterval(id);
  }, [zone]);
  return <span className="clock">{time}</span>;
}

/* ----------------------------------------------------- split reveal */

/* Words animate in one by one. Splitting on words rather than lines
   keeps it correct at any wrap point without measuring the layout. */
export function SplitText({ text, step = 32, from = 0 }) {
  const words = String(text).split(" ");
  return (
    <span className="split">
      {words.map((word, i) => (
        <span
          className="split-w"
          key={`${word}-${i}`}
          style={{ "--i": i, "--d": `${from}ms`, "--step": `${step}ms` }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------- parallax */

export function useParallax() {
  useEffect(() => {
    if (reduced()) return undefined;
    let nodes = [];
    let queued = false;

    const collect = () => {
      nodes = [...document.querySelectorAll("[data-parallax]")];
    };

    const paint = () => {
      queued = false;
      const vh = window.innerHeight;
      nodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        if (rect.bottom < -240 || rect.top > vh + 240) return;
        // -1 above the fold, 0 centred, 1 below
        const p = (rect.top + rect.height / 2 - vh / 2) / vh;
        const amount = Number.parseFloat(node.dataset.parallax) || 0.1;
        node.style.setProperty("--py", `${(-p * amount * 100).toFixed(2)}px`);
      });
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(paint);
      // rAF is throttled to nothing in hidden/background contexts — make
      // sure the offsets still land so nothing freezes mid-drift
      setTimeout(() => {
        if (queued) paint();
      }, 40);
    };

    collect();
    paint();
    const settle = setTimeout(() => {
      collect();
      paint();
    }, 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      clearTimeout(settle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
}

/* ------------------------------------------------------- reel strip */

/* Every reel stays mounted in one track; picking one slides the track
   instead of swapping the DOM, so the change reads as a scroll rather
   than a cut. Playback follows visibility — a handful of loops never
   runs against a page the visitor has left. */
export function ReelStrip({ items, active, onPick }) {
  const wrap = useRef(null);

  useEffect(() => {
    const node = wrap.current;
    if (!node) return undefined;
    const videos = () => [...node.querySelectorAll("video")];

    if (reduced()) {
      videos().forEach((v) => v.pause());
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const on = entries[0].isIntersecting;
        videos().forEach((video) => {
          if (on) video.play().catch(() => {});
          else video.pause();
        });
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [items]);

  return (
    <div className="cin-filmstrip" ref={wrap}>
      <div
        className="cin-track"
        style={{ "--active": active, "--count": items.length }}
      >
        {items.map((item, i) => {
          const on = i === active;
          return (
            <button
              className={`cin-frame${on ? " is-live" : ""}`}
              key={item.id}
              onClick={() => onPick(i)}
              aria-label={
                on
                  ? `${item.title} — зараз на екрані`
                  : `Показати: ${item.title}`
              }
              aria-current={on}
              style={{ "--row-hue": item.hue, "--slot": i }}
            >
              <span className="cin-frame-index">
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.video ? (
                <video
                  src={item.video}
                  poster={item.poster}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  tabIndex={-1}
                />
              ) : (
                /* this direction has no reel yet — a generated tile beats an
                   empty <video> that renders as a black hole */
                <span className="cin-frame-empty" aria-hidden="true" />
              )}
              <span className="cin-frame-title">{item.title}</span>
              <span className="cin-frame-go" aria-hidden="true">
                <i />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
