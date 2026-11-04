import { useEffect, useRef } from "react";
import { Meta } from "./ui.jsx";
import { caseShowcase } from "./data.js";

/**
 * One case told through its real media: the operations photo, the
 * recruiter film poster in a phone frame or the Content Factory reel,
 * with its stage route, tool chips and three published facts on top.
 * Used by the homepage case index and by /cases.
 */
export function CaseScene({
  item,
  index,
  total,
  active = true,
  playing = active,
}) {
  const media = caseShowcase[item.slug];
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) video.play().catch(() => {});
    else video.pause();
  }, [playing]);

  return (
    <div
      className={`showcase-scene is-${media.scene}${active ? " is-active" : ""}`}
    >
      {media.scene === "phone" ? (
        <div className="showcase-phone">
          <img src={media.image} alt="" loading="lazy" />
        </div>
      ) : media.scene === "video" ? (
        <video
          className="showcase-media"
          ref={videoRef}
          src={media.video}
          poster={media.image}
          muted
          loop
          playsInline
          preload="none"
          tabIndex={-1}
        />
      ) : (
        <img
          className="showcase-media"
          src={media.image}
          alt=""
          loading="lazy"
        />
      )}
      <span className="showcase-shade" />

      <div className="showcase-top">
        <Meta>
          0{index + 1} / 0{total} · {item.kicker}
        </Meta>
        <span className="showcase-stack">
          {media.stack.map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </span>
      </div>

      <div className="showcase-bottom">
        <ol className="showcase-route">
          {media.stages.map((stage) => (
            <li key={stage}>{stage}</li>
          ))}
        </ol>
        <div className="showcase-facts">
          {media.facts.map(([value, label]) => (
            <span key={label}>
              <strong>{value}</strong>
              <Meta>{label}</Meta>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
