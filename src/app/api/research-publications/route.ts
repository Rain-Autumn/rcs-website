import { NextResponse, type NextRequest } from 'next/server';
import { hasResearchSession } from '@/lib/research-auth';
import { MAX_REQUEST_BYTES, publicationSchema, saveResearch, validateResearchPdf } from '@/lib/research-publications';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  if (!hasResearchSession(request)) return NextResponse.json({ ok: false, message: 'Unauthorized.' }, { status: 401 });
  const origin = request.headers.get('origin');
  if (origin !== process.env.RCS_PUBLIC_ORIGIN && !/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin || '')) return NextResponse.json({ ok: false }, { status: 403 });
  const length = Number(request.headers.get('content-length') || 0);
  if (!length || length > MAX_REQUEST_BYTES) return NextResponse.json({ ok: false, message: 'Request too large.' }, { status: 413 });
  const form = await request.formData().catch(() => null);
  if (!form) return NextResponse.json({ ok: false, message: 'Invalid form.' }, { status: 400 });
  const parsed = publicationSchema.safeParse({
    locale: form.get('locale'), title: form.get('title'), question: form.get('question'), context: form.get('context'),
    hypotheses: form.get('hypotheses'), methodology: form.get('methodology'), tools: form.get('tools'), data: form.get('data'),
    results: form.get('results'), limitations: form.get('limitations'), conclusion: form.get('conclusion'), status: form.get('status'), evidence: form.getAll('evidence'),
  });
  if (!parsed.success) return NextResponse.json({ ok: false, message: 'Validation failed.', fieldErrors: parsed.error.flatten().fieldErrors }, { status: 422 });
  try {
    const pdf = await validateResearchPdf(form.get('pdf'));
    const stored = await saveResearch(parsed.data, pdf);
    return NextResponse.json({ ok: true, id: stored.id }, { status: 201 });
  } catch (error) {
    const reason = error instanceof Error ? error.message : 'Storage error.';
    return NextResponse.json({ ok: false, message: reason }, { status: reason === 'PDF_TOO_LARGE' ? 413 : 422 });
  }
}
