'use client';
import { motion } from 'framer-motion';
import { Factory, TrendingUp, Users, Wrench } from 'lucide-react';

const services = [
  { icon: Factory, title: "Proyecto Completo", desc: "Obra civil, instalación y puesta en marcha." },
  { icon: TrendingUp, title: "+85% Productividad", desc: "Reducimos tiempos muertos y optimizamos producción." },
  { icon: Users, title: "Capacitación", desc: "Tu equipo opera de forma autónoma y eficiente." },
  { icon: Wrench, title: "Mantenimiento", desc: "Refacciones y soporte técnico continuo." },
];

export default function Services() {
  return (
    <section id="servicios" className="py-24 bg-[#0A0F1C]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold tracking-tighter mb-4">Servicios</h2>
          <p className="text-xl text-gray-400">Soluciones prácticas para tu planta de block y adoquín.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 hover:border-[#FF6200] p-8 rounded-3xl transition-all"
            >
              <service.icon className="w-10 h-10 text-[#FF6200] mb-6" />
              <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-400">{service.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a href="#contacto" className="bg-[#FF6200] hover:bg-orange-600 px-12 py-5 rounded-2xl font-semibold text-lg inline-block">
            Quiero mejorar mi planta →
          </a>
        </div>
      </div>
    </section>
  );
}
