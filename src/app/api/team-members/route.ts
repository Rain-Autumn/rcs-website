import { NextResponse, type NextRequest } from 'next/server';
import { hasTeamSession } from '@/lib/team-auth';
import { saveTeamMember, teamMemberSchema } from '@/lib/team-members';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  if (!hasTeamSession(request)) return NextResponse.json({ ok: false }, { status: 401 });
  const origin = request.headers.get('origin');
  if (origin !== process.env.RCS_PUBLIC_ORIGIN && !/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin || '')) return NextResponse.json({ ok: false }, { status: 403 });
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  const parsed = teamMemberSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, fieldErrors: parsed.error.flatten().fieldErrors }, { status: 422 });
  try {
    const member = await saveTeamMember(parsed.data);
    return NextResponse.json({ ok: true, id: member.id }, { status: 201 });
  } catch (error) {
    console.error('[team] Unable to store member.', error);
    return NextResponse.json({ ok: false }, { status: 503 });
  }
}
