# Raiju Cloud System

[![CI](https://github.com/Rain-Autumn/rcs-website/actions/workflows/ci.yml/badge.svg)](https://github.com/Rain-Autumn/rcs-website/actions/workflows/ci.yml)
[![CodeQL](https://github.com/Rain-Autumn/rcs-website/actions/workflows/codeql.yml/badge.svg)](https://github.com/Rain-Autumn/rcs-website/actions/workflows/codeql.yml)

Public website for **Raiju Cloud System (RCS)**, an independent technology and research initiative founded by Hugues Henrotte. The interface combines a restrained retro-futurist identity with a predominantly light, editorial layout.

Live site: [raijucloudsystem.com](https://raijucloudsystem.com)

## What the project contains

- A multilingual landing page in French, English and Dutch.
- A dashboard introducing Even / **RCS Evidence Engine**, Research and Security, followed by the Team and Contact sections.
- Access to the experimental Evidence Engine application at [`evidence-engine.raijucloudsystem.com`](https://evidence-engine.raijucloudsystem.com), separate from this public website.
- A searchable, filterable library of four published research records, with confirmed DOI links and an on-site RP003 article.
- A team directory with localized roles and biographies; certifications appear only when supplied.
- Separate password-protected administration forms for Research and Team.
- Private server-side storage for publication metadata and PDF reports.
- Responsive navigation, reduced-motion support and progressive visual effects.
- Branded 1200 × 630 social previews for LinkedIn and other Open Graph clients.
- Structured Organization, Team and Research data expressed through JSON-LD.
- Automatic IndexNow notification after successful production deployments.

Published and planned work are distinguished explicitly. The current library links to:

| Publication | DOI                                                                  |
| ----------- | -------------------------------------------------------------------- |
| RCS-RP-001  | [`10.5281/zenodo.21994886`](https://doi.org/10.5281/zenodo.21994886) |
| RCS-RP-002  | [`10.5281/zenodo.22110548`](https://doi.org/10.5281/zenodo.22110548) |
| RCS-RP-003  | [`10.5281/zenodo.23373563`](https://doi.org/10.5281/zenodo.23373563) |
| RCS-RP-004  | [`10.5281/zenodo.23411388`](https://doi.org/10.5281/zenodo.23411388) |

## Team

| Member          | Public role                                |
| --------------- | ------------------------------------------ |
| Hugues Henrotte | Founder · Systems engineering              |
| Jacob Matthews  | Member · Cybersecurity & digital forensics |
| Malika Kayo     | Member · Cybersecurity                     |

The [public team section](https://raijucloudsystem.com/fr#equipe) is available in
French, English and Dutch. Official profiles are maintained in
[`src/content/team.ts`](src/content/team.ts); no photo, external profile,
certification or experience is inferred for a new member. Even is RCS's virtual
AI spokesperson, not a human team member.

## Routes

| Area             | French                | English               | Dutch                 |
| ---------------- | --------------------- | --------------------- | --------------------- |
| Dashboard / Even | `/fr#accueil`         | `/en#accueil`         | `/nl#accueil`         |
| Research library | `/fr#recherches`      | `/en#recherches`      | `/nl#recherches`      |
| Security         | `/fr#securite`        | `/en#securite`        | `/nl#securite`        |
| Team             | `/fr#equipe`          | `/en#equipe`          | `/nl#equipe`          |
| Contact          | `/fr#contact`         | `/en#contact`         | `/nl#contact`         |
| RP003 article    | `/fr/research/rp-003` | `/en/research/rp-003` | `/nl/research/rp-003` |

The root route `/` redirects to `/fr`, without a language gate. Language links
preserve the current section. Legacy `/presentation`, `/research`, `/team`,
`/evidence-engine` and `/squadron` routes redirect to the matching localized
landing-page anchor; they are not separate public landing pages. Administration
remains at `/{locale}/admin`, excluded from indexing and password-protected.

## Technical architecture

```text
src/
├── app/
│   ├── (portal)/                  # Root redirect to /fr
│   ├── (localized)/[locale]/      # Landing page, RP003 article, admin and legacy redirects
│   └── api/                       # Authentication, publications and members
├── components/
│   ├── layout/                    # Header and navigation
│   ├── onepage/                   # Current public dashboard, library, team and contact
│   ├── research/                  # Research publication form
│   ├── sections/                  # Retained institutional presentation components
│   ├── team/                      # Team member form
│   ├── three/                     # Progressive Three.js scenes
│   └── ui/                        # Shared interface primitives
├── content/                       # Localized structured content
├── hooks/                         # Motion, media and performance hooks
├── lib/                           # Authentication, storage and i18n
└── types/                         # Shared domain models
```

The application uses Next.js 16, React 19, TypeScript, Three.js, GSAP, Lenis, Zod and pnpm. Production output is generated in Next.js standalone mode for deployment behind Nginx.

## Security model

- The Research and Team passwords are distinct and never stored in plaintext.
- Only salted scrypt hashes are supplied through private environment variables.
- Authentication cookies are HTTP-only, same-site and short-lived.
- Research PDF uploads are restricted to PDF content and a maximum of 8 MiB.
- Published metadata and reports are stored outside `public/` and outside the Nginx document root.
- Nginx applies an independent 9 MiB request limit and rate limiting before Node.js.
- Runtime data, production environments, credentials and deployment backups are excluded from this repository.

The examples in [`deploy/`](deploy/) are integration references and must be reviewed against the target server before use.

## Supply-chain controls

- CI permissions are read-only by default; deployment secrets are available only to the production deployment job.
- Third-party GitHub Actions are pinned to immutable commit SHAs and monitored by Dependabot.
- Pull requests receive dependency-diff review and CodeQL analysis in addition to the application test suite.
- Every `main` release is retained as a standalone archive, described by an SPDX SBOM and covered by GitHub artifact attestations before deployment.
- Sensitive repository and deployment paths have an explicit owner through `CODEOWNERS`.
- Vulnerability reporting follows [`SECURITY.md`](SECURITY.md); disaster recovery follows [`docs/RECOVERY.md`](docs/RECOVERY.md).

## Local development

Requirements: Node.js >=22.13.0 and pnpm 11.15.1.

```bash
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

Generate the two password hashes locally and place only the resulting hashes in `.env.local`:

```bash
printf '%s' 'a-long-research-password' | node scripts/hash-research-password.mjs
printf '%s' 'a-different-long-team-password' | node scripts/hash-password.mjs
```

Local metadata and uploads are written to `.data/`, which is ignored by Git.

## Quality checks

```bash
pnpm test:static
pnpm typecheck
pnpm lint
pnpm test
NEXT_TELEMETRY_DISABLED=1 pnpm build
PLAYWRIGHT_USE_PRODUCTION=1 pnpm exec playwright test --project=chromium --workers=2
```

The GitHub Actions workflow runs the same validation chain on every push to `main`
and on pull requests, plus a dependency audit. The team browser test checks all
three languages at desktop and mobile widths. Production deployment follows
successful validation and release attestations; credentials and server data are
not edited by content-only changes.

## Source availability

This repository is public for technical review and portfolio visibility. No open-source license is granted; all rights are reserved by Raiju Cloud System.
