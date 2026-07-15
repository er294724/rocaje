import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Hero from "./sections/Hero";
import Results from "./sections/Results";
import Services from "./sections/Services";
import Testimonials from "./sections/Testimonials";
import WhyUs from "./sections/WhyUs";

export default function HomePage() {
  return (
    <main id="inicio" className="relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(217,119,6,0.2),_transparent_34%),radial-gradient(circle_at_80%_20%,_rgba(255,255,255,0.08),_transparent_24%)]" />
      <div className="absolute inset-0 -z-10 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:56px_56px]" />

      <Navbar />
      <Hero />

      <About />
      <Services />
      <Results />
      <WhyUs />
      <Testimonials />
      <Contact />

      <Footer />
    </main>
  );
}
