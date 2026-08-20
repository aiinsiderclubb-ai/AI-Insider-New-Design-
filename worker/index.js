const SITE_URL = "https://www.aiinsider.it.com";

const routeSeo = {
  "/": [
    "AI-автоматизація бізнесу та AI-агенти | AI Insider",
    "AI Insider проєктує AI-агентів, автоматизацію процесів і власні AI-системи для бізнесу в Україні та Швейцарії.",
  ],
  "/services": [
    "AI-автоматизація для бізнесу: агенти та системи | AI Insider",
    "AI-агенти, автоматизація процесів, корпоративні бази знань і AI-стратегія з розрахунком бізнес-ефекту.",
  ],
  "/cases": [
    "Кейси AI-автоматизації бізнесу | AI Insider",
    "Реальні кейси AI-автоматизації: підтримка, документообіг, андеррайтинг і операційні процеси з вимірюваними результатами.",
  ],
  "/studio": [
    "AI-контент, AI-відео та UGC для брендів | AI Insider",
    "AI-інфлюенсери, відео, UGC-реклама та Content Factory для масштабованого виробництва контенту без знімальної команди.",
  ],
  "/about": [
    "Про AI Insider — AI-системи з Києва та Цюриха",
    "Команда AI Insider проєктує та впроваджує AI-системи для бізнесу: від стратегії й прототипу до інтеграції та масштабування.",
  ],
  "/contact": [
    "Обговорити AI-автоматизацію | AI Insider",
    "Опишіть бізнес-процес або задачу. За 30 хвилин визначимо найсильніший сценарій AI-автоматизації та наступний крок.",
  ],
  "/insights": [
    "Практичні AI-гайди, n8n та автоматизація | AI Insider",
    "Практичні гайди про n8n, AI agents, Google AI Studio, NotebookLM та автоматизацію бізнесу. Власні тести, workflow і калькулятори.",
  ],
  "/insights/n8n-ukrainskoiu": [
    "n8n українською: повний гайд і 10 готових workflow | AI Insider",
    "Практичний гайд з n8n українською: як працюють workflows, nodes, credentials і webhooks. Плюс 10 стартових сценаріїв для бізнесу.",
  ],
  "/insights/google-ai-studio-guide": [
    "Google AI Studio: як користуватися у 2026 році | AI Insider",
    "Google AI Studio українською: prompt, structured output, function calling, Gemini API, обмеження та сім бізнес-прототипів.",
  ],
  "/insights/notebooklm-for-business": [
    "NotebookLM для бізнесу: база знань без хаосу | AI Insider",
    "Як використовувати NotebookLM для бізнесу: підготовка джерел, права доступу, перевірка цитат і сценарії для команди.",
  ],
  "/insights/n8n-vs-make-vs-zapier": [
    "n8n vs Make vs Zapier: що обрати | AI Insider",
    "Порівняння n8n, Make і Zapier: складність, self-hosting, інтеграції, контроль даних, підтримка та модель вартості.",
  ],
  "/insights/ai-agent-what-is-it": [
    "AI agent: що це, як працює і де приносить ROI | AI Insider",
    "Що таке AI agent: модель, інструменти, пам’ять, правила й human approval. Сценарії, ризики та формула ROI.",
  ],
  "/tools/n8n-workflow-library": [
    "10 готових n8n workflow: безкоштовні JSON | AI Insider",
    "Завантажте 10 стартових n8n workflow у JSON: ліди, підтримка, документи, контент, CRM, звіти та база знань.",
  ],
  "/tools/ai-automation-calculator": [
    "Калькулятор ROI AI-автоматизації | AI Insider",
    "Розрахуйте години, місячний ефект, строк окупності та результат першого року для одного процесу автоматизації.",
  ],
  "/solutions/real-estate-automation": [
    "AI-автоматизація для агенції нерухомості | AI Insider",
    "Автоматизація лідів, підбору об’єктів, follow-up і документів для агенцій нерухомості. Архітектура процесу та інтеграції.",
  ],
  "/solutions/beauty-salon-automation": [
    "Автоматизація салону краси: менше no-show | AI Insider",
    "Нагадування, перенесення запису, повернення клієнтів і синхронізація CRM без ручних повідомлень.",
  ],
  "/solutions/saas-onboarding-ai": [
    "AI-onboarding для SaaS: від signup до activation | AI Insider",
    "AI-onboarding assistant для SaaS: сегментація, персональний маршрут, база знань, product events і передача customer success.",
  ],
  "/solutions/lead-routing-ai": [
    "AI-маршрутизація лідів: score, CRM і SLA | AI Insider",
    "Нормалізація, enrichment, deduplication, scoring, CRM assignment і контроль SLA для вхідних лідів.",
  ],
  "/solutions/n8n-hosting-switzerland": [
    "n8n hosting Switzerland: контроль даних | AI Insider",
    "n8n hosting у Швейцарії або EU: приватна мережа, secrets, backup, audit logs, monitoring і revDSG-ready архітектура.",
  ],
  "/privacy": ["Політика приватності | AI Insider", "Політика приватності сайту AI Insider."],
  "/terms": ["Умови користування | AI Insider", "Умови користування сайтом AI Insider."],
  "/cases/ai-pidtrymka-logistyka": [
    "AI-підтримка для логістики — кейс | AI Insider",
    "Кейс AI-підтримки логістичної компанії: 62% звернень закриває AI, швидша відповідь без розширення команди.",
  ],
  "/cases/anderrayting-insurtech": [
    "AI-андеррайтинг для InsurTech — кейс | AI Insider",
    "Кейс AI-андеррайтингу: оцінка заявки у 3,1 раза швидше, контрольована точність і пояснювані рішення.",
  ],
  "/cases/dokumentoobih-riteyl": [
    "Автоматизація документообігу в ритейлі — кейс | AI Insider",
    "Кейс автоматизації документообігу: на 41% нижча вартість операції та без ручного перенесення даних.",
  ],
};

const legacyRedirects = new Map([
  ["/uk", "/"],
  ["/en", "/"],
  ["/uk/contact", "/contact"],
  ["/en/contact", "/contact"],
  ["/uk/cases", "/cases"],
  ["/en/cases", "/cases"],
  ["/uk/ai-automation-for-business", "/services"],
  ["/en/ai-automation-for-business", "/services"],
  ["/uk/ai-receptionist", "/services#agents"],
  ["/en/ai-receptionist", "/services#agents"],
  ["/en/ai-voice-agents", "/services#agents"],
  ["/services/ai-voice-agent", "/services#agents"],
  ["/uk/services/ai-voice-agent", "/services#agents"],
  ["/en/services/ai-voice-agent", "/services#agents"],
  ["/ai-sdr", "/services#agents"],
  ["/uk/ai-sdr", "/services#agents"],
  ["/en/ai-sdr", "/services#agents"],
  ["/content-factory", "/studio"],
  ["/uk/content-factory", "/studio"],
  ["/en/content-factory", "/studio"],
  ["/en/ai-content-creation", "/studio"],
  ["/en/services/ai-ugc-content", "/studio"],
  ["/uk/services/ai-ugc-content", "/studio"],
  ["/en/services/ai-influencers", "/studio"],
  ["/en/services/ai-video-production", "/studio"],
  ["/uk/blog/n8n-for-content-automation", "/insights/n8n-ukrainskoiu"],
  ["/en/blog/n8n-for-content-automation", "/insights/n8n-ukrainskoiu"],
  ["/blog/n8n-for-content-automation", "/insights/n8n-ukrainskoiu"],
  ["/uk/blog/building-ai-agents-that-take-actions", "/insights/ai-agent-what-is-it"],
  ["/en/blog/building-ai-agents-that-take-actions", "/insights/ai-agent-what-is-it"],
  ["/uk/services/ai-automation-for-real-estate", "/solutions/real-estate-automation"],
  ["/en/services/ai-automation-for-real-estate", "/solutions/real-estate-automation"],
  ["/uk/ai-automation-for-saas", "/solutions/saas-onboarding-ai"],
  ["/en/ai-automation-for-saas", "/solutions/saas-onboarding-ai"],
]);

const legacyGroups = [
  [/^\/(?:uk|en)\/cases\//, "/cases"],
  [
    /^\/(?:uk|en)\/blog\/(?:ai-virtual-influencer|virtual-influencers|ai-digital-twin|ai-spokesperson|ai-generated-models|ai-influencer|ai-ugc|ai-avatar)/,
    "/studio",
  ],
  [
    /^\/(?:uk|en)\/blog\/(?:ai-proposal|how-to-automate-lead-routing|ai-onboarding|ai-search-assistant|building-ai-agents|ai-sdr|ai-cold-calling)/,
    "/services",
  ],
];

function redirectTarget(pathname) {
  const exact = legacyRedirects.get(pathname);
  if (exact) return exact;
  return legacyGroups.find(([pattern]) => pattern.test(pathname))?.[1];
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function replaceTag(html, pattern, replacement) {
  return pattern.test(html)
    ? html.replace(pattern, replacement)
    : html.replace("</head>", `${replacement}\n  </head>`);
}

function withSeo(html, pathname) {
  const [title, description] = routeSeo[pathname];
  const canonical = `${SITE_URL}${pathname === "/" ? "" : pathname}`;
  const robots = ["/privacy", "/terms"].includes(pathname)
    ? "noindex, follow"
    : "index, follow, max-image-preview:large";
  const titleText = escapeHtml(title);
  const descriptionText = escapeHtml(description);

  let result = replaceTag(html, /<title>[\s\S]*?<\/title>/i, `<title>${titleText}</title>`);
  result = replaceTag(result, /<meta\s+name=["']description["'][\s\S]*?>/i, `<meta name="description" content="${descriptionText}" />`);
  result = replaceTag(result, /<meta\s+name=["']robots["'][\s\S]*?>/i, `<meta name="robots" content="${robots}" />`);
  result = replaceTag(result, /<link\s+rel=["']canonical["'][\s\S]*?>/i, `<link rel="canonical" href="${canonical}" />`);
  result = replaceTag(result, /<meta\s+property=["']og:title["'][\s\S]*?>/i, `<meta property="og:title" content="${titleText}" />`);
  result = replaceTag(result, /<meta\s+property=["']og:description["'][\s\S]*?>/i, `<meta property="og:description" content="${descriptionText}" />`);
  result = replaceTag(result, /<meta\s+property=["']og:url["'][\s\S]*?>/i, `<meta property="og:url" content="${canonical}" />`);
  return result;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname.length > 1 ? url.pathname.replace(/\/+$/, "") : url.pathname;
    const isRead = ["GET", "HEAD"].includes(request.method);
    const acceptsHtml = request.headers.get("accept")?.includes("text/html");
    const target = isRead ? redirectTarget(pathname) : null;

    if (target) return Response.redirect(new URL(target, SITE_URL), 301);
    if (isRead && pathname !== url.pathname && routeSeo[pathname]) {
      return Response.redirect(new URL(`${pathname}${url.search}`, SITE_URL), 301);
    }

    let response = await env.ASSETS.fetch(request);

    if (!isRead || !acceptsHtml) return response;

    if (response.status === 404) {
      if (!routeSeo[pathname]) return response;
      const indexUrl = new URL(request.url);
      indexUrl.pathname = pathname === "/" ? "/index.html" : `${pathname}/index.html`;
      indexUrl.search = "";
      response = await env.ASSETS.fetch(new Request(indexUrl, request));
    }

    if (request.method === "HEAD" || response.status !== 200 || !routeSeo[pathname]) {
      return response;
    }

    const headers = new Headers(response.headers);
    headers.delete("content-length");
    headers.delete("etag");
    headers.set("content-type", "text/html; charset=utf-8");
    return new Response(withSeo(await response.text(), pathname), {
      status: response.status,
      headers,
    });
  },
};
