# RCS continuous deployment

The production pipeline keeps the public source tree clean while preserving private runtime data on the VPS.

## One-time setup

From PowerShell, at the repository root:

```powershell
powershell -ExecutionPolicy Bypass -File .\deploy\setup-continuous-deployment.ps1
```

The script creates a dedicated SSH identity, configures the restricted `rcsdeploy` account on the VPS, stores the private identity as an encrypted GitHub Actions secret, and enables deployment. The temporary private key is deleted locally after configuration.

The deployment identity cannot open a general SSH shell. Its authorized key can only send one release archive to the root-owned deployment helper.

## Release flow

Every push to `main` runs the static audit, TypeScript, ESLint, unit tests, and the production build. If every check passes, GitHub Actions sends the standalone Next.js bundle to the VPS.

The VPS extracts the release into `/var/www/raijucloudsystem.com/releases/<commit>`, switches `/var/www/raijucloudsystem.com/current` atomically, restarts `raiju-site.service`, and validates `http://127.0.0.1:3000/fr`. A failed health check restores the previous service configuration and release.

Runtime secrets and publication data remain outside the repository:

- `/etc/rcs/rcs.env`
- `/var/lib/rcs/research-publications`
- `/var/lib/rcs/team-members`

The GitHub switch is the repository variable `RCS_DEPLOY_ENABLED`. Set it to `false` to keep CI active while pausing production deployments.

## Runtime isolation

`rcs-site-security.conf` is an operator-installed systemd drop-in, not an
automatic bootstrap or credential migration. Install it as
`/etc/systemd/system/raiju-site.service.d/zzz-security.conf` only after a verified
recovery checkpoint and preparation of the locked, non-login `rcs-site` account.
Transfer ownership of the two application data directories and the current
release's `.next/cache` to that account. Do not change SSH identities, password
hashes, provider credentials or Discord configuration.

The executable release is owned by root, with read/traverse permission for the
runtime group only (not write permission). The
drop-in limits filesystem writes to those three directories, hides home
directories, removes capabilities and imposes CPU, memory and task limits.
The deployment helper preserves the drop-in and prepares the cache for every
new release once hardening is enabled. Previous releases are retained rather
than automatically deleted.

Validate the merged systemd configuration, restart only `raiju-site.service`,
then check FR/EN/NL pages, image optimisation and access to existing Research
and Team data. Keep rollback metadata for the previous directory owners and
drop-in state. A failed health check must restore those owners and the previous
configuration before restarting the prior runtime.
