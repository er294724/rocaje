'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BarChart3, Factory, ShieldCheck, Users } from 'lucide-react';

const reasons = [
  {
    icon: Factory,
    title: 'Servicio integral',
    desc: 'Desde diagnostico hasta puesta en marcha y estabilizacion.',
  },
  {
    icon: Users,
    title: 'Acompanamiento real',
    desc: 'Trabajamos contigo en planta, no solo desde oficina.',
  },
  {
    icon: BarChart3,
    title: 'Resultados medibles',
    desc: 'Productividad, merma y tiempos muertos con seguimiento claro.',
  },
  {
    icon: ShieldCheck,
    title: 'Operacion mas estable',
    desc: 'Procesos mas seguros, repetibles y sostenibles en el tiempo.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
};

export default function WhyUs() {
  return (
    <section id="por-que-elegirnos" className="relative overflow-hidden bg-[#0A0F1C] py-24">
      <div className="pointer-events-none absolute inset-0 opacity-35">
        <div className="absolute left-[-120px] top-6 h-72 w-72 rounded-full bg-[#FF6200]/20 blur-3xl" />
        <div className="absolute bottom-[-140px] right-[-80px] h-96 w-96 rounded-full bg-cyan-400/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#FF6200]">Diferencial Rocaje</p>
          <h2 className="mb-4 text-5xl font-bold tracking-tighter">Por qué elegir Rocaje</h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-400">
            Combinamos criterio tecnico con ejecucion en campo para transformar resultados operativos en pocas semanas.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-6 sm:grid-cols-2"
          >
            {reasons.map((reason, index) => {
              const Icon = reason.icon;

              return (
                <motion.div
                  key={reason.title}
                  variants={cardVariants}
                  whileHover={{ y: -8, scale: 1.015 }}
                  transition={{ duration: 0.25 }}
                  className="group rounded-3xl border border-white/10 bg-gradient-to-b from-white/8 to-white/[0.03] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF6200]/15 text-[#FF6200] transition group-hover:bg-[#FF6200]/25 group-hover:shadow-[0_0_30px_rgba(255,98,0,0.25)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-white">{reason.title}</h3>
                  <p className="leading-7 text-gray-400">{reason.desc}</p>
                  <div className="mt-5 h-[2px] w-0 bg-[#FF6200] transition-all duration-300 group-hover:w-16" />
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24, scale: 0.98 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.28)]"
          >
            <div className="group relative overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="/about.jpg"
                alt="Planta de block y adoquin en operacion industrial"
                width={900}
                height={700}
                className="h-[280px] w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C]/80 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-xs font-semibold tracking-wide text-white">
                BLOCK | ADOQUIN
              </span>
            </div>

            <div className="mt-6">
              <p className="text-sm uppercase tracking-[0.2em] text-[#FF6200]">Enfoque practico</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Menos teoria, mas avance operativo</h3>
              <p className="mt-3 text-gray-400 leading-7">
                Nuestro objetivo es que tu equipo gane claridad, control y velocidad de ejecucion con un plan simple y accionable.
              </p>
              <Link
                href="#contacto"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#FF6200] px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Quiero esta mejora
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
