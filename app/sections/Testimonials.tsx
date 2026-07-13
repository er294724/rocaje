'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: 'Rocaje nos ayudó a ordenar la planta, mejorar procesos y ganar claridad operativa. El cambio fue real desde el primer mes.',
    name: 'Gerente de Planta',
    role: 'Empresa de block',
  },
  {
    quote: 'La metodología fue muy clara, práctica y orientada a resultados. Se sintió un acompañamiento serio y profesional.',
    name: 'Director de Operaciones',
    role: 'Grupo industrial',
  },
  {
    quote: 'Desde la primera reunión entendimos que había una propuesta de valor real. Nos dio herramientas y confianza para avanzar.',
    name: 'Propietario',
    role: 'Empresa de adoquín',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonios" className="bg-[#0F172A] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#FF6200]">Testimonios</p>
          <h2 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl">
            Lo que dicen quienes han trabajado con Rocaje.
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08 }}
              className="rounded-[1.5rem] border border-white/10 bg-white/5 p-8"
            >
              <p className="text-lg leading-8 text-gray-300">“{item.quote}”</p>
              <div className="mt-8">
                <p className="font-semibold text-white">{item.name}</p>
                <p className="text-sm text-gray-400">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
