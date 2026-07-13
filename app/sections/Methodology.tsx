'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, Compass, Factory, Rocket } from 'lucide-react';

const steps = [
  {
    title: 'Diagnóstico Industrial',
    text: 'Analizamos la planta, los procesos, los cuellos de botella y el potencial real de mejora.',
    icon: Compass,
  },
  {
    title: 'Diseño de Plan de Acción',
    text: 'Construimos una ruta clara, práctica y rentable para transformar la operación.',
    icon: Factory,
  },
  {
    title: 'Ejecución y Acompañamiento',
    text: 'Implementamos cambios, entrenamos al equipo y medimos resultados en tiempo real.',
    icon: Rocket,
  },
  {
    title: 'Sostenibilidad del Resultado',
    text: 'Dejamos procesos más eficientes, más seguros y más autónomos para el negocio.',
    icon: BadgeCheck,
  },
];

export default function Methodology() {
  return (
    <section id="metodologia" className="bg-[#0F172A] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#FF6200]">Metodología</p>
          <h2 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl">
            Un proceso práctico para convertir problemas en resultados.
          </h2>
          <p className="mt-5 text-lg leading-8 text-gray-400">
            No solo diagnosticamos. Acompañamos cada etapa con criterio industrial, foco en producción y acciones concretas que impactan directamente la rentabilidad de tu planta.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[1.5rem] border border-white/10 bg-white/5 p-8"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF6200]/15 text-[#FF6200]">
                  <Icon className="h-7 w-7" />
                </div>
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">Paso {index + 1}</span>
                </div>
                <h3 className="text-2xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 leading-7 text-gray-400">{step.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
