import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const read = (file: string) => readFileSync(file, "utf8");

describe("production runtime isolation", () => {
  it("separates runtime from the administration account and hides homes", () => {
    const unit = read("deploy/rcs-site-security.conf");
    for (const setting of [
      "User=rcs-site",
      "Group=rcs-site",
      "NoNewPrivileges=yes",
      "ProtectHome=yes",
      "ProtectSystem=strict",
    ]) {
      expect(unit).toContain(setting);
    }
    expect(unit).not.toMatch(/Environment(?:File)?=/);
  });

  it("limits writes to app data and cache, with explicit resource ceilings", () => {
    const unit = read("deploy/rcs-site-security.conf");
    expect(unit).toContain(
      "ReadWritePaths=\nReadWritePaths=/var/lib/rcs/research-publications /var/lib/rcs/team-members /var/www/raijucloudsystem.com/current/.next/cache",
    );
    for (const setting of [
      "MemoryHigh=512M",
      "MemoryMax=768M",
      "CPUQuota=100%",
      "TasksMax=128",
      "CapabilityBoundingSet=\n",
      "AmbientCapabilities=\n",
    ]) {
      expect(unit).toContain(setting);
    }
  });

  it("keeps hardened cache ownership and rollback releases across deployments", () => {
    const script = read("deploy/rcs-deploy");
    expect(script).toContain("zzz-security.conf");
    expect(script).toContain('chown -hR root:rcs-site "$staging"');
    expect(script).toContain('chmod -R u=rwX,g=rX,o= "$staging"');
    expect(script).toContain('chown -hR rcs-site:rcs-site "$cache"');
    expect(script).toContain('[[ ! -L "$cache" ]]');
    expect(script).not.toContain('rm -rf --one-file-system -- "$candidate"');
    expect(script).toContain('systemctl restart "$SERVICE"');
    expect(script).toContain("rollback");
  });
});
