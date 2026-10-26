# Website maintenance — 26 October 2026

Scope: the RCS public website, its npm dependencies, CI and public research discovery.
No changes to VPS credentials, private data, bots, Evidence Engine or RCS Linux.

## Dependency updates

- Consolidates the compatible npm updates proposed in Dependabot #60 and #62.
- Next.js and eslint-config-next: 16.4.3, with React and React DOM 19.3.1.
- Zod 4.6.7 fixes the collection-validation advisory that blocks the old CI dependency graph.
- Updates development tools, including Playwright 1.64.1 and Vitest 5.0.5.
- Adds Vite 8.3.5 explicitly so test tools do not retain an outdated peer copy.
- Updates the existing undici override to 7.30.1; does not weaken audit policies.
- Node types 22.20.5 match the deployed Node 22 runtime, rather than #35's Node 26 types.
  Dependabot keeps their minor/patch updates but does not propose a different runtime's major types.
- CodeQL action 4.39.1 is pinned to the verified release commit (Dependabot #63).
- CI audits the entire graph, and tests the production build with Chromium before deployment.

Compatibility holds, not forgotten updates:

- TypeScript stays on 5.9.3. Next.js 16.4.3 calls the legacy `createProgram` API;
  TypeScript 7.0.2's root export is a version shim with separate unstable native APIs.
  Upgrading this needs a supported Next.js/compiler migration, not a package-only bump.
- ESLint stays on 9.39.5. A trial of 10.13.0 reported unsupported peers in
  eslint-plugin-import, eslint-plugin-jsx-a11y and eslint-plugin-react used by Next's config.
  Their declared compatibility must be addressed before switching this production lint stack.
- The repository's pinned pnpm 11.15.1 is unchanged; a package-manager major migration is separate.

## Research discovery

Search Console reports RP003 as discovered but not indexed; that is not evidence
that its content was crawled and rejected. Initial live checks confirmed HTTP 200,
an appropriate self-canonical, HTML article content, no `noindex`, and sitemap inclusion.
However, the home page no longer contained a link to the local article after the one-page redesign.

The RP003 card now links to its local FR/EN/NL article in server-rendered HTML,
with translated, descriptive accessible names, while keeping the confirmed Zenodo DOI link.
The action row wraps on small screens. No fake modification dates, new redirect chains,
or unneeded changes to canonical URLs, robots rules, or public research results are introduced.

Regression tests cover all three languages without JavaScript, canonical article responses,
the six sitemap URLs, navigation, external publication links and viewport overflow.

## Search Console follow-up

After deployment, use URL inspection for
`https://raijucloudsystem.com/fr/research/rp-003`, test the live URL and request indexing.
No Search Console request has been submitted by this code change. The automated IndexNow
notification in the existing deployment workflow does not submit URLs to Google.
Google decides when and whether to crawl/index; no immediate indexing claim is made.

## Verification

- Local Windows Node 24.19.0: production build, TypeScript and scoped ESLint checks pass.
- Static audit: all 23 checks pass.
- Vitest 5.0.5: 5 test files, 24 tests pass.
- Playwright 1.64.1 against the production build: all 51 tests pass, using two workers
  across desktop Chromium, Android-sized Chromium and iPhone-sized WebKit.
- RP003 screenshots reviewed on desktop Chromium and mobile WebKit: readable links,
  preserved Zenodo action, appropriate wrapping and no overflow.
- `pnpm peers check`: no peer dependency issues.
- Full `pnpm audit`: no known vulnerabilities.
- GitHub's Node 22 CI and post-merge deployment remain separate verification steps.

Audit results are time-specific, not a guarantee of permanent safety.
