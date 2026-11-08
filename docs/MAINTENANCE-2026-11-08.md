# Dependency maintenance and toolchain migrations — 8 November 2026

The website keeps its existing behavior and runtime data. This change resumes
the pending dependency maintenance and completes the previously deferred compiler,
lint and test-environment migrations.

## Toolchain compatibility

- `pnpm typecheck` uses the native TypeScript **7.0.2** compiler. The package named
  `typescript` is the official `@typescript/typescript6` compatibility alias:
  Next.js 16.4.5 and typescript-eslint still need its JavaScript compiler API.
  Do not replace the alias with the native package until those consumers support
  the new API. The lockfile currently resolves that API to TypeScript 6.0.3.
- ESLint **10.14.0** keeps the Next, React, hooks, accessibility, import and
  TypeScript rules. `@eslint/compat` adapts older plugin rule APIs. The three
  exact plugin/version peer allowances in `pnpm-workspace.yaml` apply only to
  these adapted, regression-tested plugins; they are not a global peer bypass.
- `pnpm test:toolchain` verifies the native compiler, the Next compiler API,
  jsdom initialization and six intentionally triggered lint rules. CI runs it
  in addition to linting the real source.
- jsdom **31.0.0** raises the supported Node minimum to 22.22.2 or 24.15.0.
  Node 22 remains the CI target, with matching Node 22 types.
- `parse5-parser-stream` 8.1.0 declared a range that could resolve parse5 8.0.1,
  which lacks its required tokenizer API. Its parse5 dependency is pinned to
  8.1.0. The security override for undici is limited to the 7.x family so jsdom
  can use its required 8.x API.
- Vite's built-in TypeScript-path resolution replaces the unused
  `vite-tsconfig-paths` dependency. Unit tests use at most two workers to avoid
  cold-start resource exhaustion on Windows.

## Dependency and supply-chain maintenance

Next.js/eslint-config-next 16.4.5, Tailwind 4.3.5, Playwright 1.65.0,
Three.js/types 0.187.0, Zustand 5.1.0, GSAP 3.15.1, postprocessing 6.39.6,
Vite 8.3.6, Vitest 5.1.0 and the pinned CodeQL action 4.39.3 are included.
The corrected glob and minimatch resolutions address
[GHSA-3g3m-2fjr-6pw4](https://github.com/advisories/GHSA-3g3m-2fjr-6pw4) and
[GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249).
The production and development audit passed with no known vulnerabilities at
verification time; this is not a permanent safety guarantee.

## Verification

Local verification uses Node 22.23.4 and the repository's pnpm 11.15.1, on
Windows and Debian Linux. The compiler, lint, unit, static, peer and full audit
checks pass. Browser tests run against the production build. Linux standalone
packaging includes the public/static assets and Linux-native image dependency;
the extracted archive is started and checked separately before deployment.

Publication, CI, deployment and live production checks are recorded separately
in the maintenance report. No credentials, runtime publication data or team
storage are part of the source change.
