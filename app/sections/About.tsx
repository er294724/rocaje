'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function About() {
  return (
    <section id="sobre-mi" className="relative overflow-hidden bg-[#0F1629] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="overflow-hidden rounded-3xl border border-white/10">
              <Image
                src="/about.jpg"
                alt="Planta industrial de producción"
                width={900}
                height={900}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -right-6 rounded-2xl bg-[#FF6200] px-8 py-4 font-semibold text-white">
              Consultoría industrial integral
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-5xl font-bold tracking-tighter md:text-6xl">Sobre Rocaje</h2>
            <p className="text-2xl text-gray-400">
              Rocaje Consultoría acompaña a plantas de block y adoquín en México con un enfoque práctico, técnico y orientado a resultados reales.
            </p>

            <div className="space-y-6 text-lg text-gray-300">
              <p>
                El trabajo se enfoca en fortalecer la operación desde la planificación inicial, pasando por la obra civil, la adquisición e instalación de equipos, la puesta en marcha y la capacitación del equipo humano.
              </p>
              <p>
                La propuesta combina criterio industrial, experiencia operativa y acompañamiento continuo para mejorar la productividad, reducir pérdidas y construir plantas más eficientes y sostenibles.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3">Enfoque industrial</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3">Acompañamiento integral</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3">Resultados medibles</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
