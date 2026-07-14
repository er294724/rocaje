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
                src="/jose-cabrera.jpg"
                alt="José Cabrera"
                width={900}
                height={900}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -right-6 rounded-2xl bg-[#FF6200] px-8 py-4 font-semibold text-white">
              Ex-Colaborador Evlok
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-5xl font-bold tracking-tighter md:text-6xl">Sobre José Cabrera</h2>
            <p className="text-2xl text-gray-400">
              Con más de 15 años de experiencia real en plantas de block y adoquín, José Cabrera transforma operaciones con criterio técnico, visión industrial y foco en resultados medibles.
            </p>

            <div className="space-y-6 text-lg text-gray-300">
              <p>
                Ex-colaborador de <span className="font-semibold text-[#FF6200]">Evlok</span>, ha acompañado a decenas de plantas en México a pasar de operar con pérdidas y cuellos de botella a trabajar con más productividad, menos tiempos muertos y mejor control del proceso.
              </p>
              <p>
                Su enfoque va más allá de la recomendación: diseña soluciones concretas, acompaña desde la planeación y la obra civil hasta la instalación, puesta en marcha y capacitación del equipo para que la mejora se sostenga en el tiempo.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3">15+ años de experiencia</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3">Enfoque práctico</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3">Resultados sostenibles</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
