import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import worker from "../src/index.js";

const paths = [
  "/",
  "/api/chat",
  "/api/commander-auth",
  "/health",
  "/chat.js",
  "/chat.css",
  "/icons/raiju-dragon.svg",
  "/unrecognized/path?query=ignored",
];
const methods = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "OPTIONS",
  "HEAD",
  "PROPFIND",
];

test("every route and standard method returns 410 without redirect or assets", async () => {
  for (const path of paths) {
    for (const method of methods) {
      const request = new Request(`https://example.invalid${path}`, {
        method,
        ...(method === "POST" || method === "PUT" || method === "PATCH"
          ? { body: '{"messages":[{"role":"user","content":"not processed"}]}' }
          : {}),
      });
      const response = await worker.fetch(request);
      assert.equal(response.status, 410, `${method} ${path}`);
      assert.equal(response.headers.get("location"), null);
      assert.equal(response.headers.get("set-cookie"), null);
      assert.equal(response.headers.get("allow"), null);
      const body = await response.text();
      if (method === "HEAD") assert.equal(body, "");
      else {
        assert.match(body, /service de conversation.*a été retiré/);
        assert.match(body, /https:\/\/raijucloudsystem\.com\/fr/);
        assert.doesNotMatch(body, /<script|<link|<iframe|<form|<!DOCTYPE/i);
      }
    }
  }
});

test("responses are explicit, uncacheable and contain no CORS authorization", async () => {
  const response = await worker.fetch(
    new Request("https://example.invalid/api/chat"),
  );
  assert.equal(
    response.headers.get("content-type"),
    "text/plain; charset=utf-8",
  );
  assert.equal(response.headers.get("content-language"), "fr");
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(
    response.headers.get("x-robots-tag"),
    "noindex, nofollow, noarchive",
  );
  assert.match(
    response.headers.get("content-security-policy"),
    /default-src 'none'/,
  );
  assert.equal(response.headers.get("access-control-allow-origin"), null);
  assert.equal(response.headers.get("access-control-allow-credentials"), null);
});

test("request content, authentication, bindings, context and network are never used", async () => {
  const unexpectedAccess = () => {
    throw new Error("Application or network access is forbidden");
  };
  const inaccessible = new Proxy({}, { get: unexpectedAccess });
  const request = {
    method: "POST",
    get url() {
      return unexpectedAccess();
    },
    get headers() {
      return unexpectedAccess();
    },
    get body() {
      return unexpectedAccess();
    },
    text: unexpectedAccess,
    json: unexpectedAccess,
  };
  const originalFetch = globalThis.fetch;
  globalThis.fetch = unexpectedAccess;
  try {
    const response = await worker.fetch(request, inaccessible, inaccessible);
    assert.equal(response.status, 410);
    assert.match(await response.text(), /Aucune demande n'est transmise/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("HEAD has no body and keeps retirement response headers", async () => {
  const head = await worker.fetch(
    new Request("https://example.invalid/", { method: "HEAD" }),
  );
  const get = await worker.fetch(new Request("https://example.invalid/"));
  assert.equal(head.body, null);
  assert.deepEqual([...head.headers], [...get.headers]);
});

test("example config has no production identity, bindings, assets or public route", async () => {
  const config = JSON.parse(
    await readFile(
      new URL("../wrangler.example.json", import.meta.url),
      "utf8",
    ),
  );
  assert.equal(config.name, "replace-with-confirmed-worker-name");
  assert.equal(config.workers_dev, false);
  assert.equal(config.preview_urls, false);
  assert.deepEqual(config.routes, []);
  assert.deepEqual(Object.keys(config).sort(), [
    "compatibility_date",
    "main",
    "name",
    "observability",
    "preview_urls",
    "routes",
    "workers_dev",
  ]);
});
