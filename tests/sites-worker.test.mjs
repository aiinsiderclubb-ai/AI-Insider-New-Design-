import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";
import worker from "../worker/index.js";

test("serves existing static assets without a fallback", async () => {
  const calls = [];
  const response = await worker.fetch(
    new Request("https://example.test/assets/app.js"),
    {
      ASSETS: {
        fetch: async (request) => {
          calls.push(new URL(request.url).pathname);
          return new Response("asset", { status: 200 });
        },
      },
    },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(calls, ["/assets/app.js"]);
});

test("falls back to index.html for a known app route", async () => {
  const calls = [];
  const response = await worker.fetch(
    new Request("https://example.test/services?source=share", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async (request) => {
          const url = new URL(request.url);
          calls.push(url.pathname + url.search);
          const isRouteHtml = url.pathname === "/services/index.html";
          return new Response(
            isRouteHtml
              ? "<html><head></head><body>app</body></html>"
              : "missing",
            {
              status: isRouteHtml ? 200 : 404,
            },
          );
        },
      },
    },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(calls, ["/services?source=share", "/services/index.html"]);
  assert.match(await response.text(), /AI-автоматизація для бізнесу/);
  assert.match(response.headers.get("content-type"), /text\/html/);
});

test("returns a real 404 for an unknown HTML route", async () => {
  const response = await worker.fetch(
    new Request("https://example.test/not-a-real-page", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("missing", { status: 404 }),
      },
    },
  );

  assert.equal(response.status, 404);
});

test("redirects valuable legacy URLs with 301", async () => {
  const response = await worker.fetch(
    new Request("https://example.test/en/ai-automation-for-business", {
      headers: { accept: "text/html" },
    }),
    { ASSETS: { fetch: async () => new Response("unused") } },
  );

  assert.equal(response.status, 301);
  assert.equal(
    response.headers.get("location"),
    "https://www.aiinsider.it.com/services",
  );
});

test("preserves the strongest legacy n8n URL on the new guide", async () => {
  const response = await worker.fetch(
    new Request("https://example.test/uk/blog/n8n-for-content-automation", {
      headers: { accept: "text/html" },
    }),
    { ASSETS: { fetch: async () => new Response("unused") } },
  );

  assert.equal(response.status, 301);
  assert.equal(
    response.headers.get("location"),
    "https://www.aiinsider.it.com/insights/n8n-ukrainskoiu",
  );
});

test("preserves the strongest GSC case URL on its matching solution", async () => {
  const response = await worker.fetch(
    new Request("https://example.test/en/cases/real-estate-operations-os", {
      headers: { accept: "text/html" },
    }),
    { ASSETS: { fetch: async () => new Response("unused") } },
  );

  assert.equal(response.status, 301);
  assert.equal(
    response.headers.get("location"),
    "https://www.aiinsider.it.com/solutions/real-estate-automation",
  );
});

test("serves insight routes with query-specific metadata", async () => {
  const response = await worker.fetch(
    new Request("https://example.test/insights/n8n-ukrainskoiu", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async (request) => {
          const pathname = new URL(request.url).pathname;
          return pathname === "/insights/n8n-ukrainskoiu/index.html"
            ? new Response(
                "<html><head><title>Old</title></head><body>n8n guide</body></html>",
                { status: 200 },
              )
            : new Response("missing", { status: 404 });
        },
      },
    },
  );

  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /n8n українською: повний гайд/);
  assert.match(
    html,
    /rel="canonical" href="https:\/\/www\.aiinsider\.it\.com\/insights\/n8n-ukrainskoiu"/,
  );
  assert.match(html, /max-image-preview:large/);
});

test("serves new n8n cluster routes through Sites", async () => {
  const response = await worker.fetch(
    new Request("https://example.test/insights/n8n-mcp-server", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async (request) => {
          const pathname = new URL(request.url).pathname;
          return pathname === "/insights/n8n-mcp-server/index.html"
            ? new Response(
                "<html><head><title>Old</title></head><body>MCP guide</body></html>",
                {
                  status: 200,
                },
              )
            : new Response("missing", { status: 404 });
        },
      },
    },
  );

  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /n8n MCP Server: як керувати workflow через AI/);
  assert.match(html, /\/insights\/n8n-mcp-server/);
});

test("normalizes trailing slashes on known routes", async () => {
  const response = await worker.fetch(
    new Request("https://example.test/services/?utm_source=test", {
      headers: { accept: "text/html" },
    }),
    { ASSETS: { fetch: async () => new Response("unused") } },
  );

  assert.equal(response.status, 301);
  assert.equal(
    response.headers.get("location"),
    "https://www.aiinsider.it.com/services?utm_source=test",
  );
});

test("does not turn missing API or write requests into the app shell", async () => {
  for (const request of [
    new Request("https://example.test/api/missing", {
      headers: { accept: "application/json" },
    }),
    new Request("https://example.test/flow", {
      method: "POST",
      headers: { accept: "text/html" },
    }),
  ]) {
    let calls = 0;
    const response = await worker.fetch(request, {
      ASSETS: {
        fetch: async () => {
          calls += 1;
          return new Response("missing", { status: 404 });
        },
      },
    });

    assert.equal(response.status, 404);
    assert.equal(calls, 1);
  }
});

test("delivers a validated contact request to Telegram", async () => {
  const deliveries = [];
  let assetCalls = 0;
  const response = await worker.fetch(
    new Request("https://example.test/api/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        origin: "https://example.test",
      },
      body: JSON.stringify({
        name: "Ірина <CEO>",
        contact: "@iryna",
        company: "Example & Co",
        brief: "Потрібне демо відео для нової послуги.",
        intent: "studio-demo",
        source: "https://example.test/studio",
      }),
    }),
    {
      ASSETS: {
        fetch: async () => {
          assetCalls += 1;
          return new Response("unused");
        },
      },
      TELEGRAM_BOT_TOKEN: "test-token",
      TELEGRAM_CHAT_ID: "-100123",
      TELEGRAM_THREAD_ID: "42",
      TELEGRAM_FETCH: async (url, options) => {
        deliveries.push({ url, body: JSON.parse(options.body) });
        return Response.json({ ok: true, result: { message_id: 1 } });
      },
    },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(assetCalls, 0);
  assert.equal(deliveries.length, 1);
  assert.equal(
    deliveries[0].url,
    "https://api.telegram.org/bottest-token/sendMessage",
  );
  assert.equal(deliveries[0].body.chat_id, "-100123");
  assert.equal(deliveries[0].body.message_thread_id, 42);
  assert.equal(deliveries[0].body.parse_mode, "HTML");
  assert.match(deliveries[0].body.text, /Безкоштовне демо-відео 10–15 с/);
  assert.match(deliveries[0].body.text, /Ірина &lt;CEO&gt;/);
  assert.match(deliveries[0].body.text, /Example &amp; Co/);
});

test("rejects invalid contact requests before Telegram delivery", async () => {
  let telegramCalls = 0;
  const response = await worker.fetch(
    new Request("https://example.test/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "A", contact: "", brief: "short" }),
    }),
    {
      TELEGRAM_BOT_TOKEN: "test-token",
      TELEGRAM_CHAT_ID: "123",
      TELEGRAM_FETCH: async () => {
        telegramCalls += 1;
        return Response.json({ ok: true });
      },
    },
  );

  assert.equal(response.status, 422);
  const payload = await response.json();
  assert.equal(payload.code, "validation_error");
  assert.deepEqual(Object.keys(payload.errors).sort(), [
    "brief",
    "contact",
    "name",
  ]);
  assert.equal(telegramCalls, 0);
});

test("fails safely when Telegram credentials are missing", async () => {
  const response = await worker.fetch(
    new Request("https://example.test/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "Ірина",
        contact: "@iryna",
        brief: "Потрібна автоматизація процесу продажів.",
      }),
    }),
    {},
  );

  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), {
    ok: false,
    code: "not_configured",
  });
});

test("accepts honeypot submissions without delivering spam", async () => {
  let telegramCalls = 0;
  const response = await worker.fetch(
    new Request("https://example.test/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "Spam Bot",
        contact: "spam@example.test",
        brief: "This should never reach Telegram.",
        websiteUrl: "https://spam.example.test",
      }),
    }),
    {
      TELEGRAM_BOT_TOKEN: "test-token",
      TELEGRAM_CHAT_ID: "123",
      TELEGRAM_FETCH: async () => {
        telegramCalls += 1;
        return Response.json({ ok: true });
      },
    },
  );

  assert.equal(response.status, 200);
  assert.equal(telegramCalls, 0);
});

test("emits the files required by Sites packaging", async () => {
  await access(new URL("../dist/client/index.html", import.meta.url));
  await access(new URL("../dist/server/index.js", import.meta.url));
  await access(new URL("../dist/server/contact.js", import.meta.url));
  await access(new URL("../dist/.openai/hosting.json", import.meta.url));
});
