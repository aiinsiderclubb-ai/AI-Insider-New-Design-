import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { caseItems } from "./data.js";
import { insightArticles, solutionPages } from "./content.js";

const SITE_URL = "https://www.aiinsider.it.com";
const DEFAULT_IMAGE = `${SITE_URL}/assets/journey/hero.jpg`;

const pages = {
  "/": {
    title: "AI-автоматизація бізнесу та AI-агенти | AI Insider",
    description:
      "AI Insider проєктує AI-агентів, автоматизацію процесів і власні AI-системи для бізнесу в Україні та Швейцарії.",
    schema: "WebPage",
  },
  "/services": {
    title: "AI-автоматизація для бізнесу: агенти та системи | AI Insider",
    description:
      "AI-агенти, автоматизація процесів, корпоративні бази знань і AI-стратегія з розрахунком бізнес-ефекту.",
    schema: "Service",
  },
  "/cases": {
    title: "Кейси AI-автоматизації, AI-рекрутингу та відео | AI Insider",
    description:
      "Реальні кейси AI Insider: операційна система для креативної агенції, AI-рекрутер і Content Factory для масштабного виробництва відео.",
    schema: "CollectionPage",
  },
  "/studio": {
    title: "AI-контент, AI-відео та UGC для брендів | AI Insider",
    description:
      "AI-інфлюенсери, відео, UGC-реклама та Content Factory для масштабованого виробництва контенту без знімальної команди.",
    schema: "Service",
  },
  "/about": {
    title: "Про AI Insider — AI-системи з Києва та Цюриха",
    description:
      "Команда AI Insider проєктує та впроваджує AI-системи для бізнесу: від стратегії й прототипу до інтеграції та масштабування.",
    schema: "AboutPage",
  },
  "/contact": {
    title: "Обговорити AI-автоматизацію | AI Insider",
    description:
      "Опишіть бізнес-процес або задачу. За 30 хвилин визначимо найсильніший сценарій AI-автоматизації та наступний крок.",
    schema: "ContactPage",
  },
  "/insights": {
    title: "Практичні AI-гайди, n8n та автоматизація | AI Insider",
    description:
      "Практичні гайди про n8n, AI agents, Google AI Studio, NotebookLM та автоматизацію бізнесу. Власні тести, workflow і калькулятори.",
    schema: "CollectionPage",
  },
  "/tools/n8n-workflow-library": {
    title: "10 готових n8n workflow: безкоштовні JSON | AI Insider",
    description:
      "Завантажте 10 стартових n8n workflow у JSON: ліди, підтримка, документи, контент, CRM, звіти та база знань.",
    schema: "CollectionPage",
  },
  "/tools/ai-automation-calculator": {
    title: "Калькулятор ROI AI-автоматизації | AI Insider",
    description:
      "Розрахуйте години, місячний ефект, строк окупності та результат першого року для одного процесу автоматизації.",
    schema: "WebApplication",
  },
  "/privacy": {
    title: "Політика приватності | AI Insider",
    description: "Політика приватності сайту AI Insider.",
    schema: "WebPage",
    noindex: true,
  },
  "/terms": {
    title: "Умови користування | AI Insider",
    description: "Умови користування сайтом AI Insider.",
    schema: "WebPage",
    noindex: true,
  },
};

const caseMeta = Object.fromEntries(
  caseItems.map((item) => [
    `/cases/${item.slug}`,
    {
      title: `${item.title} — кейс | AI Insider`,
      description: `${item.title}. Результат: ${item.metric} — ${item.metricLabel}. Архітектура рішення та бізнес-ефект.`,
      schema: "Article",
      image: `${SITE_URL}${item.image}`,
    },
  ]),
);

const insightMeta = Object.fromEntries(
  insightArticles.map((article) => [
    `/insights/${article.slug}`,
    {
      title: `${article.title} | AI Insider`,
      description: article.description,
      schema: "Article",
      datePublished: article.published,
      dateModified: article.updated,
      faq: article.faq,
    },
  ]),
);

const solutionMeta = Object.fromEntries(
  solutionPages.map((solution) => [
    `/solutions/${solution.slug}`,
    {
      title: `${solution.title} | AI Insider`,
      description: solution.description,
      schema: "Service",
      faq: solution.faq,
    },
  ]),
);

function upsertMeta(selector, attributes) {
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement("meta");
    document.head.appendChild(node);
  }
  Object.entries(attributes).forEach(([name, value]) =>
    node.setAttribute(name, value),
  );
}

function upsertLink(rel, href) {
  let node = document.head.querySelector(`link[rel="${rel}"]`);
  if (!node) {
    node = document.createElement("link");
    node.rel = rel;
    document.head.appendChild(node);
  }
  node.href = href;
}

function pageJsonLd(page, pathname, canonical) {
  const base = [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "AI Insider",
      url: SITE_URL,
      email: "hello@aiinsider.it.com",
      areaServed: ["UA", "CH"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "AI Insider",
      inLanguage: "uk-UA",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": page.schema,
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: page.title,
      description: page.description,
      inLanguage: "uk-UA",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      primaryImageOfPage: { "@type": "ImageObject", url: page.image || DEFAULT_IMAGE },
    },
  ];

  if (page.schema === "Article") {
    Object.assign(base[2], {
      headline: page.title.split(" | ")[0],
      datePublished: page.datePublished,
      dateModified: page.dateModified,
      author: {
        "@type": "Organization",
        name: "AI Insider Research",
        url: `${SITE_URL}/about`,
      },
      publisher: { "@id": `${SITE_URL}/#organization` },
    });
  }

  if (page.faq?.length) {
    base.push({
      "@type": "FAQPage",
      mainEntity: page.faq.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    });
  }

  if (pathname !== "/") {
    base.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Головна",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: page.title.split(" | ")[0],
          item: canonical,
        },
      ],
    });
  }

  return { "@context": "https://schema.org", "@graph": base };
}

export function Seo() {
  const { pathname: rawPathname } = useLocation();

  useEffect(() => {
    const pathname = rawPathname.length > 1 ? rawPathname.replace(/\/+$/, "") : rawPathname;
    const page =
      pages[pathname] ||
      caseMeta[pathname] ||
      insightMeta[pathname] ||
      solutionMeta[pathname];
    const isMissing = !page;
    const meta = page || {
      title: "Сторінку не знайдено | AI Insider",
      description: "Запитану сторінку не знайдено.",
      schema: "WebPage",
      noindex: true,
    };
    const canonical = `${SITE_URL}${isMissing ? pathname : pathname === "/" ? "" : pathname}`;
    const image = meta.image || DEFAULT_IMAGE;

    document.documentElement.lang = "uk";
    document.title = meta.title;
    upsertMeta('meta[name="description"]', {
      name: "description",
      content: meta.description,
    });
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: meta.noindex ? "noindex, follow" : "index, follow, max-image-preview:large",
    });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: meta.title });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: meta.description,
    });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: image });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: meta.title });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: meta.description,
    });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: image });
    upsertLink("canonical", canonical);

    let script = document.head.querySelector("#page-jsonld");
    if (!script) {
      script = document.createElement("script");
      script.id = "page-jsonld";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(pageJsonLd(meta, pathname, canonical));
  }, [rawPathname]);

  return null;
}
