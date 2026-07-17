import { NextResponse } from 'next/server';
import { getExpectedCredentials, setAuthCookie } from '../../lib/auth';

export async function POST(request: Request) {
  const { username, password } = await request.json();
  const { username: expectedUsername, password: expectedPassword } = getExpectedCredentials();

  if (username !== expectedUsername || password !== expectedPassword) {
    return NextResponse.json(
      { error: 'Credenciales inválidas.' },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ ok: true });
  setAuthCookie(response);
  return response;
}
