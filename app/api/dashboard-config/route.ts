import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { isAuthenticated } from '../../lib/auth';

type DashboardConfig = {
  siteContent: {
    homeHeadline: string;
    aboutHeadline: string;
    contactHeadline: string;
  };
  footer: {
    brandName: string;
    description: string;
    legalText: string;
  };
  contact: {
    email: string;
    phone: string;
    message: string;
    instagramUrl: string;
    linkedinUrl: string;
    adminEmail: string;
    websiteUrl: string;
    webmailUrl: string;
    whatsappUrl: string;
  };
  panels: {
    operations: string;
    marketing: string;
    support: string;
  };
  stats: {
    monthlyVisits: number;
    activeLeads: number;
    conversionRate: number;
    contentSaves: number;
    updatedAt: string;
  };
};

const dataDir = path.join(process.cwd(), 'data');
const configPath = path.join(dataDir, 'dashboard-config.json');

const defaultConfig: DashboardConfig = {
  siteContent: {
    homeHeadline: 'Consultoria industrial para plantas de block y adoquin.',
    aboutHeadline: 'Ingenieria aplicada para operaciones rentables.',
    contactHeadline: 'Hablemos de la siguiente mejora de tu planta.',
  },
  footer: {
    brandName: 'Rocaje',
    description: 'Diseno, estrategia y acompanamiento industrial para marcas y plantas que buscan crecer con claridad.',
    legalText: '© 2026 Rocaje. Todos los derechos reservados.',
  },
  contact: {
    email: 'hola@rocaje.com',
    phone: '+52 55 1234 5678',
    message: 'Si buscas elevar la productividad de tu planta, optimizar procesos y dejar una operacion mas solida, podemos trabajar juntos.',
    instagramUrl: 'https://instagram.com/rocaje',
    linkedinUrl: 'https://linkedin.com/company/rocaje',
    adminEmail: 'jcabrera@rocaje.com',
    websiteUrl: '/',
    webmailUrl: 'https://mail.google.com',
    whatsappUrl: 'https://wa.me/525512345678',
  },
  panels: {
    operations: 'Seguimiento de estandarizacion, seguridad y productividad en piso.',
    marketing: 'Control de mensajes comerciales y conversion de leads por canal.',
    support: 'Coordinacion de solicitudes de clientes y tiempos de respuesta.',
  },
  stats: {
    monthlyVisits: 3180,
    activeLeads: 42,
    conversionRate: 17,
    contentSaves: 0,
    updatedAt: new Date().toISOString(),
  },
};

async function ensureDataDir() {
  await fs.mkdir(dataDir, { recursive: true });
}

async function readConfig(): Promise<DashboardConfig> {
  await ensureDataDir();

  try {
    const raw = await fs.readFile(configPath, 'utf8');
    const parsed = JSON.parse(raw) as Partial<DashboardConfig>;

    return {
      siteContent: {
        ...defaultConfig.siteContent,
        ...parsed.siteContent,
      },
      footer: {
        ...defaultConfig.footer,
        ...parsed.footer,
      },
      contact: {
        ...defaultConfig.contact,
        ...parsed.contact,
      },
      panels: {
        ...defaultConfig.panels,
        ...parsed.panels,
      },
      stats: {
        ...defaultConfig.stats,
        ...parsed.stats,
      },
    };
  } catch {
    await fs.writeFile(configPath, JSON.stringify(defaultConfig, null, 2));
    return defaultConfig;
  }
}

async function writeConfig(config: DashboardConfig) {
  await ensureDataDir();
  await fs.writeFile(configPath, JSON.stringify(config, null, 2));
}

function toNumber(value: unknown, fallback: number) {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
  }

  const config = await readConfig();
  return NextResponse.json(config);
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
  }

  const incoming = (await request.json()) as Partial<DashboardConfig>;
  const current = await readConfig();

  const nextConfig: DashboardConfig = {
    siteContent: {
      ...current.siteContent,
      ...incoming.siteContent,
    },
    footer: {
      ...current.footer,
      ...incoming.footer,
    },
    contact: {
      ...current.contact,
      ...incoming.contact,
    },
    panels: {
      ...current.panels,
      ...incoming.panels,
    },
    stats: {
      ...current.stats,
      monthlyVisits: toNumber(incoming.stats?.monthlyVisits, current.stats.monthlyVisits),
      activeLeads: toNumber(incoming.stats?.activeLeads, current.stats.activeLeads),
      conversionRate: toNumber(incoming.stats?.conversionRate, current.stats.conversionRate),
      contentSaves: current.stats.contentSaves + 1,
      updatedAt: new Date().toISOString(),
    },
  };

  await writeConfig(nextConfig);
  return NextResponse.json(nextConfig);
}
