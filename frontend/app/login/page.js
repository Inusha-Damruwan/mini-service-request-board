"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(form);
      // optionally persist preference
      if (remember) localStorage.setItem('remember', '1');
      router.push('/dashboard');
    } catch (err) {
      alert(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black flex items-center">
      <div className="mx-auto w-full max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left: premium marketing / split hero */}
          <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="hidden flex-col gap-6 md:flex">
            <div className="inline-flex items-center gap-3 rounded-full bg-slate-900/40 px-4 py-2 backdrop-blur text-xs uppercase tracking-[0.3em] text-sky-300/90 font-semibold">
              Premium SaaS · Secure auth
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 12, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.75, ease: 'easeOut' }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.9] max-w-3xl antialiased select-none"
              aria-label="Welcome back."
            >
              <TypeAnimation
                sequence={[
                  'Welcome back.',
                  1800,
                  'Sign in to your premium control center.',
                  1800,
                  'Manage service requests beautifully.',
                  1800,
                ]}
                speed={100}
                deletionSpeed={50}
                repeat={Infinity}
                cursor={true}
                preRenderFirstString={true}
                wrapper="span"
                className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent drop-shadow-[0_12px_40px_rgba(59,130,246,0.08)]"
                style={{ display: 'inline-block' }}
              />
            </motion.h1>

            <p className="text-slate-300 max-w-xl leading-7">
              Fast, secure access to your Mini Service Request Board. Manage requests, collaborate with teams, and ship work faster with a premium dark workspace.
            </p>

            <div className="mt-6 flex gap-3">
              <div className="rounded-2xl border border-white/6 bg-gradient-to-br from-sky-900/20 to-slate-900/30 px-4 py-3 text-sm text-slate-200">Secure · GDPR compliant</div>
              <div className="rounded-2xl border border-white/6 bg-slate-900/40 px-4 py-3 text-sm text-slate-200">Optimized for teams</div>
            </div>
          </motion.div>

          {/* Right: auth card */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-sky-400/6 via-blue-400/4 to-indigo-500/6 blur-3xl opacity-60" />
            <div className="relative rounded-3xl border border-white/8 bg-gradient-to-b from-slate-900/75 to-slate-950/75 p-8 shadow-glow backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-100/70">Mini Service</p>
                  <h2 className="mt-2 text-2xl font-extrabold text-white">Sign in to your account</h2>
                  <p className="mt-1 text-sm text-slate-300">Enter your credentials to continue</p>
                </div>
                <Link href="/register" className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lift hover:-translate-y-0.5 transition">
                  Create account
                </Link>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <label className="block">
                  <span className="text-sm text-slate-300">Email</span>
                  <input name="email" value={form.email} onChange={handleChange} type="email" required placeholder="you@company.com" className="mt-2 w-full rounded-2xl border border-white/8 bg-slate-900/60 px-4 py-3 text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-sky-400/30 transition" />
                </label>

                <label className="block relative">
                  <span className="text-sm text-slate-300">Password</span>
                  <input
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    className="mt-2 w-full rounded-2xl border border-white/8 bg-slate-900/60 px-4 py-3 pr-12 text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-sky-400/30 transition"
                  />
                  <button type="button" onClick={() => setShowPassword((c) => !c)} className="absolute inset-y-0 right-2 flex items-center px-2 text-slate-300 hover:text-white transition" aria-label={showPassword ? 'Hide password' : 'Show password'}>
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </label>

                <div className="flex items-center justify-between">
                  <label className="inline-flex items-center gap-2 text-sm text-slate-300">
                    <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4 rounded border-white/10 bg-slate-800 text-sky-400 focus:ring-0" />
                    Remember me
                  </label>
                  <Link href="/" className="text-sm text-sky-300 hover:text-sky-200">Forgot password?</Link>
                </div>

                <div className="grid gap-3">
                  <button type="submit" disabled={loading} className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-sky-400 to-blue-600 px-4 py-3 text-white font-semibold shadow-lift hover:-translate-y-0.5 transition disabled:opacity-70">
                    {loading ? 'Signing in...' : 'Sign in'}
                  </button>
                  <Link href="/register" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/8 px-4 py-3 text-sm font-medium text-slate-100 hover:bg-white/6 transition">
                    Don’t have an account? Sign up
                  </Link>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
