import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const AUTH_COOKIE = 'rocaje_dashboard_auth';

export async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE)?.value === 'true';
}

export function setAuthCookie(response: NextResponse) {
  response.cookies.set(AUTH_COOKIE, 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8,
  });
}

export function clearAuthCookie(response: NextResponse) {
  response.cookies.set(AUTH_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}

export function getExpectedCredentials() {
  return {
    username: process.env.DASHBOARD_USERNAME || 'rocaje',
    password: process.env.DASHBOARD_PASSWORD || 'rocaje2025',
  };
}
