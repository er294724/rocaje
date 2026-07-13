'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';

const results = [
  { value: '+85%', label: 'Productividad real' },
  { value: '30%', label: 'Reducción en tiempos muertos' },
  { value: '20%', label: 'Ahorro de cemento' },
  { value: '100%', label: 'Enfoque práctico' },
];

export default function Results() {
  return (
    <section id="resultados" className="bg-[#090E17] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-6"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-[#FF6200]">Resultados</p>
            <h2 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl">
              Cuando la mejora se vuelve rentable, la planta cambia.
            </h2>
            <p className="text-lg leading-8 text-gray-400">
              Nuestro objetivo es que cada proyecto deje una planta más estable, más productiva y más preparada para competir con mejores márgenes y menos pérdidas.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="rounded-full border border-[#FF6200]/30 bg-[#FF6200]/10 px-5 py-3 text-sm font-medium text-[#FF6200]">
                Acompañamiento real
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white">
                Mejoras a largo plazo
              </div>
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {results.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/8 to-white/5 p-8"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF6200]/15 text-[#FF6200]">
                  {index % 2 === 0 ? <BarChart3 className="h-6 w-6" /> : <TrendingUp className="h-6 w-6" />}
                </div>
                <p className="text-4xl font-semibold text-white">{item.value}</p>
                <p className="mt-2 text-sm text-gray-400">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
