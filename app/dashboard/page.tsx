import Link from 'next/link';
import { redirect } from 'next/navigation';
import LogoutButton from '../components/LogoutButton';
import DashboardClient from './DashboardClient';
import { isAuthenticated } from '../lib/auth';

export default async function DashboardPage() {
  if (!(await isAuthenticated())) {
    redirect('/login');
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] px-6 py-20 text-zinc-100">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute left-[-140px] top-10 h-80 w-80 rounded-full bg-[#FF6200]/20 blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-80px] h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-8">
        <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/15 via-white/5 to-transparent p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#FF6200]">Panel interno Rocaje</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Dashboard avanzado de operación y contenido
              </h1>
              <p className="mt-4 text-lg leading-8 text-zinc-400">
                Edita contenido clave del sitio, todo el bloque de Contacto y el Footer completo desde un solo panel, con guardado persistente y accesos rapidos.
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

        <DashboardClient />
      </div>
    </main>
  );
}
