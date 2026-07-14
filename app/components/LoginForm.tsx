'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || 'No se pudo iniciar sesión.');
      setLoading(false);
      return;
    }

    router.push('/dashboard');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#FF6200]">Dashboard</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Acceso privado</h1>
        <p className="mt-3 text-sm leading-7 text-zinc-400">
          Ingresa tus credenciales para entrar al panel interno de Rocaje Consultoría.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm text-zinc-300" htmlFor="username">
            Usuario
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-[#050816] px-4 py-3 text-white outline-none ring-0 transition focus:border-[#FF6200]"
            placeholder="rocaje"
            autoComplete="username"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-300" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-[#050816] px-4 py-3 text-white outline-none transition focus:border-[#FF6200]"
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
        </div>
      </div>

      {error ? <p className="mt-4 text-sm text-red-400">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="mt-8 w-full rounded-2xl bg-[#FF6200] px-4 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? 'Ingresando...' : 'Entrar al dashboard'}
      </button>

      <p className="mt-5 text-center text-xs text-zinc-500">
        Credenciales por defecto: rocaje / rocaje2025
      </p>
    </form>
  );
}
