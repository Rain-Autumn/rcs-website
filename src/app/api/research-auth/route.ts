import { NextResponse, type NextRequest } from 'next/server';
import { clearPasswordAttempts, recordPasswordFailure, reservePasswordAttempt } from '@/lib/auth-attempts';
import { createResearchSession, RESEARCH_COOKIE, verifyResearchPassword } from '@/lib/research-auth';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  const expected = process.env.RCS_PUBLIC_ORIGIN;
  if (!origin || (expected ? origin !== expected : !/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin))) return NextResponse.json({ ok: false }, { status: 403 });
  if (Number(request.headers.get('content-length') || 0) > 2048) return NextResponse.json({ ok: false }, { status: 413 });
  const passwordHash = process.env.RCS_RESEARCH_PASSWORD_HASH || '';
  const reservation = reservePasswordAttempt(request, 'research', passwordHash);
  if (!reservation.allowed) {
    return NextResponse.json(
      { ok: false, code: 'TOO_MANY_ATTEMPTS', retryAfter: reservation.retryAfter },
      { status: 429, headers: { 'Retry-After': String(reservation.retryAfter), 'Cache-Control': 'no-store' } },
    );
  }
  const rawBody = await request.text();
  if (rawBody.length > 2048) return NextResponse.json({ ok: false }, { status: 413 });
  const body = (() => {
    try { return JSON.parse(rawBody) as { password?: unknown }; }
    catch { return null; }
  })();
  if (!body || typeof body.password !== 'string' || body.password.length > 200 || !(await verifyResearchPassword(body.password))) {
    const retryAfter = recordPasswordFailure(reservation);
    return NextResponse.json(
      { ok: false, code: retryAfter ? 'TOO_MANY_ATTEMPTS' : 'INVALID_CREDENTIALS', retryAfter },
      { status: retryAfter ? 429 : 401, headers: { ...(retryAfter ? { 'Retry-After': String(retryAfter) } : {}), 'Cache-Control': 'no-store' } },
    );
  }
  clearPasswordAttempts(reservation);
  const session = createResearchSession();
  const response = NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } });
  response.cookies.set(RESEARCH_COOKIE, session.value, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/api/research-publications', maxAge: session.maxAge });
  return response;
}
