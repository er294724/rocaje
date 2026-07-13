'use client';

import { motion } from 'framer-motion';
import { Factory, Palette, ShieldCheck, TrendingUp, Users, Wrench } from 'lucide-react';

const services = [
  {
    icon: Factory,
    title: 'Asesoría Completa Llave en Mano',
    desc: 'Desde obra civil hasta puesta en marcha completa de tu planta de block y adoquín.',
    highlight: 'Proyecto integral',
  },
  {
    icon: TrendingUp,
    title: 'Optimización de Producción',
    desc: 'Alcanza +85% de productividad real con reducción significativa de tiempos muertos.',
    highlight: 'Productividad garantizada',
  },
  {
    icon: Palette,
    title: 'Diseño de Mezclas',
    desc: 'Fórmulas optimizadas para máximo ahorro de cemento manteniendo calidad premium.',
    highlight: 'Ahorro de cemento',
  },
  {
    icon: Users,
    title: 'Capacitación y Formación',
    desc: 'Personal altamente capacitado y autónomo. Tu planta funciona sin depender de externos.',
    highlight: 'Equipo autónomo',
  },
  {
    icon: Wrench,
    title: 'Instalación y Mantenimiento',
    desc: 'Compra, instalación, puesta en marcha y mantenimiento de maquinaria (próximo distribuidor Poyatos).',
    highlight: 'Soporte técnico',
  },
  {
    icon: ShieldCheck,
    title: 'Servicio Integral por Proyecto',
    desc: 'Acompañamiento continuo con resultados medibles y mejoras constantes.',
    highlight: 'Resultados medibles',
  },
];

export default function Services() {
  return (
    <section id="servicios" className="bg-[#0A0F1C] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-5xl font-bold tracking-tighter md:text-6xl">Servicios que generan resultados reales</h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-400">
            Diseñamos soluciones integrales para que tu planta produzca más, pierda menos tiempo y opere con mayor rentabilidad desde el primer día.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="group rounded-3xl border border-white/10 bg-white/5 p-10 transition-all duration-500 hover:border-[#FF6200]/50"
              >
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF6200] to-orange-600 transition-transform group-hover:scale-110">
                  <Icon className="h-9 w-9 text-white" />
                </div>

                <h3 className="mb-4 text-2xl font-semibold">{service.title}</h3>
                <p className="mb-6 leading-relaxed text-gray-400">{service.desc}</p>

                <div className="inline-block rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-[#FF6200]">
                  {service.highlight}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
