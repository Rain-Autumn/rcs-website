# Raiju Cloud System

[![CI](https://github.com/Rain-Autumn/rcs-website/actions/workflows/ci.yml/badge.svg)](https://github.com/Rain-Autumn/rcs-website/actions/workflows/ci.yml)

Public website for **Raiju Cloud System (RCS)**, an independent technology and systems structure founded by Hugues Henrotte. The interface combines a restrained retro-futurist identity with a predominantly light, editorial layout.

Live site: [raijucloudsystem.com](https://raijucloudsystem.com)

## What the project contains

- A multilingual public presentation in French, English and Dutch.
- Dedicated Research routes with structured technical publications.
- A normalized Team directory with localized roles, profiles and certifications.
- Separate password-protected administration forms for Research and Team.
- Private server-side storage for publication metadata and PDF reports.
- Responsive navigation, reduced-motion support and progressive visual effects.
- Branded 1200 × 630 social previews for LinkedIn and other Open Graph clients.
- Structured Organization, Team and Research data expressed through JSON-LD.
- Automatic IndexNow notification after successful production deployments.

Planned research projects are clearly identified as future work. No result, benchmark or publication is presented as completed unless supporting data exists.

## Routes

| Area | French | English | Dutch |
| --- | --- | --- | --- |
| Presentation | `/fr` | `/en` | `/nl` |
| Research | `/fr/research` | `/en/research` | `/nl/research` |
| Team | `/fr/team` | `/en/team` | `/nl/team` |

The root route `/` provides the language entry point.

## Technical architecture

```text
src/
├── app/
│   ├── (portal)/                  # Language entry point
│   ├── (localized)/[locale]/      # Presentation, Research and Team pages
│   └── api/                       # Authentication, publications and members
├── components/
│   ├── layout/                    # Header and navigation
│   ├── research/                  # Research publication form
│   ├── sections/                  # Institutional presentation sections
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

## Local development

Requirements: Node.js 22+ and pnpm 11.15.1.

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
```

The GitHub Actions workflow runs the same validation chain on every push to `main` and on pull requests.

## Source availability

This repository is public for technical review and portfolio visibility. No open-source license is granted; all rights are reserved by Raiju Cloud System.
