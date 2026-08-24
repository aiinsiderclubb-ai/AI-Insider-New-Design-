const SITE_ORIGIN = "https://www.aiinsider.it.com";
const MAX_BODY_BYTES = 12_000;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 4;
const rateWindows = new Map();

const intentLabels = {
  general: "Загальний запит",
  "studio-demo": "Безкоштовне демо-відео 10–15 с",
  "ai-content": "AI-контент і відео",
  automation: "Автоматизація процесів",
  "ai-system": "AI-система або агент",
};

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...extraHeaders,
    },
  });
}

function cleanLine(value, max) {
  return typeof value === "string"
    ? value.trim().replace(/\s+/g, " ").slice(0, max)
    : "";
}

function cleanText(value, max) {
  return typeof value === "string"
    ? value.trim().replace(/\r\n?/g, "\n").slice(0, max)
    : "";
}

function escapeTelegram(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function isAllowedOrigin(request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const requestOrigin = new URL(request.url).origin;
  return origin === SITE_ORIGIN || origin === requestOrigin;
}

function isRateLimited(request) {
  const ip = request.headers.get("cf-connecting-ip") || request.headers.get("x-real-ip");
  if (!ip) return false;

  const now = Date.now();
  if (rateWindows.size > 1000) {
    for (const [key, entry] of rateWindows) {
      if (now - entry.startedAt > RATE_WINDOW_MS) rateWindows.delete(key);
    }
  }

  const current = rateWindows.get(ip);
  if (!current || now - current.startedAt > RATE_WINDOW_MS) {
    rateWindows.set(ip, { startedAt: now, count: 1 });
    return false;
  }

  current.count += 1;
  return current.count > RATE_MAX;
}

function validate(payload) {
  const data = {
    name: cleanLine(payload.name, 80),
    contact: cleanLine(payload.contact, 160),
    company: cleanLine(payload.company, 160),
    brief: cleanText(payload.brief, 1600),
    intent: intentLabels[payload.intent] ? payload.intent : "general",
    source: cleanLine(payload.source, 300),
    websiteUrl: cleanLine(payload.websiteUrl, 200),
  };
  const errors = {};

  if (data.name.length < 2) errors.name = "Вкажіть ім’я — мінімум 2 символи.";
  if (data.contact.length < 3) {
    errors.contact = "Вкажіть email, телефон або Telegram для відповіді.";
  }
  if (data.brief.length < 10) {
    errors.brief = "Опишіть задачу трохи детальніше — мінімум 10 символів.";
  }

  return { data, errors };
}

function formatTelegram(data) {
  const safe = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, escapeTelegram(value)]),
  );
  const source = safe.source || "Не вказано";
  const company = safe.company || "Не вказано";
  const sentAt = new Intl.DateTimeFormat("uk-UA", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Zurich",
  }).format(new Date());

  return [
    "🔷 <b>Новий запит · AI Insider</b>",
    "",
    `🎯 <b>Формат:</b> ${intentLabels[data.intent]}`,
    `👤 <b>Ім’я:</b> ${safe.name}`,
    `🏢 <b>Бізнес / сайт:</b> ${company}`,
    `📬 <b>Контакт:</b> ${safe.contact}`,
    "",
    "📝 <b>Задача:</b>",
    safe.brief,
    "",
    `🌐 <b>Сторінка:</b> ${source}`,
    `🕒 <b>Надіслано:</b> ${sentAt} · Zurich`,
  ].join("\n");
}

async function sendTelegram(data, env) {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    return { ok: false, reason: "not_configured" };
  }

  const telegramFetch = env.TELEGRAM_FETCH || fetch;
  const body = {
    chat_id: env.TELEGRAM_CHAT_ID,
    text: formatTelegram(data),
    parse_mode: "HTML",
    disable_web_page_preview: true,
  };
  const threadId = Number(env.TELEGRAM_THREAD_ID);
  if (Number.isInteger(threadId) && threadId > 0) body.message_thread_id = threadId;

  try {
    const response = await telegramFetch(
      `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(8_000),
      },
    );
    if (!response.ok) return { ok: false, reason: "telegram_error" };
    const result = await response.json().catch(() => null);
    return result?.ok ? { ok: true } : { ok: false, reason: "telegram_error" };
  } catch {
    return { ok: false, reason: "telegram_error" };
  }
}

export async function handleContactRequest(request, env = {}) {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: { allow: "POST, OPTIONS", "cache-control": "no-store" },
    });
  }
  if (request.method !== "POST") {
    return json({ ok: false, code: "method_not_allowed" }, 405, {
      allow: "POST, OPTIONS",
    });
  }
  if (!isAllowedOrigin(request)) return json({ ok: false, code: "forbidden" }, 403);
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ ok: false, code: "unsupported_media_type" }, 415);
  }

  const declaredSize = Number(request.headers.get("content-length") || 0);
  if (declaredSize > MAX_BODY_BYTES) return json({ ok: false, code: "payload_too_large" }, 413);

  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) {
    return json({ ok: false, code: "payload_too_large" }, 413);
  }

  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    return json({ ok: false, code: "invalid_json" }, 400);
  }

  const { data, errors } = validate(payload || {});
  if (data.websiteUrl) return json({ ok: true });
  if (Object.keys(errors).length) {
    return json({ ok: false, code: "validation_error", errors }, 422);
  }
  if (isRateLimited(request)) {
    return json({ ok: false, code: "rate_limited" }, 429, { "retry-after": "600" });
  }

  const delivery = await sendTelegram(data, env);
  if (!delivery.ok) {
    const status = delivery.reason === "not_configured" ? 503 : 502;
    return json({ ok: false, code: delivery.reason }, status);
  }

  return json({ ok: true });
}
