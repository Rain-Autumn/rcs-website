import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { researchRoot } from '@/lib/research-publications';

export const runtime = 'nodejs';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^RCS-RP-\d{3}$/.test(id)) return new NextResponse('Not found', { status: 404 });
  try {
    const pdf = await readFile(path.join(researchRoot(), id, 'report.pdf'));
    return new NextResponse(pdf, { headers: { 'Content-Type': 'application/pdf', 'Content-Disposition': `attachment; filename="${id}-report.pdf"`, 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'public, max-age=300' } });
  } catch { return new NextResponse('Not found', { status: 404 }); }
}
