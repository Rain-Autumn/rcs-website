import { mkdir, readdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';

export const MAX_PDF_BYTES = 8 * 1024 * 1024;
export const MAX_REQUEST_BYTES = 9 * 1024 * 1024;

export const publicationSchema = z.object({
  locale: z.enum(['fr', 'en', 'nl']),
  title: z.string().trim().min(5).max(200),
  question: z.string().trim().min(20).max(2500),
  context: z.string().trim().min(20).max(5000),
  hypotheses: z.string().trim().min(10).max(5000),
  methodology: z.string().trim().min(20).max(5000),
  tools: z.string().trim().min(2).max(2500),
  data: z.string().trim().min(2).max(5000),
  results: z.string().trim().min(2).max(5000),
  limitations: z.string().trim().min(2).max(5000),
  conclusion: z.string().trim().min(2).max(5000),
  status: z.enum(['in-preparation', 'in-progress', 'published']),
  evidence: z.array(z.enum(['measured', 'reproduced', 'external', 'estimated'])).min(1),
});

export type StoredResearch = z.infer<typeof publicationSchema> & {
  id: string;
  createdAt: string;
  pdf: string;
};

export function researchRoot() {
  return path.resolve(/* turbopackIgnore: true */ process.env.RCS_RESEARCH_DIR || '/var/lib/rcs/research-publications');
}

export async function validateResearchPdf(candidate: FormDataEntryValue | null) {
  if (!(candidate instanceof File) || candidate.size === 0) throw new Error('PDF_REQUIRED');
  if (candidate.size > MAX_PDF_BYTES) throw new Error('PDF_TOO_LARGE');
  if (!candidate.name.toLowerCase().endsWith('.pdf')) throw new Error('PDF_TYPE');
  if (!['application/pdf', 'application/x-pdf'].includes(candidate.type)) throw new Error('PDF_TYPE');
  const bytes = new Uint8Array(await candidate.arrayBuffer());
  if (new TextDecoder('ascii').decode(bytes.slice(0, 5)) !== '%PDF-') throw new Error('PDF_SIGNATURE');
  return bytes;
}

export async function saveResearch(data: z.infer<typeof publicationSchema>, pdf: Uint8Array) {
  const root = researchRoot();
  await mkdir(root, { recursive: true, mode: 0o700 });
  const existing = (await readdir(root, { withFileTypes: true })).filter((entry) => entry.isDirectory() && /^RCS-RP-\d{3}$/.test(entry.name));
  const next = Math.max(2, ...existing.map((entry) => Number(entry.name.slice(-3)))) + 1;
  const id = `RCS-RP-${String(next).padStart(3, '0')}`;
  const temporary = path.join(root, `.tmp-${randomUUID()}`);
  const destination = path.join(root, id);
  await mkdir(temporary, { mode: 0o700 });
  const stored: StoredResearch = { ...data, id, createdAt: new Date().toISOString(), pdf: 'report.pdf' };
  await writeFile(path.join(temporary, 'research.json'), JSON.stringify(stored, null, 2), { mode: 0o600 });
  await writeFile(path.join(temporary, 'report.pdf'), pdf, { mode: 0o600 });
  await rename(temporary, destination);
  return stored;
}

export async function loadResearch(locale: 'fr' | 'en' | 'nl') {
  const root = researchRoot();
  try {
    const entries = await readdir(root, { withFileTypes: true });
    const publications = await Promise.all(entries.filter((entry) => entry.isDirectory() && /^RCS-RP-\d{3}$/.test(entry.name)).map(async (entry) => {
      try {
        const raw = JSON.parse(await readFile(path.join(root, entry.name, 'research.json'), 'utf8')) as StoredResearch;
        return raw.locale === locale ? raw : null;
      } catch { return null; }
    }));
    return publications.filter((item): item is StoredResearch => Boolean(item)).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch { return []; }
}
