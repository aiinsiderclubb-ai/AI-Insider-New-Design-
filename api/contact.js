import { handleContactRequest } from "../worker/contact.js";

export default async function contact(request, response) {
  const protocol = request.headers["x-forwarded-proto"] || "https";
  const host = request.headers["x-forwarded-host"] || request.headers.host || "www.aiinsider.it.com";
  const url = new URL(request.url || "/api/contact", `${protocol}://${host}`);
  const headers = new Headers();

  for (const [key, value] of Object.entries(request.headers)) {
    if (Array.isArray(value)) value.forEach((item) => headers.append(key, item));
    else if (value != null) headers.set(key, String(value));
  }
  headers.delete("content-length");

  let body;
  if (!["GET", "HEAD"].includes(request.method)) {
    if (typeof request.body === "string") body = request.body;
    else if (Buffer.isBuffer(request.body)) body = request.body.toString("utf8");
    else body = JSON.stringify(request.body || {});
  }

  const result = await handleContactRequest(
    new Request(url, { method: request.method, headers, body }),
    process.env,
  );

  response.statusCode = result.status;
  result.headers.forEach((value, key) => response.setHeader(key, value));
  response.end(await result.text());
}
