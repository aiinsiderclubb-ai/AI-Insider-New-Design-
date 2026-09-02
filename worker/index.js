import { handleContactRequest } from "./contact.js";

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
    "Кейси AI-автоматизації, AI-рекрутингу та відео | AI Insider",
    "Реальні кейси AI Insider: операційна система для креативної агенції, AI-рекрутер і Content Factory для масштабного виробництва відео.",
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
    "Gemini Notebook (NotebookLM) для бізнесу: гайд | AI Insider",
    "Як використовувати Gemini Notebook, раніше NotebookLM, для бізнесу: джерела, цитати, доступи, обмеження й робочі сценарії.",
  ],
  "/insights/n8n-vs-make-vs-zapier": [
    "n8n vs Make vs Zapier: що обрати | AI Insider",
    "Порівняння n8n, Make і Zapier: складність, self-hosting, інтеграції, контроль даних, підтримка та модель вартості.",
  ],
  "/insights/ai-agent-what-is-it": [
    "AI agent: що це, як працює і де приносить ROI | AI Insider",
    "Що таке AI agent: модель, інструменти, пам’ять, правила й human approval. Сценарії, ризики та формула ROI.",
  ],
  "/insights/google-workspace-studio-ukrainskoiu": [
    "Google Workspace Studio українською: автоматизація без коду | AI Insider",
    "Що таке Google Workspace Studio, як збирати flows у Gmail, Drive і Chat, де потрібен контроль людини та чим сервіс відрізняється від AI Studio.",
  ],
  "/insights/n8n-mcp-server": [
    "n8n MCP Server: як керувати workflow через AI | AI Insider",
    "Як підключити офіційний n8n MCP Server до AI-клієнта, безпечно створювати й оновлювати workflow та не відкрити production credentials.",
  ],
  "/insights/n8n-docker-self-hosted": [
    "n8n у Docker: self-hosted гайд для production | AI Insider",
    "Практичний запуск n8n у Docker: Postgres, reverse proxy, secrets, backups, queue mode, оновлення та production-чекліст.",
  ],
  "/insights/n8n-telegram-bot": [
    "n8n Telegram bot: заявки, команди й AI-відповіді | AI Insider",
    "Як побудувати Telegram-бота в n8n: webhook, валідація, маршрутизація, AI-відповіді, логування та захист від дублів.",
  ],
  "/insights/n8n-google-sheets": [
    "n8n та Google Sheets: автоматизація без дублів | AI Insider",
    "Як інтегрувати n8n з Google Sheets: читання, upsert, дедуплікація, pagination, rate limits і перехід від таблиці до бази даних.",
  ],
  "/insights/n8n-webhook": [
    "n8n Webhook: production-гайд з безпеки й відповіді | AI Insider",
    "Як налаштувати n8n Webhook: test і production URL, auth, валідація payload, швидка відповідь, retry та idempotency.",
  ],
  "/insights/n8n-error-handling": [
    "n8n error handling: retry, alerts і відновлення workflow | AI Insider",
    "Production error handling у n8n: Error Trigger, retry, dead-letter flow, alerts, idempotency й контроль часткових помилок.",
  ],
  "/insights/n8n-ai-agent": [
    "n8n AI Agent: інструменти, пам’ять і human approval | AI Insider",
    "Як побудувати AI Agent у n8n: tools, memory, structured output, human approval, permissions, evaluation та контроль вартості.",
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
  "/privacy": [
    "Політика приватності | AI Insider",
    "Політика приватності сайту AI Insider.",
  ],
  "/terms": [
    "Умови користування | AI Insider",
    "Умови користування сайтом AI Insider.",
  ],
  "/cases/operatsiina-systema-kreatyvnoi-ahentsii": [
    "Конвеєр замість таблиць — кейс автоматизації | AI Insider",
    "Як креативна агенція об’єднала ClickUp, n8n і фінмодель: 539 задач під контролем, нуль втрат при переносі та звіт за 45 секунд.",
  ],
  "/cases/ai-rekruter-dlia-ahentsii": [
    "AI-рекрутер для агенції — кейс | AI Insider",
    "Telegram AI-рекрутер для вакансій, кваліфікації кандидатів, outbound-пошуку та контролю тестового завдання.",
  ],
  "/cases/content-factory-ai-video": [
    "Content Factory та AI-відео — кейс | AI Insider",
    "Система виробництва AI-відео, UGC і performance-креативів: до 500+ відео на місяць і локалізація 10+ мовами.",
  ],
};

const legacyRedirects = new Map([
  ["/uk", "/"],
  ["/en", "/"],
  ["/uk/contact", "/contact"],
  ["/en/contact", "/contact"],
  ["/uk/cases", "/cases"],
  ["/en/cases", "/cases"],
  [
    "/cases/ai-pidtrymka-logistyka",
    "/cases/operatsiina-systema-kreatyvnoi-ahentsii",
  ],
  ["/cases/anderrayting-insurtech", "/cases/ai-rekruter-dlia-ahentsii"],
  ["/cases/dokumentoobih-riteyl", "/cases/content-factory-ai-video"],
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
  [
    "/uk/blog/building-ai-agents-that-take-actions",
    "/insights/ai-agent-what-is-it",
  ],
  [
    "/en/blog/building-ai-agents-that-take-actions",
    "/insights/ai-agent-what-is-it",
  ],
  [
    "/uk/services/ai-automation-for-real-estate",
    "/solutions/real-estate-automation",
  ],
  [
    "/en/services/ai-automation-for-real-estate",
    "/solutions/real-estate-automation",
  ],
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

  let result = replaceTag(
    html,
    /<title>[\s\S]*?<\/title>/i,
    `<title>${titleText}</title>`,
  );
  result = replaceTag(
    result,
    /<meta\s+name=["']description["'][\s\S]*?>/i,
    `<meta name="description" content="${descriptionText}" />`,
  );
  result = replaceTag(
    result,
    /<meta\s+name=["']robots["'][\s\S]*?>/i,
    `<meta name="robots" content="${robots}" />`,
  );
  result = replaceTag(
    result,
    /<link\s+rel=["']canonical["'][\s\S]*?>/i,
    `<link rel="canonical" href="${canonical}" />`,
  );
  result = replaceTag(
    result,
    /<meta\s+property=["']og:title["'][\s\S]*?>/i,
    `<meta property="og:title" content="${titleText}" />`,
  );
  result = replaceTag(
    result,
    /<meta\s+property=["']og:description["'][\s\S]*?>/i,
    `<meta property="og:description" content="${descriptionText}" />`,
  );
  result = replaceTag(
    result,
    /<meta\s+property=["']og:url["'][\s\S]*?>/i,
    `<meta property="og:url" content="${canonical}" />`,
  );
  return result;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname =
      url.pathname.length > 1 ? url.pathname.replace(/\/+$/, "") : url.pathname;
    const isRead = ["GET", "HEAD"].includes(request.method);
    const acceptsHtml = request.headers.get("accept")?.includes("text/html");
    const target = isRead ? redirectTarget(pathname) : null;

    if (pathname === "/api/contact") return handleContactRequest(request, env);

    if (target) return Response.redirect(new URL(target, SITE_URL), 301);
    if (isRead && pathname !== url.pathname && routeSeo[pathname]) {
      return Response.redirect(
        new URL(`${pathname}${url.search}`, SITE_URL),
        301,
      );
    }

    let response = await env.ASSETS.fetch(request);

    if (!isRead || !acceptsHtml) return response;

    if (response.status === 404) {
      if (!routeSeo[pathname]) return response;
      const indexUrl = new URL(request.url);
      indexUrl.pathname =
        pathname === "/" ? "/index.html" : `${pathname}/index.html`;
      indexUrl.search = "";
      response = await env.ASSETS.fetch(new Request(indexUrl, request));
    }

    if (
      request.method === "HEAD" ||
      response.status !== 200 ||
      !routeSeo[pathname]
    ) {
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
