'use client';

import { motion } from 'framer-motion';
import { BarChart3, Eye, MapPin, Smartphone } from 'lucide-react';

export default function AnalyticsNote() {
  return (
    <section className="bg-[#0A0F1C] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/8 to-white/5 p-8 lg:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#FF6200]">Analítica avanzada</p>
              <h3 className="text-3xl font-semibold text-white sm:text-4xl">
                Mide qué funciona y convierte mejor cada visita.
              </h3>
              <p className="mt-4 text-lg leading-8 text-gray-400">
                Para el siguiente paso, puedes integrar herramientas como PostHog o Umami para ver tráfico, origen, país, dispositivo y conversiones en tiempo real.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-5">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF6200]/15 text-[#FF6200]">
                  <Eye className="h-6 w-6" />
                </div>
                <p className="text-xl font-semibold text-white">Visitas y páginas</p>
                <p className="mt-2 text-sm text-gray-400">Mira qué secciones generan más interés.</p>
              </div>
              <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-5">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF6200]/15 text-[#FF6200]">
                  <Smartphone className="h-6 w-6" />
                </div>
                <p className="text-xl font-semibold text-white">Dispositivos y origen</p>
                <p className="mt-2 text-sm text-gray-400">Identifica desde dónde llegan tus leads.</p>
              </div>
              <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-5">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF6200]/15 text-[#FF6200]">
                  <MapPin className="h-6 w-6" />
                </div>
                <p className="text-xl font-semibold text-white">País y ciudad</p>
                <p className="mt-2 text-sm text-gray-400">Descubre de dónde vienen tus clientes potenciales.</p>
              </div>
              <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-5">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF6200]/15 text-[#FF6200]">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <p className="text-xl font-semibold text-white">Conversiones</p>
                <p className="mt-2 text-sm text-gray-400">Sigue cuántos usuarios intentan contactar.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
