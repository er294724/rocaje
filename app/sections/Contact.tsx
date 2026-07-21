'use client';
import { useState, useEffect } from 'react';

type ContactData = {
  title: string;
  description: string;
  email: string;
  phone: string;
};

type SiteConfigResponse = {
  contact?: {
    email?: string;
    phone?: string;
    message?: string;
  };
  siteContent?: {
    contactHeadline?: string;
  };
};

export default function Contact() {
  const [contactData, setContactData] = useState<ContactData>({
    title: 'Hablemos de la siguiente mejora de tu planta.',
    description: 'Si buscas elevar la productividad de tu planta, optimizar procesos y dejar una operacion mas solida, podemos trabajar juntos.',
    email: 'hola@rocaje.com',
    phone: '+52 55 1234 5678',
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  useEffect(() => {
    let alive = true;

    fetch('/api/site-config', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data: SiteConfigResponse) => {
        if (!alive) {
          return;
        }

        setContactData((prev) => ({
          title: data.siteContent?.contactHeadline || prev.title,
          description: data.contact?.message || prev.description,
          email: data.contact?.email || prev.email,
          phone: data.contact?.phone || prev.phone,
        }));
      })
      .catch(() => {
        // Keep fallback values when API is unavailable.
      });

    return () => {
      alive = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Enviando...');

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setStatus('✅ Mensaje enviado. Gracias!');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } else {
      setStatus('Error al enviar. Intentalo de nuevo.');
    }
  };

  return (
    <section id="contacto" className="py-24 bg-black">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold tracking-tighter mb-4">{contactData.title}</h2>
          <p className="text-xl text-gray-400">{contactData.description}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-3xl p-10 space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <input type="text" placeholder="Nombre completo" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4" />
            <input type="email" placeholder="Correo electronico" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4" />
          </div>

          <input type="tel" placeholder="Telefono / WhatsApp" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4" />

          <textarea placeholder="Cuentanos sobre tu planta y objetivos..." value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required rows={6} className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-4" />

          <button type="submit" className="w-full bg-[#FF6200] hover:bg-orange-600 py-5 rounded-2xl font-semibold text-lg">
            Enviar Mensaje
          </button>

          {status && <p className="text-center mt-4">{status}</p>}
        </form>

        <div className="text-center mt-10 text-gray-400">
          O escribenos directamente a <a href={`mailto:${contactData.email}`} className="text-[#FF6200]">{contactData.email}</a>
        </div>
      </div>
    </section>
  );
}
