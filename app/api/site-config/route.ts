import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

type SiteConfig = {
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
    websiteUrl: string;
    webmailUrl: string;
    whatsappUrl: string;
  };
};

const dataDir = path.join(process.cwd(), 'data');
const configPath = path.join(dataDir, 'dashboard-config.json');

const fallbackConfig: SiteConfig = {
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
    websiteUrl: '/',
    webmailUrl: 'https://mail.google.com',
    whatsappUrl: 'https://wa.me/525512345678',
  },
};

export async function GET() {
  try {
    await fs.mkdir(dataDir, { recursive: true });
    const raw = await fs.readFile(configPath, 'utf8');
    const data = JSON.parse(raw) as SiteConfig;

    return NextResponse.json({
      siteContent: {
        ...fallbackConfig.siteContent,
        ...data.siteContent,
      },
      footer: {
        ...fallbackConfig.footer,
        ...data.footer,
      },
      contact: {
        ...fallbackConfig.contact,
        ...data.contact,
      },
    });
  } catch {
    return NextResponse.json(fallbackConfig);
  }
}
