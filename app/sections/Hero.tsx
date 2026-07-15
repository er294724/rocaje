'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center bg-[#0A0F1C] overflow-hidden">
      {/* Fondo visual premium */}
      <div className="absolute inset-0 bg-[radial-gradient(at_center,#FF6200_0%,transparent_70%)] opacity-10" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-full px-8 py-3 mb-10 text-sm tracking-widest">
            CONSULTORÍA INDUSTRIAL ESPECIALIZADA
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-3px] leading-none mb-8">
            ROCAJE
          </h1>

          <p className="text-2xl md:text-3xl text-gray-200 max-w-4xl mx-auto mb-12 leading-tight">
            Consultoría industrial para plantas de block y adoquín en México.<br />
            Acompañamos tu proyecto desde la planificación hasta la producción con resultados reales.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.a
              href="#contacto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#FF6200] hover:bg-orange-600 px-12 py-6 rounded-2xl font-semibold text-2xl flex items-center gap-4 transition-all shadow-xl"
            >
              Solicitar Asesoría
              <ArrowRight className="w-7 h-7" />
            </motion.a>

            <motion.a
              href="#servicios"
              whileHover={{ scale: 1.05 }}
              className="border border-white/50 hover:border-white px-10 py-6 rounded-2xl font-medium text-2xl flex items-center gap-3 transition-all"
            >
              <Play className="w-6 h-6" /> Ver Servicios
            </motion.a>
          </div>

          <div className="flex justify-center gap-12 mt-20 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-[#FF6200] rounded-full" />
              Planificación completa
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-[#FF6200] rounded-full" />
              +85% Productividad
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-[#FF6200] rounded-full" />
              Resultados sostenibles
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
