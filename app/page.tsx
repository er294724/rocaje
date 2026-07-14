"use client";

import { ArrowRight, Cpu, Layers3, Orbit, Sparkles, Wand2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./sections/About";
import AnalyticsNote from "./sections/AnalyticsNote";
import Contact from "./sections/Contact";
import Hero from "./sections/Hero";
import Methodology from "./sections/Methodology";
import Results from "./sections/Results";
import Services from "./sections/Services";
import Testimonials from "./sections/Testimonials";
import WhyUs from "./sections/WhyUs";

const navItems = ["Inicio", "Servicios", "Proyectos", "Contacto"];

const services = [
  {
    icon: Orbit,
    title: "Brand systems",
    text: "Estrategias visuales y narrativas que dotan a la marca de una identidad clara y premium.",
  },
  {
    icon: Layers3,
    title: "Interfaces de alto impacto",
    text: "Diseño web y producto con jerarquía, ritmo visual y una experiencia impecable en cada scroll.",
  },
  {
    icon: Cpu,
    title: "Tecnología inteligente",
    text: "Implementación moderna con Next.js, rendimiento, SEO y flujos optimizados para conversión.",
  },
];

const projects = [
  {
    title: "North Studio",
    type: "Rebranding + Web",
    description: "Un ecosistema visual más sólido y una experiencia de navegación superior para una marca premium.",
  },
  {
    title: "Aurelia Labs",
    type: "Producto digital",
    description: "Una plataforma diseñada para transformar procesos internos en una experiencia fluida y elegante.",
  },
  {
    title: "Volt Motion",
    type: "Campaña + presencia",
    description: "Una identidad potente que mezcla tecnología, movimiento y una narrativa más contundente.",
  },
];

const stats = [
  { value: "10+", label: "proyectos entregados" },
  { value: "4x", label: "más engagement" },
  { value: "100%", label: "enfoque premium" },
];

export default function HomePage() {
  return (
    <main id="inicio" className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(217,119,6,0.2),_transparent_34%),radial-gradient(circle_at_80%_20%,_rgba(255,255,255,0.08),_transparent_24%)]" />
      <div className="absolute inset-0 -z-10 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:56px_56px]" />

      <Navbar />
      <Hero />

      <About />
      <Services />
      <Methodology />
      <Results />
      <WhyUs />
      <Testimonials />
      <AnalyticsNote />
      <Contact />

      <section id="servicios" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-10 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-300">Servicios</p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Diseño, estrategia y ejecución con enfoque premium.</h2>
          </div>
          <p className="max-w-xl text-zinc-400">Cada proyecto combina estética, claridad y performance para que la marca se sienta distinta desde el primer clic.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article key={service.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.4, delay: index * 0.1 }} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/15 text-brand-300">
                  <Icon size={22} />
                </div>
                <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{service.text}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section id="proyectos" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-10 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-300">Proyectos</p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Entregas con identidad, movimiento y alto impacto.</h2>
          </div>
          <p className="max-w-xl text-zinc-400">Creamos experiencias que no se parecen a todo lo demás: más claras, más memorables y más efectivas.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article key={project.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4, delay: index * 0.08 }} className="group rounded-[1.5rem] border border-white/10 bg-zinc-900/70 p-6 transition hover:-translate-y-1 hover:border-brand-500/40">
              <div className="mb-6 h-36 rounded-[1.1rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(217,119,6,0.18))]" />
              <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">{project.type}</p>
              <h3 className="mt-3 text-xl font-semibold text-white">{project.title}</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-400">{project.description}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-300">
                Explorar <ArrowRight size={16} />
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="contacto" className="mx-auto max-w-7xl px-6 pb-20 pt-8 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} className="rounded-[2rem] border border-brand-500/20 bg-gradient-to-br from-brand-500/15 to-white/5 p-8 lg:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.3em] text-brand-300">Contacto</p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Listo para llevar tu marca a un siguiente nivel.</h2>
              <p className="mt-4 text-zinc-400">Si buscas una presencia digital más potente, más elegante y más eficaz, estamos listos para trabajar contigo.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="mailto:hola@rocaje.com" className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-3 font-medium text-white transition hover:bg-brand-600">
                Escribir a Rocaje <ArrowRight size={18} />
              </Link>
              <a href="#inicio" className="rounded-full border border-white/10 px-5 py-3 font-medium text-zinc-200 transition hover:bg-white/10">
                Volver arriba
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
