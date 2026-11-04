import { Clock } from "./wow.jsx";
import { Meta } from "./ui.jsx";

// Real coordinates; great-circle distance Kyiv–Zurich is about 1,640 km.
const cities = [
  {
    id: "zurich",
    name: "Цюрих",
    zone: "Europe/Zurich",
    coords: "47.37° N · 8.54° E",
    role: "Стратегія, клієнти, партнерства",
  },
  {
    id: "kyiv",
    name: "Київ",
    zone: "Europe/Kyiv",
    coords: "50.45° N · 30.52° E",
    role: "Розробка, дані, інтеграції",
  },
];

/** Two offices joined by one route, with live local time in each. */
export function CityLink() {
  return (
    <div className="city-link">
      <svg viewBox="0 0 600 260" preserveAspectRatio="none" aria-hidden="true">
        <path id="city-route" className="city-route" d="M70 200 Q 300 10 530 140" />
        <circle className="city-node" cx="70" cy="200" r="6" />
        <circle className="city-node" cx="530" cy="140" r="6" />
        <circle className="city-packet" r="4">
          <animateMotion dur="4.8s" repeatCount="indefinite" keyPoints="0;1;0" keyTimes="0;0.5;1" calcMode="linear">
            <mpath href="#city-route" />
          </animateMotion>
        </circle>
      </svg>
      <span className="city-distance">
        <Meta>≈ 1 640 КМ · ОДНА КОМАНДА</Meta>
      </span>
      {cities.map((city) => (
        <div className={`city is-${city.id}`} key={city.id}>
          <Meta>{city.coords}</Meta>
          <strong>{city.name}</strong>
          <span className="city-time">
            <Clock zone={city.zone} />
          </span>
          <p>{city.role}</p>
        </div>
      ))}
    </div>
  );
}
