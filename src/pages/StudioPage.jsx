import { ArrowUpRight, Lightning } from "@phosphor-icons/react";
import { Device, SplitText } from "../wow.jsx";
import { Meta, Reveal, SectionHead } from "../ui.jsx";
import { useContact } from "../layout.jsx";
import { studio } from "../data.js";

export function StudioPage() {
  const openContact = useContact();

  return (
    <main>
      <section className="chapter c-ink page-head">
        <div className="wrap">
          <Reveal>
            <Meta>AI-КОНТЕНТ</Meta>
          </Reveal>
          <h1 className="h-xl has-split" data-reveal>
            <SplitText text="Контент, який більше не впирається в людей." />
          </h1>
          <Reveal delay={140}>
            <p className="lede page-lede">
              Віртуальні персонажі, відео, UGC-реклама та креативи — без
              знімальної групи, дизайнерів і контентних заторів.
            </p>
            <div className="page-actions">
              <button className="btn btn-accent" onClick={openContact}>
                Обговорити контент <ArrowUpRight size={16} weight="bold" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {studio.map((item, index) => {
        const Icon = item.icon;
        return (
          <section
            className={`chapter ${index % 2 ? "c-ink-2" : "c-ink"} svc`}
            key={item.id}
            style={{ "--hue": item.hue }}
          >
            <div className="wrap svc-grid is-media">
              <div className="svc-copy">
                <Reveal className="svc-kicker">
                  <Icon size={17} weight="bold" />
                  <Meta>{item.title}</Meta>
                  <Meta className="num">
                    0{index + 1} / 0{studio.length}
                  </Meta>
                </Reveal>
                <h2 className="h-lg has-split" data-reveal>
                  <SplitText text={item.screenTitle} />
                </h2>
                <Reveal delay={120}>
                  <p>{item.screenNote}</p>
                </Reveal>
                <div className="svc-figures is-inline">
                  {item.stats.map(([label, value]) => (
                    <Reveal key={label}>
                      <strong>{value}</strong>
                      <span>{label}</span>
                    </Reveal>
                  ))}
                </div>
              </div>
              <Reveal className="svc-device" delay={140}>
                <Device
                  video={item.video}
                  poster={item.poster}
                  hue={item.hue}
                  label={item.handle}
                />
              </Reveal>
            </div>
          </section>
        );
      })}

      <section className="chapter c-ink-2">
        <div className="wrap">
          <SectionHead
            eyebrow="ОКРЕМИЙ ПРОДУКТ"
            title="Content Factory: контент виходить без вашої участі."
            copy="Система шукає ідеї, створює пости й публікує у соцмережі. Ви лише погоджуєте в Telegram."
          />
          <button className="feature" onClick={openContact}>
            <span className="feature-glow" aria-hidden="true" />
            <span className="feature-mark">
              <Lightning size={22} weight="fill" />
            </span>
            <span className="feature-main">
              <span className="feature-line">
                <b>Content Factory</b>
                <em>НОВЕ</em>
              </span>
              <span className="feature-copy">
                Ідеї, тексти, візуал і публікація — на автопілоті, з однією
                кнопкою схвалення.
              </span>
            </span>
            <span className="feature-figs">
              <span>
                <strong>500+</strong>
                <Meta>ДОПИСІВ/МІС</Meta>
              </span>
              <span>
                <strong>1</strong>
                <Meta>КНОПКА СХВАЛЕННЯ</Meta>
              </span>
            </span>
            <span className="feature-go" aria-hidden="true">
              <ArrowUpRight size={20} weight="bold" />
            </span>
          </button>
        </div>
      </section>
    </main>
  );
}
