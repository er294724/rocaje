import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
};

type DashboardConfig = {
  contact?: {
    adminEmail?: string;
  };
};

const dataDir = path.join(process.cwd(), 'data');
const submissionsPath = path.join(dataDir, 'contact-submissions.json');
const configPath = path.join(dataDir, 'dashboard-config.json');

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

async function readAdminEmail() {
  try {
    const raw = await fs.readFile(configPath, 'utf8');
    const config = JSON.parse(raw) as DashboardConfig;
    const value = config.contact?.adminEmail?.trim();
    return value || 'jcabrera@rocaje.com';
  } catch {
    return 'jcabrera@rocaje.com';
  }
}

function buildEmailBody(submission: ContactSubmission) {
  return [
    'Nuevo lead recibido desde rocaje.com',
    '',
    `Nombre: ${submission.name}`,
    `Correo: ${submission.email}`,
    `Telefono: ${submission.phone || 'No proporcionado'}`,
    '',
    'Mensaje:',
    submission.message,
    '',
    `Fecha: ${submission.createdAt}`,
  ].join('\n');
}

async function sendLeadEmail(to: string, submission: ContactSubmission) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { delivered: false, reason: 'missing_resend_api_key' };
  }

  const from = process.env.CONTACT_FROM_EMAIL || 'Rocaje <no-reply@rocaje.com>';
  const bodyText = buildEmailBody(submission);

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `Nuevo lead: ${submission.name}`,
      text: bodyText,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    return { delivered: false, reason: `resend_error:${errorBody}` };
  }

  return { delivered: true };
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

  const adminEmail = await readAdminEmail();
  const mailResult = await sendLeadEmail(adminEmail, newSubmission);

  return NextResponse.json(
    {
      ok: true,
      id: newSubmission.id,
      delivered: mailResult.delivered,
      recipient: adminEmail,
      reason: 'reason' in mailResult ? mailResult.reason : undefined,
    },
    { status: 201 }
  );
}
