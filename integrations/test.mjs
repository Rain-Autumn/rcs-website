import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { previewServer } from "./preview.mjs";
import { catalog } from "./content.mjs";

let server;
let origin;
const text = (path) =>
  readFile(new URL(`./dist/${path}`, import.meta.url), "utf8");

before(async () => {
  server = previewServer();
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  origin = `http://127.0.0.1:${server.address().port}`;
});
after(async () => new Promise((resolve) => server.close(resolve)));

for (const [locale, prefix] of [
  ["en", ""],
  ["fr", "fr/"],
]) {
  for (const suffix of [
    "",
    "deadlines-reminder/",
    "deadlines-reminder/terms/",
    "deadlines-reminder/privacy/",
  ]) {
    test(`${locale} ${suffix || "index"}: anonymous page and local resources`, async () => {
      const path = `${prefix}${suffix}`;
      const response = await fetch(`${origin}/${path}`);
      assert.equal(response.status, 200);
      const html = await response.text();
      assert.match(html, new RegExp(`<html lang="${locale}"`));
      assert.match(html, /<h1\b/);
      assert.equal((html.match(/<h1\b/g) || []).length, 1);
      assert.match(html, /noindex/);
      assert.match(
        html,
        /rel="canonical"[^>]+integrations\.raijucloudsystem\.com/,
      );
      assert.doesNotMatch(
        html,
        /<script\b|<iframe\b|<form\b|https?:\/\/[^"\s]+\.(?:js|css|woff2?)/i,
      );
      assert.doesNotMatch(
        html,
        /localStorage|sessionStorage|document\.cookie|evidence-engine\.raijucloudsystem/,
      );
      for (const [, link] of html.matchAll(/(?:href|src)="(\/[^"#]*)"/g)) {
        const linked = await fetch(new URL(link, origin));
        assert.equal(linked.status, 200, `broken local link ${link}`);
      }
      if (suffix.includes("privacy")) {
        assert.match(html, /SQLite/);
        assert.match(html, /contact@raijucloudsystem\.com/);
        assert.match(
          html,
          locale === "fr" ? /purge automatique/ : /automatic purge/,
        );
      }
    });
  }
}

test("known missing route returns a real 404; no SPA fallback", async () => {
  const response = await fetch(`${origin}/not-a-service`);
  assert.equal(response.status, 404);
  assert.match(await response.text(), /404/);
});
test("preview refuses write methods", async () => {
  assert.equal((await fetch(origin, { method: "POST" })).status, 405);
});
test("hosting is isolated and assets-only", async () => {
  const config = JSON.parse(
    (
      await readFile(new URL("./wrangler.jsonc", import.meta.url), "utf8")
    ).replace(/,\s*([}\]])/g, "$1"),
  );
  assert.equal(config.name, "rcs-integrations");
  assert.deepEqual(config.routes, [
    { pattern: "integrations.raijucloudsystem.com", custom_domain: true },
  ]);
  assert.equal(config.assets.not_found_handling, "404-page");
  assert.equal(config.workers_dev, false);
  for (const binding of [
    "main",
    "ai",
    "services",
    "d1_databases",
    "kv_namespaces",
    "durable_objects",
    "vars",
  ]) {
    assert.equal(config[binding], undefined, `unexpected binding ${binding}`);
  }
});
test("security headers and crawler policy", async () => {
  const headers = await text("_headers");
  assert.match(headers, /script-src 'none'/);
  assert.match(headers, /frame-ancestors 'none'/);
  assert.match(headers, /X-Robots-Tag: noindex, follow/i);
  assert.match(headers, /X-Content-Type-Options: nosniff/i);
  assert.match(await text("robots.txt"), /User-agent: \*/);
});
test("all documents are substantive and dated", () => {
  for (const locale of ["en", "fr"]) {
    for (const type of ["terms", "privacy"]) {
      const doc = catalog[locale][type];
      assert.ok(doc.sections.length >= 5);
      for (const section of doc.sections) {
        assert.ok(section.title.length > 3);
        assert.ok(
          section.paragraphs.every((paragraph) => paragraph.length > 30),
        );
      }
    }
  }
  assert.equal(catalog.updated, "2026-10-18");
});
