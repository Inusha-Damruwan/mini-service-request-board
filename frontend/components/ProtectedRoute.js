'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const AUTH_PATHS = ['/login', '/register'];
const VALID_PATHS = ['/dashboard', '/jobs', '/jobs/new', '/'];
const INVALID_PATHS = ['/my-jobs', '/workspaces', '/settings', '/analytics'];

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuth();

  const isAuthPage = AUTH_PATHS.includes(pathname);
  const isInvalidPath = INVALID_PATHS.some(path => pathname.startsWith(path));
  const isProtectedPage = !isAuthPage;

  useEffect(() => {
    if (loading) return;

    // Redirect invalid paths to dashboard
    if (isInvalidPath) {
      router.replace('/dashboard');
      return;
    }

    if (isProtectedPage && !user) {
      router.replace('/login');
      return;
    }

    if (isAuthPage && user) {
      router.replace('/dashboard');
    }
  }, [isAuthPage, isInvalidPath, isProtectedPage, loading, router, user]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-board px-4 text-sm text-slate-300">
        <div className="glass-card rounded-2xl px-5 py-4 shadow-glow">
          Restoring your session...
        </div>
      </div>
    );
  }

  if (isProtectedPage && !user) {
    return null;
  }

  if (isAuthPage && user) {
    return null;
  }

  return children;
}