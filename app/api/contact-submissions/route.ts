import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { isAuthenticated } from '../../lib/auth';

type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
};

const dataDir = path.join(process.cwd(), 'data');
const submissionsPath = path.join(dataDir, 'contact-submissions.json');

async function ensureDataDir() {
  await fs.mkdir(dataDir, { recursive: true });
}

async function readSubmissions(): Promise<ContactSubmission[]> {
  await ensureDataDir();

  try {
    const raw = await fs.readFile(submissionsPath, 'utf8');
    const data = JSON.parse(raw) as ContactSubmission[];
    return Array.isArray(data) ? data : [];
  } catch {
    await fs.writeFile(submissionsPath, JSON.stringify([], null, 2));
    return [];
  }
}

async function writeSubmissions(items: ContactSubmission[]) {
  await ensureDataDir();
  await fs.writeFile(submissionsPath, JSON.stringify(items, null, 2));
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
  }

  const submissions = await readSubmissions();
  return NextResponse.json(submissions.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)));
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<ContactSubmission>;

  if (!body.name || !body.email || !body.message) {
    return NextResponse.json({ error: 'Nombre, email y mensaje son obligatorios.' }, { status: 400 });
  }

  const newSubmission: ContactSubmission = {
    id: crypto.randomUUID(),
    name: body.name.trim(),
    email: body.email.trim(),
    phone: (body.phone || '').trim(),
    message: body.message.trim(),
    createdAt: new Date().toISOString(),
  };

  const current = await readSubmissions();
  current.unshift(newSubmission);
  await writeSubmissions(current.slice(0, 500));

  return NextResponse.json({ ok: true, id: newSubmission.id }, { status: 201 });
}
