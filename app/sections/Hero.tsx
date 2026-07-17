'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Factory, Gauge, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#070B14] pb-24 pt-28 sm:pb-28 sm:pt-32 lg:min-h-[92vh] lg:pt-36">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,_rgba(255,98,0,0.22)_0%,_rgba(255,98,0,0)_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,_rgba(78,127,255,0.16)_0%,_rgba(78,127,255,0)_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:140px_140px,72px_72px] opacity-[0.14]" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-[#FF6200]/20 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.15 }}
        className="pointer-events-none absolute -right-16 top-36 h-72 w-72 rounded-full bg-[#4E7FFF]/20 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-300 sm:text-sm">
            <CheckCircle2 className="h-4 w-4 text-[#FF6200]" />
            Consultoria industrial con resultados medibles
          </p>

          <h1 className="mt-7 text-balance text-5xl font-black tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            Eficiencia real para tu
            <span className="block text-[#FF6200]">planta de block y adoquin</span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-pretty text-lg leading-relaxed text-zinc-300 sm:text-xl">
            Diseñamos, optimizamos y aceleramos operaciones industriales con enfoque tecnico y ejecucion en campo. Menos improvisacion, mas productividad y control.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.a
              href="#contacto"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-[#FF6200] px-8 py-4 text-base font-semibold text-white transition hover:bg-[#ff7a2d] sm:w-auto sm:px-10"
            >
              Solicitar diagnostico
              <ArrowRight className="h-5 w-5" />
            </motion.a>

            <motion.a
              href="#servicios"
              whileHover={{ scale: 1.03 }}
              className="inline-flex w-full items-center justify-center rounded-2xl border border-white/20 bg-white/[0.03] px-8 py-4 text-base font-medium text-zinc-200 transition hover:border-white/40 hover:bg-white/[0.07] sm:w-auto sm:px-10"
            >
              Ver servicios
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-3"
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-zinc-300">
              <Factory className="h-4 w-4 text-[#FF6200]" />
              Operacion
            </div>
            <p className="mt-2 text-2xl font-bold text-white">360°</p>
            <p className="mt-1 text-sm text-zinc-400">Planeacion, puesta en marcha y mejora continua.</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-zinc-300">
              <Gauge className="h-4 w-4 text-[#FF6200]" />
              Productividad
            </div>
            <p className="mt-2 text-2xl font-bold text-white">+85%</p>
            <p className="mt-1 text-sm text-zinc-400">Optimiza tiempos, reduce desperdicio y estabiliza output.</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-zinc-300">
              <ShieldCheck className="h-4 w-4 text-[#FF6200]" />
              Soporte
            </div>
            <p className="mt-2 text-2xl font-bold text-white">En campo</p>
            <p className="mt-1 text-sm text-zinc-400">Acompañamiento tecnico para decisiones de alto impacto.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
