'use client';

import { motion } from 'framer-motion';
import { BadgeCheck, BrainCircuit, Clock3, Handshake } from 'lucide-react';

const reasons = [
  {
    icon: BrainCircuit,
    title: 'Mentoría real y práctica',
    text: 'No solo damos recomendaciones: acompañamos, corregimos y hacemos que las mejoras se materialicen.',
  },
  {
    icon: Clock3,
    title: 'Resultados rápidos y medibles',
    text: 'Cada acción está orientada a mejorar productividad, rendimiento y control del proceso.',
  },
  {
    icon: Handshake,
    title: 'Trabajo cercano y comprometido',
    text: 'Tu proyecto se maneja con enfoque humano, criterio industrial y responsabilidad total.',
  },
  {
    icon: BadgeCheck,
    title: 'Enfoque de largo plazo',
    text: 'No buscamos soluciones temporales: dejamos una planta más fuerte, más estable y más preparada.',
  },
];

export default function WhyUs() {
  return (
    <section id="por-que" className="bg-[#0B1220] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#FF6200]">Por qué elegir Rocaje</p>
          <h2 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl">
            Porque cada decisión está hecha para que tu planta produzca más y pierda menos.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[1.5rem] border border-white/10 bg-white/5 p-8"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF6200]/15 text-[#FF6200]">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-semibold text-white">{reason.title}</h3>
                <p className="mt-3 leading-7 text-gray-400">{reason.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
