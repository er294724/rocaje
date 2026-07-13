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
            <h2 className="text-5xl font-bold tracking-tighter md:text-6xl">José Cabrera</h2>
            <p className="text-2xl text-gray-400">
              Con más de 15 años de experiencia real en plantas de block y adoquín, transformo operaciones con enfoque práctico y resultados medibles.
            </p>

            <div className="space-y-6 text-lg text-gray-300">
              <p>
                Ex-colaborador de <span className="font-semibold text-[#FF6200]">Evlok</span>, he acompañado a decenas de plantas en México a pasar de operar con pérdidas y cuellos de botella a trabajar con más productividad, menos tiempos muertos y mejor control del proceso.
              </p>
              <p>
                Mi trabajo no termina en una recomendación: acompaño al cliente desde la planeación, la obra civil, la instalación, la puesta en marcha y la capacitación del equipo para que la mejora se sostenga en el tiempo.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3">+85% Productividad</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3">Reducción de costos</div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3">Plantas autosuficientes</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
