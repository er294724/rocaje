'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: 'Ordenamos la operacion y recuperamos control en pocas semanas.',
    name: 'Gerente de Planta',
    role: 'Empresa de block',
  },
  {
    quote: 'Acompanan de principio a fin, con foco total en resultado.',
    name: 'Propietario',
    role: 'Empresa de adoquín',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonios" className="bg-[#0F172A] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 max-w-2xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#FF6200]">Testimonios</p>
          <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl">
            Clientes que ya mejoraron su operacion
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08 }}
              className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6"
            >
              <p className="text-base leading-7 text-gray-300">“{item.quote}”</p>
              <div className="mt-6">
                <p className="font-semibold text-white">{item.name}</p>
                <p className="text-sm text-gray-400">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <Link href="#contacto" className="mt-8 inline-flex rounded-full bg-[#FF6200] px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600">
          Quiero una propuesta
        </Link>
      </div>
    </section>
  );
}
