'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Mail, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contacto" className="bg-[#090E17] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="rounded-[2rem] border border-[#FF6200]/20 bg-gradient-to-br from-[#FF6200]/15 to-white/5 p-8 lg:p-10"
        >
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#FF6200]">Contacto</p>
              <h2 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl">
                Hablemos de tu siguiente mejora industrial.
              </h2>
              <p className="mt-5 text-lg leading-8 text-gray-400">
                Si buscas elevar la productividad de tu planta, optimizar procesos y dejar una operación más sólida, podemos trabajar juntos.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <Link href="mailto:hola@rocaje.com" className="inline-flex items-center gap-3 rounded-full bg-[#FF6200] px-5 py-3 font-medium text-white transition hover:bg-[#ff7a2d]">
                <Mail className="h-5 w-5" />
                hola@rocaje.com
              </Link>
              <a href="tel:+525512345678" className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 font-medium text-zinc-200 transition hover:bg-white/10">
                <Phone className="h-5 w-5" />
                +52 55 1234 5678
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
