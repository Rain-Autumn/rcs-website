# RCS Integrations

Independent, static documentation for RCS tools used on third-party platforms.
Canonical hostname: `integrations.raijucloudsystem.com`.

This directory shares source version control with the institutional website, not
its runtime. No institutional navigation, homepage, Evidence Engine code or bot
configuration is modified. Deployment targets only the new `rcs-integrations`
assets-only Cloudflare service. There are no runtime bindings, API keys, databases,
forms, application analytics or third-party browser assets in this portal.

English lives at `/`; French at `/fr/`. Each includes a service directory,
Deadlines Reminder information, Terms of Use and Privacy Policy. Public installation
is not offered; the currently deployed bot remains limited to configured servers.
The documents are public without authentication but request `noindex, follow`:
this is search-engine guidance, not access control or a secrecy guarantee.

## Build and test

Node.js 22+, no package installation required:

```sh
node integrations/build.mjs
node --test integrations/test.mjs
node integrations/preview.mjs
```

Preview listens only on `127.0.0.1:4188` and accepts GET/HEAD. Generated files go in
ignored `integrations/dist/`; the build does not delete other project data.

## Deployment

After source review, passing CI and merge, use an already-authenticated Wrangler
installation to run `wrangler deploy --config integrations/wrangler.jsonc` from
the repository root. Inspect a dry run first. Do not reuse the Evidence Engine
configuration or create/upload any secret. Cloudflare Custom Domains manages only
this exact new hostname and its certificate. Do not enable a paid plan or replace
existing DNS records. If the name or service already exists unexpectedly, stop and
inspect rather than overwrite it.

Deployment here is separate from the main website's VPS release; the ordinary main
repository CI remains unchanged. The portal workflow validates the generated pages
without needing Cloudflare credentials. No new GitHub secrets are required.

## Accuracy and verification boundaries

The 18 October 2026 documents describe the audited current bot, not a promised
future implementation. Confirmed reminder data persists in SQLite. Cancellation is
not erasure, there is no configured automatic purge, and memory draft validity is
not a precise deletion timer. Source, preview and reminder messages also exist on
Discord. Recovery backups may contain older copies. Contact requests must be
handled by the operator, not mistaken for an existing automated erasure feature.

Publishing these documents is **not** a legal review or confirmation that the bot
meets every Discord/RGPD obligation. Before the owner attests compliance in Discord:

- Confirm the lawful basis and the responsibilities of RCS and server operators.
- Establish proportionate retention, actual erasure and backup-expiry procedures.
- Verify encryption at rest of the active database/storage. Standard SQLite and
  encrypted recovery archives alone do not establish that requirement.
- Review the actual hosting providers, locations, possible transfers and logs.
- Ensure privacy requests and security incidents can be handled in practice.

Source references: Discord Developer Terms section 5, Discord Developer Policy and
Regulation (EU) 2016/679. No data-deletion command, production retention migration,
secret rotation or bot redeployment is included in this change.

- https://support-dev.discord.com/hc/en-us/articles/8562894815383-Discord-Developer-Terms-of-Service
- https://support-dev.discord.com/hc/en-us/articles/8563934450327-Discord-Developer-Policy
- https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng
