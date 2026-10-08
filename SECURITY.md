# Security policy

## Supported version

Security fixes target the current `main` branch and the release currently deployed at
[raijucloudsystem.com](https://raijucloudsystem.com).

## Reporting a vulnerability

Please report vulnerabilities privately through GitHub private vulnerability reporting when it
is available. Otherwise, email `contact@raijucloudsystem.com` with the subject
`[SECURITY] RCS website vulnerability`.

Do not open a public issue for a suspected vulnerability. A useful report includes:

- the affected route, component or commit;
- clear and reproducible steps;
- the expected security impact;
- a minimal proof of concept that does not expose private data.

RCS will acknowledge a complete report as soon as reasonably possible, assess its impact and
coordinate remediation. No monetary reward is promised.

## Safe research rules

Do not access data that does not belong to you, degrade availability, establish persistence or
publish details before a fix can be prepared. Stop testing and report immediately if private data
is encountered.

Secrets, production environment files and private runtime data must never be committed. Any secret
suspected of exposure must be revoked and replaced through the relevant service, not edited into
repository history.
