#!/usr/bin/env bash
set -Eeuo pipefail

readonly DEPLOY_USER="rcsdeploy"
readonly DEPLOY_HOME="/var/lib/rcs-deploy"
readonly INCOMING_DIR="${DEPLOY_HOME}/incoming"
readonly AUTHORIZED_KEYS="${DEPLOY_HOME}/.ssh/authorized_keys"

fail() {
  printf 'RCS bootstrap failed: %s\n' "$*" >&2
  exit 1
}

[[ ${EUID} -eq 0 ]] || fail "run this script through sudo"
[[ $# -eq 2 ]] || fail "expected the deploy helper path and a base64 public key"

deploy_source="$(realpath -e -- "$1")"
public_key="$(printf '%s' "$2" | base64 --decode)"

[[ -f "$deploy_source" ]] || fail "deploy helper was not found"
[[ "$public_key" =~ ^ssh-ed25519[[:space:]][A-Za-z0-9+/=]+([[:space:]].*)?$ ]] || fail "public key is invalid"

for command_name in base64 curl flock node realpath systemctl tar visudo; do
  command -v "$command_name" >/dev/null || fail "required command is missing: ${command_name}"
done

if id "$DEPLOY_USER" >/dev/null 2>&1; then
  usermod --home "$DEPLOY_HOME" --shell /bin/bash "$DEPLOY_USER"
else
  useradd --system --create-home --home-dir "$DEPLOY_HOME" --shell /bin/bash "$DEPLOY_USER"
fi
passwd --lock "$DEPLOY_USER" >/dev/null 2>&1 || true

install -d -o root -g root -m 0755 /usr/local/sbin
install -o root -g root -m 0755 "$deploy_source" /usr/local/sbin/rcs-deploy

wrapper_temporary="$(mktemp)"
cat > "$wrapper_temporary" <<'WRAPPER'
#!/usr/bin/env bash
set -Eeuo pipefail

readonly INCOMING_DIR="/var/lib/rcs-deploy/incoming"
readonly MAX_ARCHIVE_BYTES=536870912

original_command="${SSH_ORIGINAL_COMMAND:-}"
if [[ ! "$original_command" =~ ^deploy[[:space:]]([0-9a-f]{40})$ ]]; then
  printf 'This SSH key is restricted to signed RCS deployments.\n' >&2
  exit 126
fi

sha="${BASH_REMATCH[1]}"
umask 077
archive="$(mktemp "${INCOMING_DIR}/${sha}.XXXXXX.tar.gz")"

cleanup() {
  rm -f -- "$archive"
}
trap cleanup EXIT HUP INT TERM

dd if=/dev/stdin of="$archive" bs=1048576 count=513 status=none
archive_bytes="$(stat -c '%s' "$archive")"
(( archive_bytes > 0 )) || { printf 'Empty deployment archive.\n' >&2; exit 1; }
(( archive_bytes <= MAX_ARCHIVE_BYTES )) || { printf 'Deployment archive exceeds 512 MiB.\n' >&2; exit 1; }

sudo --non-interactive /usr/local/sbin/rcs-deploy "$archive" "$sha"
WRAPPER
install -o root -g root -m 0755 "$wrapper_temporary" /usr/local/sbin/rcs-deploy-ssh
rm -f -- "$wrapper_temporary"

install -d -o "$DEPLOY_USER" -g "$DEPLOY_USER" -m 0700 "${DEPLOY_HOME}/.ssh"
install -d -o "$DEPLOY_USER" -g "$DEPLOY_USER" -m 0750 "$INCOMING_DIR"

key_temporary="$(mktemp)"
printf 'restrict,command="/usr/local/sbin/rcs-deploy-ssh" %s\n' "$public_key" > "$key_temporary"
install -o "$DEPLOY_USER" -g "$DEPLOY_USER" -m 0600 "$key_temporary" "$AUTHORIZED_KEYS"
rm -f -- "$key_temporary"

sudoers_temporary="$(mktemp)"
printf '%s ALL=(root) NOPASSWD: /usr/local/sbin/rcs-deploy *\n' "$DEPLOY_USER" > "$sudoers_temporary"
chmod 0440 "$sudoers_temporary"
visudo -cf "$sudoers_temporary" >/dev/null
install -o root -g root -m 0440 "$sudoers_temporary" /etc/sudoers.d/rcsdeploy
rm -f -- "$sudoers_temporary"

printf 'RCS deployment account configured. No production files were changed.\n'
