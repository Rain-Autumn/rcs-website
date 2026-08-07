import type { NextRequest } from 'next/server';
import { createPasswordSession, hasPasswordSession, verifyPassword } from '@/lib/password-auth';

export const TEAM_COOKIE = 'rcs_team_admin';

export function verifyTeamPassword(password: string) {
  return verifyPassword(password, process.env.RCS_TEAM_PASSWORD_HASH || '');
}

export function createTeamSession() {
  return createPasswordSession(process.env.RCS_TEAM_PASSWORD_HASH || '');
}

export function hasTeamSession(request: NextRequest) {
  return hasPasswordSession(request, TEAM_COOKIE, process.env.RCS_TEAM_PASSWORD_HASH || '');
}
