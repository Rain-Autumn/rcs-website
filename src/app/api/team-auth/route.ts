import { NextResponse, type NextRequest } from 'next/server';
import { createTeamSession, TEAM_COOKIE, verifyTeamPassword } from '@/lib/team-auth';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  const expected = process.env.RCS_PUBLIC_ORIGIN;
  if (!origin || (expected ? origin !== expected : !/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin))) return NextResponse.json({ ok: false }, { status: 403 });
  const body = await request.json().catch(() => null) as { password?: unknown } | null;
  if (!body || typeof body.password !== 'string' || body.password.length > 200 || !(await verifyTeamPassword(body.password))) return NextResponse.json({ ok: false }, { status: 401 });
  const session = createTeamSession();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(TEAM_COOKIE, session.value, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/api/team-members', maxAge: session.maxAge });
  return response;
}
