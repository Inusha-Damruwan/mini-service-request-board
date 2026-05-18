"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { BriefcaseBusiness, LayoutDashboard, LogOut, Menu, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { href: "/jobs", label: "Browse Jobs" },
  { href: "/jobs/new", label: "New Request" },
  { href: "/dashboard", label: "Dashboard" }
];

const AUTH_PAGES = ["/login", "/register"];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();

  // Hide header on auth pages
  if (AUTH_PAGES.includes(pathname)) {
    return null;
  }
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const initials = useMemo(() => user?.name?.trim()?.charAt(0)?.toUpperCase() || "U", [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 text-white shadow-lift">
            <BriefcaseBusiness className="h-5 w-5" />
          </span>
          <span>
            <span className="font-display block text-sm font-semibold uppercase tracking-[0.28em] text-sky-100/70">Mini Service</span>
            <span className="block text-base font-semibold text-slate-100 sm:text-lg">Request Board</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active ? "bg-white/10 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)]" : "text-slate-300 hover:bg-white/8 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notification bell removed to simplify header UI */}

          {!user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/login"
                className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-medium text-slate-100 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/12"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="hidden rounded-full bg-gradient-to-r from-sky-400 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lift transition hover:-translate-y-0.5 sm:inline-flex"
              >
                Create account
              </Link>
            </div>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setOpen((current) => !current)}
                className="flex items-center gap-3 rounded-full border border-white/10 bg-white/8 p-1.5 pr-3 text-left backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/12"
                aria-expanded={open}
                aria-haspopup="menu"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 font-display text-sm font-semibold text-white shadow-lift">
                  {initials}
                </span>
                <span className="hidden min-w-0 flex-col text-left sm:flex">
                  <span className="truncate text-sm font-semibold text-white">{user.name}</span>
                  <span className="truncate text-xs text-slate-300">{user.email}</span>
                </span>
                <Menu className="h-4 w-4 text-slate-300" />
              </button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, y: -12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute right-0 top-[calc(100%+1rem)] z-[9999] w-[22rem] overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/95 p-3 shadow-glow backdrop-blur-2xl"
                    role="menu"
                  >
                    <div className="rounded-[22px] border border-white/10 bg-white/8 p-4 backdrop-blur-xl">
                      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 font-display text-lg font-semibold text-white shadow-lift">
                          {initials}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-white">{user.name}</p>
                          <p className="truncate text-sm text-slate-300">{user.email}</p>
                        </div>
                      </div>

                      <div className="mt-4 grid gap-2">
                        <button
                          type="button"
                          onClick={() => router.push("/dashboard")}
                          className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm font-medium text-slate-100 transition hover:border-sky-400/40 hover:bg-slate-900"
                        >
                          <span className="inline-flex items-center gap-3">
                            <LayoutDashboard className="h-4 w-4 text-sky-300" />
                            Dashboard
                          </span>
                          <ArrowRight className="h-4 w-4 text-slate-400" />
                        </button>
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="mt-1 inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(244,63,94,0.2)] transition hover:-translate-y-0.5"
                        >
                          <LogOut className="h-4 w-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
