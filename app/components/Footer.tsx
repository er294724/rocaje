'use client';

import Link from 'next/link';
import { ArrowUpRight, Instagram, Linkedin, Mail, Phone } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type FooterConfig = {
  footer?: {
    brandName?: string;
    description?: string;
    legalText?: string;
  };
  contact?: {
    email?: string;
    phone?: string;
    instagramUrl?: string;
    linkedinUrl?: string;
  };
};

export default function Footer() {
  const [brandName, setBrandName] = useState('Rocaje');
  const [description, setDescription] = useState('Diseno, estrategia y acompanamiento industrial para marcas y plantas que buscan crecer con claridad.');
  const [legalText, setLegalText] = useState('© 2026 Rocaje. Todos los derechos reservados.');
  const [email, setEmail] = useState('hola@rocaje.com');
  const [phone, setPhone] = useState('+52 55 1234 5678');
  const [instagramUrl, setInstagramUrl] = useState('https://instagram.com/rocaje');
  const [linkedinUrl, setLinkedinUrl] = useState('https://linkedin.com/company/rocaje');

  const phoneHref = useMemo(() => `tel:${phone.replace(/\s+/g, '')}`, [phone]);

  useEffect(() => {
    let alive = true;

    async function loadFooterConfig() {
      try {
        const response = await fetch('/api/site-config', { cache: 'no-store' });
        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as FooterConfig;
        if (!alive) {
          return;
        }

        if (data.footer?.brandName) {
          setBrandName(data.footer.brandName);
        }

        if (data.footer?.description) {
          setDescription(data.footer.description);
        }

        if (data.footer?.legalText) {
          setLegalText(data.footer.legalText);
        }

        if (data.contact?.email) {
          setEmail(data.contact.email);
        }

        if (data.contact?.phone) {
          setPhone(data.contact.phone);
        }

        if (data.contact?.instagramUrl) {
          setInstagramUrl(data.contact.instagramUrl);
        }

        if (data.contact?.linkedinUrl) {
          setLinkedinUrl(data.contact.linkedinUrl);
        }
      } catch {
        // Keep fallback content when API is unavailable.
      }
    }

    loadFooterConfig();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <footer className="border-t border-white/10 bg-[#060911] py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xl font-semibold text-white">{brandName}</p>
          <p className="mt-2 max-w-md text-sm leading-7 text-zinc-400">
            {description}
          </p>
          <p className="mt-3 text-xs text-zinc-500">{legalText}</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
          <Link href={`mailto:${email}`} className="flex items-center gap-2 transition hover:text-white">
            <Mail className="h-4 w-4" />
            {email}
          </Link>
          <a href={phoneHref} className="flex items-center gap-2 transition hover:text-white">
            <Phone className="h-4 w-4" />
            {phone}
          </a>
          <a href={instagramUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 transition hover:text-white">
            <Instagram className="h-4 w-4" />
            Instagram
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a href={linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 transition hover:text-white">
            <Linkedin className="h-4 w-4" />
            LinkedIn
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
