import Link from 'next/link';
import { redirect } from 'next/navigation';
import LoginForm from '../components/LoginForm';
import { isAuthenticated } from '../lib/auth';

export default async function LoginPage() {
  if (await isAuthenticated()) {
    redirect('/dashboard');
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,98,0,0.25),_transparent_35%)] bg-[#050816] px-6 py-20 text-zinc-100">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-8">
        <Link href="/" className="text-sm font-medium text-zinc-400 transition hover:text-white">
          ← Volver al sitio
        </Link>
        <LoginForm />
      </div>
    </main>
  );
}
