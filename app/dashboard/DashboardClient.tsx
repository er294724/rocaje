'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';
import {
  BarChart3,
  Clock3,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  PieChart,
  Save,
  TrendingUp,
  Users,
  Workflow,
} from 'lucide-react';

type DashboardConfig = {
  siteContent: {
    homeHeadline: string;
    aboutHeadline: string;
    contactHeadline: string;
  };
  footer: {
    brandName: string;
    description: string;
    legalText: string;
  };
  contact: {
    email: string;
    phone: string;
    message: string;
    instagramUrl: string;
    linkedinUrl: string;
    websiteUrl: string;
    webmailUrl: string;
    whatsappUrl: string;
  };
  panels: {
    operations: string;
    marketing: string;
    support: string;
  };
  stats: {
    monthlyVisits: number;
    activeLeads: number;
    conversionRate: number;
    contentSaves: number;
    updatedAt: string;
  };
};

type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
};

const fallbackConfig: DashboardConfig = {
  siteContent: {
    homeHeadline: 'Consultoria industrial para plantas de block y adoquin.',
    aboutHeadline: 'Ingenieria aplicada para operaciones rentables.',
    contactHeadline: 'Hablemos de la siguiente mejora de tu planta.',
  },
  footer: {
    brandName: 'Rocaje',
    description: 'Diseno, estrategia y acompanamiento industrial para marcas y plantas que buscan crecer con claridad.',
    legalText: '© 2026 Rocaje. Todos los derechos reservados.',
  },
  contact: {
    email: 'hola@rocaje.com',
    phone: '+52 55 1234 5678',
    message: 'Si buscas elevar la productividad de tu planta, optimizar procesos y dejar una operacion mas solida, podemos trabajar juntos.',
    instagramUrl: 'https://instagram.com/rocaje',
    linkedinUrl: 'https://linkedin.com/company/rocaje',
    websiteUrl: '/',
    webmailUrl: 'https://mail.google.com',
    whatsappUrl: 'https://wa.me/525512345678',
  },
  panels: {
    operations: 'Seguimiento de estandarizacion, seguridad y productividad en piso.',
    marketing: 'Control de mensajes comerciales y conversion de leads por canal.',
    support: 'Coordinacion de solicitudes de clientes y tiempos de respuesta.',
  },
  stats: {
    monthlyVisits: 3180,
    activeLeads: 42,
    conversionRate: 17,
    contentSaves: 0,
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
};

export default function DashboardClient() {
  const [config, setConfig] = useState<DashboardConfig>(fallbackConfig);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [notice, setNotice] = useState<{ type: 'ok' | 'error'; message: string } | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    let alive = true;

    async function loadData() {
      try {
        const [configResponse, submissionsResponse] = await Promise.all([
          fetch('/api/dashboard-config', { cache: 'no-store' }),
          fetch('/api/contact-submissions', { cache: 'no-store' }),
        ]);

        if (!configResponse.ok) {
          throw new Error('No se pudo cargar la configuracion.');
        }

        const configData = (await configResponse.json()) as Partial<DashboardConfig>;
        const safeConfig: DashboardConfig = {
          siteContent: {
            ...fallbackConfig.siteContent,
            ...configData.siteContent,
          },
          footer: {
            ...fallbackConfig.footer,
            ...configData.footer,
          },
          contact: {
            ...fallbackConfig.contact,
            ...configData.contact,
          },
          panels: {
            ...fallbackConfig.panels,
            ...configData.panels,
          },
          stats: {
            ...fallbackConfig.stats,
            ...configData.stats,
          },
        };
        if (alive) {
          setConfig(safeConfig);
        }

        if (alive && submissionsResponse.ok) {
          const submissionsData = (await submissionsResponse.json()) as ContactSubmission[];
          setSubmissions(submissionsData);
        }
      } catch {
        if (alive) {
          setNotice({ type: 'error', message: 'No se pudieron cargar todos los datos del dashboard.' });
          setConfig(fallbackConfig);
        }
      } finally {
        if (alive) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      alive = false;
    };
  }, []);

  const updatedAt = useMemo(() => {
    if (!config.stats.updatedAt) {
      return 'Sin actualizacion';
    }

    return new Intl.DateTimeFormat('es-MX', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(config.stats.updatedAt));
  }, [config.stats.updatedAt]);

  const recentSubmissions = useMemo(() => submissions.slice(0, 6), [submissions]);

  const submissionsByDay = useMemo(() => {
    const labels = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];
    const today = new Date();
    const currentDayIndex = (today.getDay() + 6) % 7;

    const buckets = labels.map((label, index) => {
      const d = new Date(today);
      d.setDate(today.getDate() + (index - currentDayIndex));
      return { label, key: d.toISOString().slice(0, 10), value: 0 };
    });

    submissions.forEach((submission) => {
      const key = new Date(submission.createdAt).toISOString().slice(0, 10);
      const bucket = buckets.find((item) => item.key === key);
      if (bucket) {
        bucket.value += 1;
      }
    });

    return buckets;
  }, [submissions]);

  const maxSubmissionCount = Math.max(1, ...submissionsByDay.map((item) => item.value));

  const updateField = (path: string, value: string | number) => {
    setConfig((previous) => {
      const next = structuredClone(previous);
      const keys = path.split('.');
      let ref: Record<string, unknown> = next as unknown as Record<string, unknown>;

      for (let i = 0; i < keys.length - 1; i += 1) {
        ref = ref[keys[i]] as Record<string, unknown>;
      }

      ref[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const saveConfig = async () => {
    setSaving(true);
    setNotice(null);

    try {
      const response = await fetch('/api/dashboard-config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      if (!response.ok) {
        throw new Error('No se pudo guardar la configuracion.');
      }

      const data = (await response.json()) as DashboardConfig;
      setConfig(data);
      setNotice({ type: 'ok', message: 'Cambios guardados y persistidos correctamente.' });
    } catch {
      setNotice({ type: 'error', message: 'Error al guardar. Revisa los datos e intenta nuevamente.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6">
        <div className="grid gap-5 md:grid-cols-2">
          <StatCard
            icon={<BarChart3 className="h-5 w-5" />}
            label="Visitas del mes"
            value={config.stats.monthlyVisits.toLocaleString('es-MX')}
            helper="Trafico web consolidado"
          />
          <StatCard
            icon={<Users className="h-5 w-5" />}
            label="Leads por formulario"
            value={submissions.length.toString()}
            helper="Entradas registradas"
          />
          <StatCard
            icon={<TrendingUp className="h-5 w-5" />}
            label="Conversion promedio"
            value={`${config.stats.conversionRate}%`}
            helper="De lead a propuesta"
          />
          <StatCard
            icon={<Save className="h-5 w-5" />}
            label="Guardados de contenido"
            value={config.stats.contentSaves.toString()}
            helper={`Ultima actualizacion: ${updatedAt}`}
          />
        </div>

        <div className="rounded-[1.8rem] border border-white/10 bg-[#0A1022] p-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white">Graficos operativos</h2>
              <p className="mt-2 text-sm text-zinc-400">Visualiza tendencias semanales de formularios y rendimiento web.</p>
            </div>
            <div className="rounded-2xl bg-[#FF6200]/10 p-2 text-[#FF6200]">
              <PieChart className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-[#050816] p-4">
              <p className="text-sm text-zinc-400">Formularios por dia</p>
              <div className="mt-5 flex h-36 items-end justify-between gap-2">
                {submissionsByDay.map((item) => {
                  const barHeight = Math.max(8, Math.round((item.value / maxSubmissionCount) * 100));

                  return (
                    <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
                      <div
                        className="w-full rounded-md bg-gradient-to-t from-[#FF6200] to-[#ff9a62]"
                        style={{ height: `${barHeight}%` }}
                        title={`${item.value} formularios`}
                      />
                      <span className="text-xs text-zinc-500">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#050816] p-4">
              <p className="text-sm text-zinc-400">Conversion vs trafico</p>
              <svg viewBox="0 0 260 140" className="mt-4 h-36 w-full">
                <polyline
                  fill="none"
                  stroke="#FF6200"
                  strokeWidth="4"
                  points="10,100 60,90 110,76 160,64 210,48 250,36"
                />
                <polyline
                  fill="none"
                  stroke="#9CA3AF"
                  strokeWidth="3"
                  strokeDasharray="6 6"
                  points="10,112 60,104 110,95 160,86 210,74 250,62"
                />
              </svg>
              <div className="mt-3 flex items-center justify-between text-xs text-zinc-400">
                <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#FF6200]" />Conversion</span>
                <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-zinc-400" />Trafico base</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[1.8rem] border border-white/10 bg-[#0A1022] p-7">
          <h2 className="text-xl font-semibold text-white">Editor de contenido del sitio</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Actualiza textos clave de Home, Sobre Rocaje y Contacto. Los cambios se guardan de forma persistente.
          </p>

          <div className="mt-6 grid gap-4">
            <EditorField
              label="Titular Home"
              value={config.siteContent.homeHeadline}
              onChange={(value) => updateField('siteContent.homeHeadline', value)}
            />
            <EditorField
              label="Titular About"
              value={config.siteContent.aboutHeadline}
              onChange={(value) => updateField('siteContent.aboutHeadline', value)}
            />
            <EditorField
              label="Titular Contacto"
              value={config.siteContent.contactHeadline}
              onChange={(value) => updateField('siteContent.contactHeadline', value)}
            />
          </div>
        </div>

        <div className="rounded-[1.8rem] border border-white/10 bg-[#0A1022] p-7">
          <h2 className="text-xl font-semibold text-white">Footer del sitio</h2>
          <p className="mt-2 text-sm text-zinc-400">Edita el texto del footer para que siempre refleje los datos actuales del negocio.</p>

          <div className="mt-6 grid gap-4">
            <EditorField
              label="Nombre de marca"
              value={config.footer.brandName}
              onChange={(value) => updateField('footer.brandName', value)}
            />
            <TextAreaField
              label="Descripcion"
              value={config.footer.description}
              onChange={(value) => updateField('footer.description', value)}
            />
            <EditorField
              label="Texto legal"
              value={config.footer.legalText}
              onChange={(value) => updateField('footer.legalText', value)}
            />
          </div>
        </div>

        <div className="rounded-[1.8rem] border border-white/10 bg-[#0A1022] p-7">
          <h2 className="text-xl font-semibold text-white">Paneles de control</h2>
          <p className="mt-2 text-sm text-zinc-400">Define notas operativas para tu equipo interno.</p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <PanelNote
              title="Operaciones"
              value={config.panels.operations}
              onChange={(value) => updateField('panels.operations', value)}
              icon={<Workflow className="h-4 w-4" />}
            />
            <PanelNote
              title="Comercial"
              value={config.panels.marketing}
              onChange={(value) => updateField('panels.marketing', value)}
              icon={<TrendingUp className="h-4 w-4" />}
            />
            <PanelNote
              title="Soporte"
              value={config.panels.support}
              onChange={(value) => updateField('panels.support', value)}
              icon={<Users className="h-4 w-4" />}
            />
          </div>
        </div>
      </div>

      <aside className="space-y-6">
        <div className="rounded-[1.8rem] border border-white/10 bg-[#0A1022] p-7">
          <h2 className="text-xl font-semibold text-white">Contacto y accesos rapidos</h2>
          <p className="mt-2 text-sm text-zinc-400">Actualiza email, telefono, mensaje y redes del bloque de Contacto.</p>

          <div className="mt-6 space-y-4">
            <EditorField
              label="Correo"
              value={config.contact.email}
              onChange={(value) => updateField('contact.email', value)}
              type="email"
            />
            <EditorField
              label="Telefono"
              value={config.contact.phone}
              onChange={(value) => updateField('contact.phone', value)}
            />
            <TextAreaField
              label="Mensaje de contacto"
              value={config.contact.message}
              onChange={(value) => updateField('contact.message', value)}
            />
            <EditorField
              label="URL Instagram"
              value={config.contact.instagramUrl}
              onChange={(value) => updateField('contact.instagramUrl', value)}
              type="url"
            />
            <EditorField
              label="URL LinkedIn"
              value={config.contact.linkedinUrl}
              onChange={(value) => updateField('contact.linkedinUrl', value)}
              type="url"
            />
            <EditorField
              label="URL webmail"
              value={config.contact.webmailUrl}
              onChange={(value) => updateField('contact.webmailUrl', value)}
              type="url"
            />
            <EditorField
              label="URL WhatsApp"
              value={config.contact.whatsappUrl}
              onChange={(value) => updateField('contact.whatsappUrl', value)}
              type="url"
            />
            <EditorField
              label="URL sitio"
              value={config.contact.websiteUrl}
              onChange={(value) => updateField('contact.websiteUrl', value)}
              type="url"
            />
          </div>

          <div className="mt-6 grid gap-3">
            <QuickLink href={`mailto:${config.contact.email}`} icon={<Mail className="h-4 w-4" />} label="Abrir correo" />
            <QuickLink href={config.contact.webmailUrl} icon={<Globe className="h-4 w-4" />} label="Ir a webmail" external />
            <QuickLink href={config.contact.whatsappUrl} icon={<MessageCircle className="h-4 w-4" />} label="Abrir WhatsApp" external />
            <QuickLink href={config.contact.instagramUrl} icon={<Instagram className="h-4 w-4" />} label="Abrir Instagram" external />
            <QuickLink href={config.contact.linkedinUrl} icon={<Linkedin className="h-4 w-4" />} label="Abrir LinkedIn" external />
            <QuickLink href={config.contact.websiteUrl} icon={<Globe className="h-4 w-4" />} label="Abrir sitio" />
          </div>
        </div>

        <div className="rounded-[1.8rem] border border-white/10 bg-[#0A1022] p-7">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Formularios conectados</h2>
            <span className="inline-flex items-center gap-2 text-xs text-zinc-400">
              <Clock3 className="h-3.5 w-3.5" />
              Tiempo real
            </span>
          </div>

          {recentSubmissions.length === 0 ? (
            <p className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-400">
              Aun no hay formularios recibidos.
            </p>
          ) : (
            <div className="space-y-3">
              {recentSubmissions.map((entry) => (
                <article key={entry.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-white">{entry.name}</p>
                    <span className="text-xs text-zinc-500">{new Date(entry.createdAt).toLocaleString('es-MX')}</span>
                  </div>
                  <p className="mt-1 text-sm text-zinc-400">{entry.email} · {entry.phone || 'Sin telefono'}</p>
                  <p className="mt-2 line-clamp-2 text-sm text-zinc-300">{entry.message}</p>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-[1.8rem] border border-white/10 bg-[#0A1022] p-7">
          <button
            type="button"
            onClick={saveConfig}
            disabled={!isHydrated || saving || loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FF6200] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#ff7a2d] disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Save className="h-4 w-4" />
            {saving ? 'Guardando...' : 'Guardar cambios'}
          </button>

          {notice ? (
            <p
              className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
                notice.type === 'ok'
                  ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200'
                  : 'border-red-400/30 bg-red-500/10 text-red-200'
              }`}
            >
              {notice.message}
            </p>
          ) : null}
        </div>
      </aside>
    </section>
  );
}

type EditorFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'url';
};

function EditorField({ label, value, onChange, type = 'text' }: EditorFieldProps) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-zinc-300">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-white/10 bg-[#050816] px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-[#FF6200]/60"
      />
    </label>
  );
}

type TextAreaFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function TextAreaField({ label, value, onChange }: TextAreaFieldProps) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-zinc-300">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        className="w-full resize-none rounded-xl border border-white/10 bg-[#050816] px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-[#FF6200]/60"
      />
    </label>
  );
}

type PanelNoteProps = {
  title: string;
  value: string;
  onChange: (value: string) => void;
  icon: ReactNode;
};

function PanelNote({ title, value, onChange, icon }: PanelNoteProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#050816] p-4">
      <div className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-[#FF6200]">
        {icon}
        {title}
      </div>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={5}
        className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-[#FF6200]/60"
      />
    </div>
  );
}

type StatCardProps = {
  icon: ReactNode;
  label: string;
  value: string;
  helper: string;
};

function StatCard({ icon, label, value, helper }: StatCardProps) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-[#0A1022] p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-400">{label}</p>
        <div className="rounded-2xl bg-[#FF6200]/10 p-2 text-[#FF6200]">{icon}</div>
      </div>
      <p className="mt-5 text-3xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm text-zinc-400">{helper}</p>
    </div>
  );
}

type QuickLinkProps = {
  href: string;
  label: string;
  icon: ReactNode;
  external?: boolean;
};

function QuickLink({ href, label, icon, external = false }: QuickLinkProps) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className="inline-flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200 transition hover:bg-white/10"
    >
      <span className="inline-flex items-center gap-2">
        {icon}
        {label}
      </span>
      <span className="text-xs text-zinc-400">Abrir</span>
    </a>
  );
}
