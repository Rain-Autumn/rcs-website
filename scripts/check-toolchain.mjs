import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { ESLint } = require("eslint");
const legacy = require("typescript");
const { JSDOM } = require("jsdom");
const dom = new JSDOM("<!doctype html><p>migration</p>");
assert.equal(dom.window.document.querySelector("p").textContent, "migration");
dom.window.close();
assert.equal(
  typeof legacy.createProgram,
  "function",
  "Next.js needs the legacy compiler API",
);
assert.match(legacy.version, /^6\./);
const nativeVersion = execFileSync(
  process.execPath,
  [
    path.join(
      path.dirname(require.resolve("typescript-native/package.json")),
      "bin",
      "tsc",
    ),
    "--version",
  ],
  { encoding: "utf8" },
).trim();
assert.match(
  nativeVersion,
  /Version 7\./,
  "The standalone type check must use TypeScript 7",
);

const eslint = new ESLint({ cwd: root });
const fixtures = [
  {
    name: "image.tsx",
    source:
      'export default function Demo(){ return <img src="/example.png" />; }',
    rules: ["jsx-a11y/alt-text", "@next/next/no-img-element"],
  },
  {
    name: "keys.tsx",
    source:
      "export default function Demo(){ return <>{[1,2].map(n => <span>{n}</span>)}</>; }",
    rules: ["react/jsx-key"],
  },
  {
    name: "hooks.tsx",
    source:
      'import {useState} from "react"; export default function Demo({ok}:{ok:boolean}){ if(ok){ useState(0); } return null; }',
    rules: ["react-hooks/rules-of-hooks"],
  },
  {
    name: "anonymous.js",
    source: "export default { value: 1 };",
    rules: ["import/no-anonymous-default-export"],
  },
  {
    name: "typing.ts",
    source: "export function echo(value: any){ return value; }",
    rules: ["@typescript-eslint/no-explicit-any"],
  },
];
let checked = 0;
for (const fixture of fixtures) {
  const [result] = await eslint.lintText(fixture.source, {
    filePath: path.join(root, "src", "__migration_fixture__", fixture.name),
  });
  assert.equal(
    result.fatalErrorCount,
    0,
    fixture.name + ": parser or adapter failure",
  );
  const reported = new Set(result.messages.map((message) => message.ruleId));
  for (const rule of fixture.rules) {
    assert.ok(
      reported.has(rule),
      fixture.name + ": expected active rule " + rule,
    );
    checked++;
  }
}
console.log(
  `Toolchain passed: ${nativeVersion}, Next API ${legacy.version}, ESLint ${ESLint.version}, ${checked} rule checks.`,
);
