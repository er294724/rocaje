'use client';
import { useState, useEffect } from 'react';
import {
  Users,
  Globe,
  Mail,
  Save,
  ExternalLink,
  BarChart3,
  Edit3,
} from 'lucide-react';

type DashboardConfigResponse = {
  siteContent?: {
    contactHeadline?: string;
  };
  contact?: {
    email?: string;
    phone?: string;
    message?: string;
    instagramUrl?: string;
    linkedinUrl?: string;
    adminEmail?: string;
  };
};

type ContactData = {
  title: string;
  description: string;
  email: string;
  phone: string;
  instagram: string;
  linkedin: string;
  adminEmail: string;
};

const defaultContactData: ContactData = {
  title: 'Hablemos de la siguiente mejora de tu planta.',
  description:
    'Si buscas elevar la productividad de tu planta, optimizar procesos y dejar una operacion mas solida, podemos trabajar juntos.',
  email: 'hola@rocaje.com',
  phone: '+52 55 1234 5678',
  instagram: 'https://instagram.com/rocaje',
  linkedin: 'https://linkedin.com/company/rocaje',
  adminEmail: 'jcabrera@rocaje.com',
};

export default function AdvancedDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [contactData, setContactData] = useState<ContactData>(defaultContactData);

  useEffect(() => {
    const saved = localStorage.getItem('contactData');
    if (!saved) {
      return;
    }

    try {
      setContactData({ ...defaultContactData, ...(JSON.parse(saved) as Partial<ContactData>) });
    } catch {
      // Keep defaults when local data is corrupted.
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    let alive = true;

    async function loadFromServer() {
      try {
        const response = await fetch('/api/dashboard-config', { cache: 'no-store' });
        if (!response.ok) {
          return;
        }

        const config = (await response.json()) as DashboardConfigResponse;
        if (!alive) {
          return;
        }

        setContactData((prev) => ({
          ...prev,
          title: config.siteContent?.contactHeadline || prev.title,
          description: config.contact?.message || prev.description,
          email: config.contact?.email || prev.email,
          phone: config.contact?.phone || prev.phone,
          instagram: config.contact?.instagramUrl || prev.instagram,
          linkedin: config.contact?.linkedinUrl || prev.linkedin,
          adminEmail: config.contact?.adminEmail || prev.adminEmail,
        }));
      } catch {
        // Keep local values when API is unavailable.
      }
    }

    loadFromServer();

    return () => {
      alive = false;
    };
  }, [isLoggedIn]);

  const saveChanges = async () => {
    localStorage.setItem('contactData', JSON.stringify(contactData));

    try {
      const response = await fetch('/api/dashboard-config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siteContent: {
            contactHeadline: contactData.title,
          },
          contact: {
            email: contactData.email,
            phone: contactData.phone,
            message: contactData.description,
            instagramUrl: contactData.instagram,
            linkedinUrl: contactData.linkedin,
            adminEmail: contactData.adminEmail,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('No se pudo guardar en servidor.');
      }

      alert('✅ Cambios guardados y publicados en el sitio.');
    } catch {
      alert('⚠️ Se guardo en este navegador, pero no se pudo publicar en el servidor.');
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const username = (form.elements.namedItem('username') as HTMLInputElement | null)?.value ?? '';
    const password = (form.elements.namedItem('password') as HTMLInputElement | null)?.value ?? '';

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      setIsLoggedIn(true);
      return;
    }

    alert('Credenciales invalidas.');
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
    } catch {
      // Ignore network errors on logout and continue locally.
    }
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center p-6">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-12 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-8">Dashboard Rocaje</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <input name="username" type="text" placeholder="Usuario" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4" required />
            <input name="password" type="password" placeholder="Contrasena" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4" required />
            <button type="submit" className="w-full bg-[#FF6200] py-5 rounded-2xl font-semibold text-lg">Entrar al Panel</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0F1C] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold">Panel de Control Rocaje</h1>
            <p className="text-gray-400">Gestión completa del sitio y estadísticas</p>
          </div>
          <button onClick={handleLogout} className="text-red-400 hover:text-red-500">Cerrar Sesion</button>
        </div>

        {/* Acceso rápido a Webmail */}
        <div className="mb-12">
          <a
            href="https://webmail.porkbun.com/?_task=mail&_mbox=INBOX"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/10 px-8 py-5 rounded-2xl text-lg transition-all"
          >
            <Mail className="w-6 h-6" />
            Abrir Webmail Porkbun (Correo @rocaje.com)
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <Users className="w-9 h-9 text-[#FF6200] mb-4" />
            <div className="text-5xl font-bold">2,847</div>
            <div className="text-gray-400">Visitas Totales</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <Mail className="w-9 h-9 text-[#FF6200] mb-4" />
            <div className="text-5xl font-bold">47</div>
            <div className="text-gray-400">Leads</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <Globe className="w-9 h-9 text-[#FF6200] mb-4" />
            <div className="text-5xl font-bold">19</div>
            <div className="text-gray-400">Países</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <BarChart3 className="w-9 h-9 text-[#FF6200] mb-4" />
            <div className="text-5xl font-bold">4.8%</div>
            <div className="text-gray-400">Conversión</div>
          </div>
        </div>

        {/* Edición de Contacto */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-10">
          <h2 className="text-2xl font-semibold mb-8 flex items-center gap-3">
            <Edit3 className="w-6 h-6" /> Editar Información de Contacto y Footer
          </h2>

          <div className="space-y-8">
            {/* Título y Descripción */}
            <div>
              <label className="block text-sm mb-2">Título del Contacto</label>
              <input value={contactData.title} onChange={(e) => setContactData({...contactData, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4" />
            </div>

            <div>
              <label className="block text-sm mb-2">Descripción del Contacto</label>
              <textarea value={contactData.description} onChange={(e) => setContactData({...contactData, description: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-4 h-32" />
            </div>

            {/* Correo y Teléfono */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm mb-2">Correo electrónico</label>
                <input value={contactData.email} onChange={(e) => setContactData({...contactData, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4" />
              </div>
              <div>
                <label className="block text-sm mb-2">Correo de recepcion de leads</label>
                <input value={contactData.adminEmail} onChange={(e) => setContactData({...contactData, adminEmail: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm mb-2">Teléfono / WhatsApp</label>
                <input value={contactData.phone} onChange={(e) => setContactData({...contactData, phone: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4" />
              </div>
              <div>
                <label className="block text-sm mb-2">Instagram</label>
                <input value={contactData.instagram} onChange={(e) => setContactData({...contactData, instagram: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4" />
              </div>
            </div>

            {/* Redes Sociales */}
            <div className="grid md:grid-cols-1 gap-8">
              <div>
                <label className="block text-sm mb-2">LinkedIn</label>
                <input
                  value={contactData.linkedin}
                  onChange={(e) => setContactData({ ...contactData, linkedin: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4"
                />
              </div>
            </div>
          </div>

          <button onClick={saveChanges} className="mt-10 w-full bg-[#FF6200] hover:bg-orange-600 py-5 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3">
            <Save className="w-5 h-5" /> Guardar y Publicar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}
