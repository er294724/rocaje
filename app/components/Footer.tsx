'use client';

import Link from 'next/link';
import { ArrowUpRight, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#060911] py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xl font-semibold text-white">Rocaje</p>
          <p className="mt-2 max-w-md text-sm leading-7 text-zinc-400">
            Diseño, estrategia y acompañamiento industrial para marcas y plantas que buscan crecer con claridad.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
          <Link href="mailto:hola@rocaje.com" className="flex items-center gap-2 transition hover:text-white">
            <Mail className="h-4 w-4" />
            hola@rocaje.com
          </Link>
          <a href="tel:+525512345678" className="flex items-center gap-2 transition hover:text-white">
            <Phone className="h-4 w-4" />
            +52 55 1234 5678
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 transition hover:text-white">
            <Instagram className="h-4 w-4" />
            Instagram
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 transition hover:text-white">
            <Linkedin className="h-4 w-4" />
            LinkedIn
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
