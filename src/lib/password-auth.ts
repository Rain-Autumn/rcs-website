import { createHmac, randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import type { NextRequest } from 'next/server';

const scrypt = promisify(scryptCallback);

export async function verifyPassword(password: string, encoded: string) {
  const [scheme, salt, expectedHex] = encoded.split('$');
  if (scheme !== 'scrypt' || !salt || !expectedHex) return false;
  const expected = Buffer.from(expectedHex, 'hex');
  const actual = (await scrypt(password, salt, expected.length)) as Buffer;
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function createPasswordSession(secret: string) {
  if (!secret) throw new Error('Password session secret is not configured');
  const maxAge = 30 * 60;
  const expires = String(Math.floor(Date.now() / 1000) + maxAge);
  const nonce = randomBytes(16).toString('hex');
  const payload = `${expires}.${nonce}`;
  const signature = createHmac('sha256', secret).update(payload).digest('hex');
  return { value: `${payload}.${signature}`, maxAge };
}

export function hasPasswordSession(request: NextRequest, cookie: string, secret: string) {
  if (!secret) return false;
  const token = request.cookies.get(cookie)?.value || '';
  const [expires, nonce, received] = token.split('.');
  if (!expires || !nonce || !received || Number(expires) < Math.floor(Date.now() / 1000)) return false;
  const expected = createHmac('sha256', secret).update(`${expires}.${nonce}`).digest('hex');
  const a = Buffer.from(received, 'hex');
  const b = Buffer.from(expected, 'hex');
  return a.length === b.length && timingSafeEqual(a, b);
}
