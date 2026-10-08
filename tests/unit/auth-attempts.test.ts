import { beforeEach, describe, expect, it, vi } from 'vitest';
import { clearPasswordAttempts, recordPasswordFailure, reservePasswordAttempt } from '@/lib/auth-attempts';

function requestFor(address: string) {
  return new Request('https://raijucloudsystem.com/api/research-auth', {
    method: 'POST',
    headers: { 'cf-connecting-ip': address },
  }) as never;
}

describe('password attempt protection', () => {
  beforeEach(() => vi.useRealTimers());

  it('locks a client after five failed passwords', () => {
    const request = requestFor('192.0.2.10');
    let retryAfter = 0;
    for (let index = 0; index < 5; index += 1) {
      const reservation = reservePasswordAttempt(request, 'research', 'secret-a');
      expect(reservation.allowed).toBe(true);
      retryAfter = recordPasswordFailure(reservation);
    }
    expect(retryAfter).toBe(1800);
    expect(reservePasswordAttempt(request, 'research', 'secret-a')).toMatchObject({ allowed: false, retryAfter: 1800 });
  });

  it('keeps Research and Team counters separated', () => {
    const request = requestFor('192.0.2.11');
    const research = reservePasswordAttempt(request, 'research', 'secret-a');
    recordPasswordFailure(research);
    expect(reservePasswordAttempt(request, 'team', 'secret-b').allowed).toBe(true);
  });

  it('clears the counter after a successful password', () => {
    const request = requestFor('192.0.2.12');
    const reservation = reservePasswordAttempt(request, 'research', 'secret-a');
    recordPasswordFailure(reservation);
    clearPasswordAttempts(reservation);
    expect(reservePasswordAttempt(request, 'research', 'secret-a').allowed).toBe(true);
  });
});
