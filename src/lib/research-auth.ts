import type { NextRequest } from 'next/server';
import { createPasswordSession, hasPasswordSession, verifyPassword } from '@/lib/password-auth';

export const RESEARCH_COOKIE = 'rcs_research_admin';

export async function verifyResearchPassword(password: string) {
  return verifyPassword(password, process.env.RCS_RESEARCH_PASSWORD_HASH || '');
}

export function createResearchSession() {
  return createPasswordSession(process.env.RCS_RESEARCH_PASSWORD_HASH || '');
}

export function hasResearchSession(request: NextRequest) {
  return hasPasswordSession(request, RESEARCH_COOKIE, process.env.RCS_RESEARCH_PASSWORD_HASH || '');
}
