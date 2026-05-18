'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Eye,
  EyeOff,
  Mail,
  ShieldCheck,
} from 'lucide-react';

import { useAuth } from '../../context/AuthContext';
import AuthShell from '../../components/AuthShell';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });

  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError('');
    setFieldErrors({});

    const nextFieldErrors = {};

    if (!form.name.trim()) {
      nextFieldErrors.name = 'Enter your name.';
    }

    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) {
      nextFieldErrors.email = 'Enter a valid email.';
    }

    if (!form.password || form.password.length < 6) {
      nextFieldErrors.password =
        'Password must be at least 6 characters.';
    }

    if (form.password !== form.confirm) {
      nextFieldErrors.confirm = 'Passwords do not match.';
    }

    if (Object.keys(nextFieldErrors).length > 0) {
      setFieldErrors(nextFieldErrors);
      return;
    }

    setLoading(true);

    try {
      await register(form);

      router.replace('/dashboard');
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          'Unable to register'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Create your workspace account."
      subtitle="Join the premium service request platform."
      formTitle="Create account"
    >
      <div className="space-y-6">
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/10"
          >
            <ShieldCheck className="h-4 w-4" />
            Continue with SSO
          </button>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/10"
          >
            <Mail className="h-4 w-4" />
            Continue with email
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>

          <div className="relative flex justify-center text-xs uppercase tracking-[0.3em] text-slate-400">
            <span className="bg-slate-950 px-4">
              or build your account
            </span>
          </div>
        </div>

        <form
          className="grid gap-5"
          onSubmit={handleSubmit}
          noValidate
        >
          <Field
            label="Full name"
            error={fieldErrors.name}
          >
            <motion.input
              whileFocus={{ scale: 1.01 }}
              name="name"
              value={form.name}
              onChange={handleChange}
              className="input"
              placeholder="Kasun Perera"
              autoComplete="name"
            />
          </Field>

          <Field
            label="Email"
            error={fieldErrors.email}
          >
            <motion.input
              whileFocus={{ scale: 1.01 }}
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="input"
              placeholder="kasun@gmail.com"
              autoComplete="email"
            />
          </Field>

          <Field
            label="Password"
            error={fieldErrors.password}
          >
            <div className="relative">
              <motion.input
                whileFocus={{ scale: 1.01 }}
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                className="input pr-12"
                placeholder="Create your password"
                autoComplete="new-password"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((current) => !current)
                }
                className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 transition hover:text-white"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </Field>

          <Field
            label="Confirm password"
            error={fieldErrors.confirm}
          >
            <motion.input
              whileFocus={{ scale: 1.01 }}
              name="confirm"
              type={
                showPassword ? 'text' : 'password'
              }
              value={form.confirm}
              onChange={handleChange}
              className="input"
              placeholder="Re-enter your password"
              autoComplete="new-password"
            />
          </Field>

          {error ? (
            <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
              {error}
            </div>
          ) : null}

          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-400 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition disabled:opacity-70"
          >
            {loading
              ? 'Creating account...'
              : 'Create account'}
          </motion.button>

          <div className="flex justify-center">
            <Link
              href="/login"
              className="text-sm text-sky-300 transition hover:text-sky-200"
            >
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </AuthShell>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-slate-200">
        {label}
      </span>

      {children}

      {error ? (
        <span className="text-sm text-rose-300">
          {error}
        </span>
      ) : null}
    </label>
  );
}