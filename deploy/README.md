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
