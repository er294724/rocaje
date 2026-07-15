'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Instagram, Linkedin, Mail, Phone } from 'lucide-react';
import { FormEvent, useEffect, useMemo, useState } from 'react';

type ContactConfig = {
  siteContent?: {
    contactHeadline?: string;
  };
  contact?: {
    email?: string;
    phone?: string;
    message?: string;
    instagramUrl?: string;
    linkedinUrl?: string;
  };
};

export default function Contact() {
  const [contactHeadline, setContactHeadline] = useState('Hablemos de tu siguiente mejora industrial.');
  const [email, setEmail] = useState('hola@rocaje.com');
  const [phone, setPhone] = useState('+52 55 1234 5678');
  const [message, setMessage] = useState('Si buscas elevar la productividad de tu planta, optimizar procesos y dejar una operacion mas solida, podemos trabajar juntos.');
  const [instagramUrl, setInstagramUrl] = useState('https://instagram.com/rocaje');
  const [linkedinUrl, setLinkedinUrl] = useState('https://linkedin.com/company/rocaje');
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitNotice, setSubmitNotice] = useState<{ type: 'ok' | 'error'; message: string } | null>(null);

  const phoneHref = useMemo(() => `tel:${phone.replace(/\s+/g, '')}`, [phone]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setSubmitNotice(null);

    try {
      const response = await fetch('/api/contact-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          phone: formPhone,
          message: formMessage,
        }),
      });

      if (!response.ok) {
        throw new Error('No se pudo enviar el formulario.');
      }

      setFormName('');
      setFormEmail('');
      setFormPhone('');
      setFormMessage('');
      setSubmitNotice({ type: 'ok', message: 'Mensaje enviado. Te contactaremos pronto.' });
    } catch {
      setSubmitNotice({ type: 'error', message: 'No se pudo enviar tu mensaje. Intenta de nuevo.' });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    let alive = true;

    async function loadConfig() {
      try {
        const response = await fetch('/api/site-config', { cache: 'no-store' });
        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as ContactConfig;

        if (!alive) {
          return;
        }

        if (data.siteContent?.contactHeadline) {
          setContactHeadline(data.siteContent.contactHeadline);
        }

        if (data.contact?.email) {
          setEmail(data.contact.email);
        }

        if (data.contact?.phone) {
          setPhone(data.contact.phone);
        }

        if (data.contact?.message) {
          setMessage(data.contact.message);
        }

        if (data.contact?.instagramUrl) {
          setInstagramUrl(data.contact.instagramUrl);
        }

        if (data.contact?.linkedinUrl) {
          setLinkedinUrl(data.contact.linkedinUrl);
        }
      } catch {
        // Keep default copy when config endpoint is unavailable.
      }
    }

    loadConfig();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <section id="contacto" className="bg-[#090E17] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="rounded-[2rem] border border-[#FF6200]/20 bg-gradient-to-br from-[#FF6200]/15 to-white/5 p-8 lg:p-10"
        >
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="max-w-2xl space-y-5">
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#FF6200]">Contacto</p>
              <h2 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl">{contactHeadline}</h2>
              <p className="mt-5 text-lg leading-8 text-gray-400">{message}</p>

              <div className="flex flex-col gap-4">
              <Link href={`mailto:${email}`} className="inline-flex items-center gap-3 rounded-full bg-[#FF6200] px-5 py-3 font-medium text-white transition hover:bg-[#ff7a2d]">
                <Mail className="h-5 w-5" />
                {email}
              </Link>
              <a href={phoneHref} className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 font-medium text-zinc-200 transition hover:bg-white/10">
                <Phone className="h-5 w-5" />
                {phone}
              </a>
              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:bg-white/10"
                >
                  <Instagram className="h-4 w-4" />
                  Instagram
                </a>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:bg-white/10"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

            <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold text-white">Solicitar asesoria</h3>
              <p className="mt-1 text-sm text-zinc-400">Tu solicitud llega directo al dashboard interno.</p>

              <div className="mt-4 grid gap-3">
                <input
                  required
                  value={formName}
                  onChange={(event) => setFormName(event.target.value)}
                  placeholder="Nombre"
                  className="rounded-xl border border-white/10 bg-[#090E17] px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-[#FF6200]/70"
                />
                <input
                  required
                  type="email"
                  value={formEmail}
                  onChange={(event) => setFormEmail(event.target.value)}
                  placeholder="Correo"
                  className="rounded-xl border border-white/10 bg-[#090E17] px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-[#FF6200]/70"
                />
                <input
                  value={formPhone}
                  onChange={(event) => setFormPhone(event.target.value)}
                  placeholder="Telefono (opcional)"
                  className="rounded-xl border border-white/10 bg-[#090E17] px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-[#FF6200]/70"
                />
                <textarea
                  required
                  rows={4}
                  value={formMessage}
                  onChange={(event) => setFormMessage(event.target.value)}
                  placeholder="Cuentanos sobre tu planta y objetivos"
                  className="resize-none rounded-xl border border-white/10 bg-[#090E17] px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-[#FF6200]/70"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[#FF6200] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#ff7a2d] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? 'Enviando...' : 'Enviar solicitud'}
              </button>

              {submitNotice ? (
                <p
                  className={`mt-3 rounded-xl border px-4 py-2 text-sm ${
                    submitNotice.type === 'ok'
                      ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200'
                      : 'border-red-400/30 bg-red-500/10 text-red-200'
                  }`}
                >
                  {submitNotice.message}
                </p>
              ) : null}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
