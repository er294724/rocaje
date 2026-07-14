'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0A0F1C]">
      <div className="absolute inset-0 bg-[radial-gradient(at_center,#FF6200_0%,transparent_70%)] opacity-10" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-2">
            <span className="text-sm font-semibold tracking-widest text-[#FF6200]">ROCJAJE</span>
          </div>

          <h1 className="mb-8 text-6xl font-bold leading-none tracking-tighter md:text-7xl lg:text-8xl">
            CONSULTORÍA INTEGRAL
            <br />
            PARA <span className="text-[#FF6200]">PLANTAS DE BLOCK Y ADOQUÍN</span>
          </h1>

          <p className="mx-auto mb-12 max-w-3xl text-2xl text-gray-300">
            Acompañamos proyectos desde la planificación inicial hasta la puesta en marcha, con foco en productividad, eficiencia operativa y resultados sostenibles.
          </p>

          <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
            <motion.a
              href="#contacto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-3 rounded-2xl bg-[#FF6200] px-10 py-5 text-xl font-semibold transition-all hover:bg-orange-600"
            >
              Solicitar asesoría
              <ArrowRight className="transition group-hover:translate-x-1" />
            </motion.a>

            <motion.a
              href="#servicios"
              className="flex items-center gap-3 rounded-2xl border border-white/30 px-8 py-5 text-lg font-medium transition-all hover:border-white/60"
            >
              <Play className="h-5 w-5" /> Ver servicios
            </motion.a>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <div>✅ Planificación integral</div>
            <div>✅ Ejecución y puesta en marcha</div>
            <div>✅ Mejora continua</div>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center text-sm text-gray-500"
      >
        DESLIZA PARA DESCUBRIR
        <div className="mt-2 h-12 w-px bg-gradient-to-b from-transparent via-gray-500 to-transparent" />
      </motion.div>
    </section>
  );
}
