import { mkdir, readdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import type { TeamMember } from '@/types/team';

const certificationSchema = z.object({
  provider: z.string().trim().min(2).max(120),
  title: z.string().trim().min(3).max(240),
  issued: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/),
  credentialId: z.string().trim().max(160).optional(),
  credentialUrl: z.union([z.literal(''), z.string().url().max(500).refine((value) => /^https?:\/\//i.test(value))]).optional(),
});

export const teamMemberSchema = z.object({
  name: z.string().trim().min(2).max(120),
  type: z.enum(['direction', 'member', 'collaborator']),
  roleFr: z.string().trim().min(2).max(160), roleEn: z.string().trim().min(2).max(160), roleNl: z.string().trim().min(2).max(160),
  bioFr: z.string().trim().min(20).max(2000), bioEn: z.string().trim().min(20).max(2000), bioNl: z.string().trim().min(20).max(2000),
  specialties: z.array(z.string().trim().min(2).max(80)).min(1).max(20),
  certifications: z.array(certificationSchema).max(20),
});

export function teamRoot() {
  return path.resolve(/* turbopackIgnore: true */ process.env.RCS_TEAM_DIR || '/var/lib/rcs/team-members');
}

export async function saveTeamMember(data: z.infer<typeof teamMemberSchema>) {
  const root = teamRoot();
  await mkdir(root, { recursive: true, mode: 0o700 });
  const existing = (await readdir(root, { withFileTypes: true })).filter((entry) => entry.isDirectory() && /^RCS-TM-\d{3}$/.test(entry.name));
  const next = Math.max(1, ...existing.map((entry) => Number(entry.name.slice(-3)))) + 1;
  const id = `RCS-TM-${String(next).padStart(3, '0')}`;
  const temporary = path.join(root, `.tmp-${randomUUID()}`);
  const destination = path.join(root, id);
  await mkdir(temporary, { mode: 0o700 });
  const member: TeamMember = {
    id, name: data.name, type: data.type,
    translations: { fr: { role: data.roleFr, bio: data.bioFr }, en: { role: data.roleEn, bio: data.bioEn }, nl: { role: data.roleNl, bio: data.bioNl } },
    specialties: data.specialties, certifications: data.certifications.map((certification) => ({ ...certification, credentialId: certification.credentialId || undefined, credentialUrl: certification.credentialUrl || undefined })),
    createdAt: new Date().toISOString(),
  };
  await writeFile(path.join(temporary, 'member.json'), JSON.stringify(member, null, 2), { mode: 0o600 });
  await rename(temporary, destination);
  return member;
}

export async function loadTeamMembers() {
  const root = teamRoot();
  try {
    const entries = await readdir(root, { withFileTypes: true });
    const members = await Promise.all(entries.filter((entry) => entry.isDirectory() && /^RCS-TM-\d{3}$/.test(entry.name)).map(async (entry) => {
      try { return JSON.parse(await readFile(path.join(root, entry.name, 'member.json'), 'utf8')) as TeamMember; }
      catch { return null; }
    }));
    return members.filter((member): member is TeamMember => Boolean(member)).sort((a, b) => a.id.localeCompare(b.id));
  } catch { return []; }
}
