import { createHmac } from 'node:crypto';
import type { NextRequest } from 'next/server';

const ATTEMPT_WINDOW_MS = 15 * 60 * 1000;
const LOCK_DURATION_MS = 30 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const MAX_TRACKED_CLIENTS = 4096;

interface AttemptRecord {
  attempts: number;
  windowStartedAt: number;
  lockedUntil: number;
}

export interface PasswordAttemptReservation {
  allowed: boolean;
  key: string;
  retryAfter: number;
}

const attempts = new Map<string, AttemptRecord>();

function clientAddress(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return (
    request.headers.get('cf-connecting-ip') ||
    forwarded ||
    request.headers.get('x-real-ip') ||
    'unknown'
  ).slice(0, 100);
}

function attemptKey(request: NextRequest, scope: string, secret: string) {
  return createHmac('sha256', secret || `unconfigured-${scope}`)
    .update(`${scope}:${clientAddress(request)}`)
    .digest('hex');
}

function pruneAttempts(now: number) {
  for (const [key, record] of attempts) {
    if (record.lockedUntil <= now && now - record.windowStartedAt > ATTEMPT_WINDOW_MS) attempts.delete(key);
  }
  if (attempts.size < MAX_TRACKED_CLIENTS) return;
  for (const key of attempts.keys()) {
    attempts.delete(key);
    if (attempts.size < MAX_TRACKED_CLIENTS - 256) break;
  }
}

export function reservePasswordAttempt(request: NextRequest, scope: string, secret: string): PasswordAttemptReservation {
  const now = Date.now();
  pruneAttempts(now);
  const key = attemptKey(request, scope, secret);
  const previous = attempts.get(key);

  if (previous?.lockedUntil && previous.lockedUntil > now) {
    return { allowed: false, key, retryAfter: Math.max(1, Math.ceil((previous.lockedUntil - now) / 1000)) };
  }

  const record = !previous || now - previous.windowStartedAt > ATTEMPT_WINDOW_MS
    ? { attempts: 0, windowStartedAt: now, lockedUntil: 0 }
    : previous;
  record.attempts += 1;
  attempts.set(key, record);

  if (record.attempts > MAX_ATTEMPTS) {
    record.lockedUntil = now + LOCK_DURATION_MS;
    return { allowed: false, key, retryAfter: Math.ceil(LOCK_DURATION_MS / 1000) };
  }

  return { allowed: true, key, retryAfter: 0 };
}

export function recordPasswordFailure(reservation: PasswordAttemptReservation) {
  const record = attempts.get(reservation.key);
  if (!record || record.attempts < MAX_ATTEMPTS) return 0;
  record.lockedUntil = Date.now() + LOCK_DURATION_MS;
  attempts.set(reservation.key, record);
  return Math.ceil(LOCK_DURATION_MS / 1000);
}

export function clearPasswordAttempts(reservation: PasswordAttemptReservation) {
  attempts.delete(reservation.key);
}

export const passwordAttemptPolicy = {
  attemptWindowSeconds: ATTEMPT_WINDOW_MS / 1000,
  lockDurationSeconds: LOCK_DURATION_MS / 1000,
  maxAttempts: MAX_ATTEMPTS,
};
