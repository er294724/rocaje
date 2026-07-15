'use client';
import { motion } from 'framer-motion';

const results = [
  { value: "+85%", label: "Productividad" },
  { value: "-30%", label: "Tiempos Muertos" },
  { value: "-20%", label: "Cemento" },
];

export default function Results() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold tracking-tighter mb-12">Resultados Reales</h2>
        <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
          {results.map((result, index) => (
            <motion.div key={index} initial={{ scale: 0.9 }} whileInView={{ scale: 1 }} className="text-center">
              <div className="text-6xl font-bold text-[#FF6200] mb-3">{result.value}</div>
              <div className="text-xl text-gray-400">{result.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
