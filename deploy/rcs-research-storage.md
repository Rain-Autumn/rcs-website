# Private research submission storage

Run as root, replacing `rcs` with the Unix account used by the Node service:

```sh
install -d -o rcs -g rcs -m 0700 /var/lib/rcs/research-publications
install -d -o rcs -g rcs -m 0700 /var/lib/rcs/team-members
install -d -o root -g rcs -m 0750 /etc/rcs
install -o root -g rcs -m 0640 .env.production /etc/rcs/rcs.env
```

Reference `/etc/rcs/rcs.env` from the existing systemd service with:

```ini
EnvironmentFile=/etc/rcs/rcs.env
```

The upload directory must never be placed below `public/` or served by Nginx. Back it up as private data. Consider scanning newly stored PDFs with ClamAV before an operator opens them.
