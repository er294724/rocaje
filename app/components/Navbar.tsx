'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const navItems = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Metodología', href: '#metodologia' },
  { label: 'Resultados', href: '#resultados' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#050816]/85 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="#inicio" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#FF6200]/30 bg-[#FF6200]/10 text-sm font-semibold text-[#FF6200] shadow-[0_0_20px_rgba(255,98,0,0.18)]">
            R
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white">Rocaje</p>
            <p className="text-xs text-zinc-400">Consultoría industrial</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative text-sm font-medium text-zinc-300 transition hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#FF6200] after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="#contacto"
            className="inline-flex items-center gap-2 rounded-full border border-[#FF6200]/30 bg-[#FF6200]/10 px-4 py-2 text-sm font-semibold text-[#FF6200] transition-all hover:-translate-y-0.5 hover:bg-[#FF6200]/20"
          >
            Hablemos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          className="rounded-full border border-white/10 bg-white/5 p-2 text-zinc-200 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Abrir menú"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="border-t border-white/10 bg-[#050816]/95 px-6 py-5 md:hidden"
        >
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-zinc-300 transition hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#contacto"
              className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#FF6200] px-4 py-2 text-sm font-semibold text-white"
              onClick={() => setIsOpen(false)}
            >
              Solicitar asesoría <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}
