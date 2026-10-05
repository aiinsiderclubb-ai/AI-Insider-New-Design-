import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { caseItems } from "./data.js";
import { insightArticles, solutionPages } from "./content.js";

export const SITE_URL = "https://www.aiinsider.it.com";
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
  "/solutions": {
    title: "AI-автоматизація за бізнес-процесом | AI Insider",
    description:
      "Рішення для CRM, рекрутингу, дзвінків, email, нерухомості та інтернет-магазинів. Сценарії, обмеження, інтеграції й критерії запуску.",
    schema: "CollectionPage",
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
    title: "n8n, AI-агенти та автоматизація: гайди українською | AI Insider",
    description:
      "Практичні гайди про n8n, AI agents, Google AI Studio, NotebookLM та автоматизацію бізнесу. Навчальні приклади, workflow і калькулятори.",
    schema: "CollectionPage",
  },
  "/tools/n8n-workflow-library": {
    title: "10 стартових n8n workflow: безкоштовні JSON | AI Insider",
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
      title: item.seoTitle || `${item.title} — кейс | AI Insider`,
      description:
        item.seoDescription ||
        `${item.title}. Результат: ${item.metric} — ${item.metricLabel}. Архітектура рішення та бізнес-ефект.`,
      schema: "Article",
      image: `${SITE_URL}${item.image}`,
      datePublished: item.published || "2026-08-21",
      dateModified: item.updated || item.published || "2026-08-21",
      video: item.video,
    },
  ]),
);

const insightMeta = Object.fromEntries(
  insightArticles.map((article) => [
    `/insights/${article.slug}`,
    {
      title: `${article.seoTitle || article.title} | AI Insider`,
      image: `${SITE_URL}/assets/editorial-insights.webp`,
      description: article.description,
      schema: "Article",
      datePublished: article.published,
      dateModified: article.updated,
      faq: article.faq,
      sources: article.sources,
    },
  ]),
);

const solutionMeta = Object.fromEntries(
  solutionPages.map((solution) => [
    `/solutions/${solution.slug}`,
    {
      title: solution.seoTitle || `${solution.title} | AI Insider`,
      description: solution.description,
      schema: "Service",
      serviceType: solution.title,
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

export function pageJsonLd(page, pathname, canonical) {
  const organizationId = `${SITE_URL}/#organization`;
  const pageId = `${canonical}#webpage`;
  const entityId = `${canonical}#entity`;
  const contentEntity = ["Article", "Service", "WebApplication"].includes(
    page.schema,
  );
  const graph = [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: "AI Insider",
      url: `${SITE_URL}/`,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.svg` },
      email: "hello@aiinsider.it.com",
      areaServed: ["UA", "CH"],
      sameAs: ["https://product-radar.com/products/ai-insider"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "AI Insider",
      inLanguage: "uk-UA",
      publisher: { "@id": organizationId },
    },
    {
      "@type": contentEntity ? "WebPage" : page.schema,
      "@id": pageId,
      url: canonical,
      name: page.title,
      description: page.description,
      inLanguage: "uk-UA",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": organizationId },
      ...(contentEntity ? { mainEntity: { "@id": entityId } } : {}),
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: page.image || DEFAULT_IMAGE,
      },
    },
  ];
  if (page.noindex)
    return { "@context": "https://schema.org", "@graph": graph };

  if (page.schema === "Article")
    graph.push({
      "@type": "Article",
      "@id": entityId,
      headline: page.title.split(" | ")[0],
      description: page.description,
      image: [page.image || DEFAULT_IMAGE],
      inLanguage: "uk-UA",
      datePublished: page.datePublished,
      dateModified: page.dateModified,
      author: {
        "@type": "Organization",
        name: "AI Insider Research",
        url: `${SITE_URL}/about`,
      },
      publisher: { "@id": organizationId },
      mainEntityOfPage: { "@id": pageId },
      citation: page.sources?.map(([, url]) => url),
    });
  if (page.schema === "Service")
    graph.push({
      "@type": "Service",
      "@id": entityId,
      name: page.serviceType || page.title.split(" | ")[0],
      serviceType: page.serviceType || page.title.split(" | ")[0],
      description: page.description,
      url: canonical,
      provider: { "@id": organizationId },
      areaServed: ["UA", "CH"],
      mainEntityOfPage: { "@id": pageId },
    });
  if (page.schema === "WebApplication")
    graph.push({
      "@type": "WebApplication",
      "@id": entityId,
      name: page.title.split(" | ")[0],
      url: canonical,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web browser",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    });
  if (page.video)
    graph.push({
      "@type": "VideoObject",
      "@id": `${canonical}#video`,
      name: page.video.name,
      description: page.video.description,
      thumbnailUrl: `${SITE_URL}${page.video.thumbnail}`,
      uploadDate: page.video.uploadDate,
      duration: page.video.duration,
      contentUrl: `${SITE_URL}${page.video.contentUrl}`,
      embedUrl: canonical,
      inLanguage: "uk-UA",
      isFamilyFriendly: true,
    });
  if (page.faq?.length)
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonical}#faq`,
      mainEntity: page.faq.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    });

  const parent = pathname.startsWith("/insights/")
    ? ["/insights", "Гайди"]
    : pathname.startsWith("/cases/")
      ? ["/cases", "Кейси"]
      : pathname.startsWith("/solutions/")
        ? ["/solutions", "Рішення"]
        : null;
  if (pathname !== "/") {
    const crumbs = [
      ["/", "Головна"],
      ...(parent ? [parent] : []),
      [pathname, page.title.split(" | ")[0]],
    ];
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map(([route, name], index) => ({
        "@type": "ListItem",
        position: index + 1,
        name,
        item: `${SITE_URL}${route}`,
      })),
    });
  }
  const collection =
    pathname === "/insights"
      ? insightArticles.map((a) => [`/insights/${a.slug}`, a.title])
      : pathname === "/solutions"
        ? solutionPages.map((a) => [`/solutions/${a.slug}`, a.title])
        : pathname === "/cases"
          ? caseItems.map((a) => [`/cases/${a.slug}`, a.title])
          : [];
  if (collection.length)
    graph.push({
      "@type": "ItemList",
      itemListElement: collection.map(([route, name], index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}${route}`,
        name,
      })),
    });
  return { "@context": "https://schema.org", "@graph": graph };
}

export function getSeoForPath(rawPathname) {
  const pathname =
    rawPathname.length > 1 ? rawPathname.replace(/\/+$/, "") : rawPathname;
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
  const canonical = `${SITE_URL}${pathname === "/" ? "" : pathname}`;

  return {
    pathname,
    meta,
    canonical,
    image: meta.image || DEFAULT_IMAGE,
    isMissing,
  };
}

export function Seo() {
  const { pathname: rawPathname } = useLocation();

  useEffect(() => {
    const { pathname, meta, canonical, image } = getSeoForPath(rawPathname);

    document.documentElement.lang = "uk";
    document.title = meta.title;
    upsertMeta('meta[name="description"]', {
      name: "description",
      content: meta.description,
    });
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: meta.noindex
        ? "noindex, follow"
        : "index, follow, max-image-preview:large",
    });
    upsertMeta('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: "AI Insider",
    });
    upsertMeta('meta[property="og:locale"]', {
      property: "og:locale",
      content: "uk_UA",
    });
    upsertMeta('meta[property="og:type"]', {
      property: "og:type",
      content: meta.schema === "Article" ? "article" : "website",
    });
    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: meta.title,
    });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: meta.description,
    });
    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: canonical,
    });
    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: image,
    });
    upsertMeta('meta[property="og:image:alt"]', {
      property: "og:image:alt",
      content: `${meta.title} — AI Insider`,
    });
    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: meta.title,
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: meta.description,
    });
    upsertMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: image,
    });
    if (meta.noindex)
      document.head.querySelector('link[rel="canonical"]')?.remove();
    else upsertLink("canonical", canonical);
    upsertMeta('meta[property="og:image:secure_url"]', {
      property: "og:image:secure_url",
      content: image,
    });
    document.head
      .querySelectorAll(
        'meta[property="og:image:width"], meta[property="og:image:height"], meta[property="og:image:type"]',
      )
      .forEach((node) => node.remove());

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
