import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
  BarChart3,
  BriefcaseBusiness,
  CircleCheckBig,
  Clock3,
  LayoutPanelTop,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react';
import LogoutButton from '../components/LogoutButton';
import { isAuthenticated } from '../lib/auth';

const stats = [
  { label: 'Proyectos en seguimiento', value: '12', icon: BriefcaseBusiness, trend: '+8% vs mes anterior' },
  { label: 'Leads activos', value: '48', icon: Users, trend: '+14% esta semana' },
  { label: 'Tasa de respuesta', value: '94%', icon: TrendingUp, trend: '+6 pts. rendimiento' },
];

const actions = [
  { title: 'Actualizar contenido', description: 'Editar hero, servicios y testimonios.', icon: LayoutPanelTop },
  { title: 'Gestionar leads', description: 'Revisar contactos y oportunidades.', icon: ShieldCheck },
  { title: 'Preparar campaña', description: 'Ajustar mensajes y próximos lanzamientos.', icon: Sparkles },
];

const projects = [
  { name: 'Planta Norte', status: 'En ejecución', progress: '78%' },
  { name: 'Planta Centro', status: 'En revisión', progress: '54%' },
  { name: 'Planta Sur', status: 'Pendiente', progress: '32%' },
];

export default async function DashboardPage() {
  if (!(await isAuthenticated())) {
    redirect('/login');
  }

  return (
    <main className="min-h-screen bg-[#050816] px-6 py-20 text-zinc-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#FF6200]">Panel interno Rocaje</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Gestión operativa y seguimiento comercial
              </h1>
              <p className="mt-4 text-lg leading-8 text-zinc-400">
                Centraliza el estado del sitio, proyectos, clientes y próximos movimientos con una vista más ejecutiva y profesional.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/" className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/10">
                Ver sitio
              </Link>
              <LogoutButton />
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="rounded-[1.6rem] border border-white/10 bg-[#0A1022] p-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-zinc-400">{item.label}</p>
                  <div className="rounded-2xl bg-[#FF6200]/10 p-2 text-[#FF6200]">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <p className="mt-6 text-3xl font-semibold text-white">{item.value}</p>
                <p className="mt-2 text-sm text-[#FF6200]">{item.trend}</p>
              </div>
            );
          })}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[1.8rem] border border-white/10 bg-[#0A1022] p-8">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-[#FF6200]/10 p-2 text-[#FF6200]">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Resumen ejecutivo</h2>
                <p className="text-sm text-zinc-400">Estado general del negocio y del sitio</p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-2 text-[#FF6200]">
                  <CircleCheckBig className="h-4 w-4" />
                  <span className="text-sm font-medium">Sitio activo</span>
                </div>
                <p className="mt-4 text-2xl font-semibold text-white">100% operativo</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-2 text-[#FF6200]">
                  <CircleCheckBig className="h-4 w-4" />
                  <span className="text-sm font-medium">Protección</span>
                </div>
                <p className="mt-4 text-2xl font-semibold text-white">Acceso seguro</p>
              </div>
            </div>

            <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-[#050816] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-400">Avance de proyectos</p>
                  <p className="mt-1 text-lg font-semibold text-white">Seguimiento mensual</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <Clock3 className="h-4 w-4" />
                  Última actualización hoy
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {projects.map((project) => (
                  <div key={project.name}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-white">{project.name}</span>
                      <span className="text-zinc-400">{project.status}</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div className="h-2 rounded-full bg-[#FF6200]" style={{ width: project.progress }} />
                    </div>
                    <p className="mt-2 text-xs text-zinc-500">Progreso: {project.progress}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-white/10 bg-[#0A1022] p-8">
            <h2 className="text-xl font-semibold text-white">Acciones rápidas</h2>
            <div className="mt-6 space-y-4">
              {actions.map((action) => {
                const Icon = action.icon;
                return (
                  <div key={action.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-2xl bg-[#FF6200]/10 p-2 text-[#FF6200]">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{action.title}</p>
                        <p className="mt-1 text-sm text-zinc-400">{action.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
