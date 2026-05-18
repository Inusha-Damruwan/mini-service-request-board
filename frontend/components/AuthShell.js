"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';
import { ArrowRight, BadgeCheck, Globe2, ShieldCheck, Sparkles, Zap } from "lucide-react";

const featureCards = [
  {
    icon: ShieldCheck,
    title: "Secure by design",
    description: "JWT-backed authentication with a polished user experience."
  },
  {
    icon: Zap,
    title: "Fast workflows",
    description: "Streamlined forms that feel like a real SaaS product."
  },
  {
    icon: Globe2,
    title: "Always responsive",
    description: "Beautiful mobile-first layouts across every screen."
  }
];

export default function AuthShell({ title, subtitle, formTitle, children, footer }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950" />
      
      {/* Animated glow orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10rem] top-[-8rem] h-96 w-96 rounded-full bg-sky-400/20 blur-[100px] animate-pulse" />
        <div className="absolute right-[-10rem] top-32 h-96 w-96 rounded-full bg-blue-500/15 blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-indigo-500/10 blur-[100px] animate-pulse" />
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[1.08fr_0.92fr]">
        <section className="flex flex-col justify-between gap-12 px-6 py-8 sm:px-10 lg:px-14 lg:py-12">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 text-white shadow-lift">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-sky-100/70">Mini Service Request Board</p>
              <p className="font-display text-lg font-semibold text-white">Premium startup operations</p>
            </div>
          </div>

          <div className="max-w-2xl space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-sky-100/80 backdrop-blur-xl">
              <BadgeCheck className="h-4 w-4 text-sky-300" />
              Trusted workflow platform
            </div>

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 12, filter: 'blur(12px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.75, ease: 'easeOut' }}
                className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.9] antialiased select-none"
                aria-label={title}
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

              <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
                {subtitle}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {featureCards.map((feature) => {
                const Icon = feature.icon;

                return (
                  <motion.div
                    key={feature.title}
                    whileHover={{ y: -4 }}
                    className="glass-card rounded-[24px] p-4 text-left"
                  >
                    <Icon className="h-5 w-5 text-sky-300" />
                    <p className="mt-4 text-sm font-semibold text-white">{feature.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="hidden max-w-2xl rounded-3xl border border-white/15 bg-gradient-to-b from-white/10 to-white/5 p-8 shadow-[0_8px_32px_rgba(96,165,250,0.1)] backdrop-blur-2xl lg:block"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-200">Live operations</p>
                <p className="mt-3 text-lg font-semibold text-white leading-relaxed">A premium control center for service requests, tracking, and delivery.</p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-white shadow-lg">
                <ArrowRight className="h-6 w-6" />
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ["99.9%", "uptime"],
                ["24/7", "access"],
                ["Instant", "handoffs"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/8 p-5 backdrop-blur-xl">
                  <p className="font-display text-3xl font-bold text-white">{value}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.3em] text-slate-300">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="flex items-center justify-center px-6 pb-10 lg:px-12 lg:py-12">
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="glass-card w-full max-w-xl rounded-3xl border border-white/15 bg-gradient-to-b from-white/12 to-white/8 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-3xl"
          >
            {formTitle ? (
              <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-200/70">{formTitle}</p>
              </div>
            ) : null}
            {children}
            {footer ? <div className="mt-6">{footer}</div> : null}
          </motion.div>
        </section>
      </div>
    </main>
  );
}
