'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const defaultAboutHeadline = 'Ingenieria aplicada para plantas mas eficientes y rentables';

export default function About() {
  const [aboutHeadline, setAboutHeadline] = useState(defaultAboutHeadline);

  useEffect(() => {
    let alive = true;

    async function loadConfig() {
      try {
        const response = await fetch('/api/site-config', { cache: 'no-store' });
        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as { siteContent?: { aboutHeadline?: string } };
        if (alive && data.siteContent?.aboutHeadline) {
          setAboutHeadline(data.siteContent.aboutHeadline);
        }
      } catch {
        // Keep default copy when config endpoint is unavailable.
      }
    }

    loadConfig();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <section
      id="sobre-mi"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_#1A2645_0%,_#0F1629_45%,_#0B1020_100%)] py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-[#FF6200]/20 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#4E7FFF]/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative lg:col-span-5"
          >
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
              <Image
                src="/about.jpg"
                alt="Planta industrial en operación"
                width={1100}
                height={1300}
                className="aspect-[4/5] h-full w-full object-cover"
                priority
              />
            </div>

            <div className="absolute -bottom-5 right-4 rounded-2xl border border-white/20 bg-[#FF6200] px-5 py-3 text-sm font-semibold text-white shadow-xl sm:right-6 sm:text-base">
              Consultoría industrial integral
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="space-y-7 lg:col-span-7"
          >
            <div className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-gray-300 sm:text-sm">
              Sobre Rocaje
            </div>

            <h2 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">{aboutHeadline}</h2>

            <p className="max-w-2xl text-lg leading-relaxed text-gray-300 sm:text-xl">
              Rocaje Consultoría acompaña a plantas de block y adoquín en México con un enfoque técnico, práctico y orientado a resultados medibles desde la primera etapa del proyecto.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-200">Cobertura</p>
                <p className="mt-1 text-sm text-gray-400">Diagnóstico, diseño operativo y puesta en marcha.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-200">Acompañamiento</p>
                <p className="mt-1 text-sm text-gray-400">Capacitación del equipo y mejora continua en planta.</p>
              </div>
            </div>

            <div className="space-y-4 text-base leading-relaxed text-gray-300 sm:text-lg">
              <p>
                El trabajo se centra en fortalecer la operación desde la planificación inicial, pasando por la obra civil, la selección e instalación de equipos y la estandarización de procesos en piso.
              </p>
              <p>
                La propuesta integra criterio industrial y experiencia operativa para elevar la productividad, reducir pérdidas y construir operaciones más estables, seguras y sostenibles.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-sm font-medium text-gray-200">
              <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2">Enfoque industrial</span>
              <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2">Acompañamiento integral</span>
              <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2">Resultados medibles</span>
            </div>

            <div className="pt-2">
              <Link
                href="#contacto"
                className="inline-flex items-center rounded-full bg-[#FF6200] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#ff7a2d] sm:text-base"
              >
                Ir a Contacto
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
