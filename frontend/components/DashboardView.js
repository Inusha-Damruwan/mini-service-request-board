"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  ArrowRight,
  BarChart3,
  LayoutGrid,
  Plus,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { jobsApi } from "../services/api";

export default function DashboardView() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await jobsApi.getAll();

        setJobs(response.data.data || []);
      } catch (requestError) {
        console.error(requestError);

        setError(
          requestError.response?.data?.message ||
            "Unable to load dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  const metrics = useMemo(() => {
    const open = jobs.filter(
      (job) =>
        String(job.status).toLowerCase() === "open"
    ).length;

    const progress = jobs.filter(
      (job) =>
        String(job.status).toLowerCase() ===
        "in progress"
    ).length;

    const closed = jobs.filter(
      (job) =>
        String(job.status).toLowerCase() ===
        "closed"
    ).length;

    return [
      {
        label: "Total Requests",
        value: jobs.length,
        color: "from-sky-400 to-blue-600",
      },
      {
        label: "Open",
        value: open,
        color: "from-emerald-400 to-teal-500",
      },
      {
        label: "In Progress",
        value: progress,
        color: "from-violet-400 to-fuchsia-500",
      },
      {
        label: "Closed",
        value: closed,
        color: "from-orange-400 to-amber-500",
      },
    ];
  }, [jobs]);

  const recentJobs = useMemo(() => jobs.slice(0, 4), [jobs]);

  const getStatusStyles = (status) => {
    const normalized = String(status || "").toLowerCase();

    if (normalized === "open") {
      return "border-emerald-400/20 bg-emerald-500/10 text-emerald-200";
    }

    if (normalized === "in progress") {
      return "border-violet-400/20 bg-violet-500/10 text-violet-200";
    }

    if (normalized === "closed") {
      return "border-slate-400/20 bg-slate-500/10 text-slate-200";
    }

    return "border-sky-400/20 bg-sky-500/10 text-sky-200";
  };

  return (
    <div className="min-h-screen bg-[#020817] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[280px_1fr] gap-8">

        {/* Sidebar */}

        <aside className="h-fit self-start rounded-[32px] border border-white/10 bg-[#071226] p-6 lg:sticky lg:top-24">

          <div className="flex items-center gap-4 mb-8">

            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
              <ShieldCheck className="h-7 w-7 text-white" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                Workspace
              </p>

              <h2 className="text-xl font-semibold">
                Operations Dashboard
              </h2>
            </div>

          </div>

          <div className="space-y-4">

            <Link
              href="/dashboard"
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0b172d] px-5 py-4 hover:border-sky-500 transition"
            >
              <div className="flex items-center gap-3">
                <LayoutGrid className="h-5 w-5 text-sky-400" />
                <span>Overview</span>
              </div>

              <ArrowRight className="h-4 w-4 text-slate-400" />
            </Link>

            <Link
              href="/jobs"
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0b172d] px-5 py-4 hover:border-sky-500 transition"
            >
              <div className="flex items-center gap-3">
                <BarChart3 className="h-5 w-5 text-sky-400" />
                <span>Browse Jobs</span>
              </div>

              <ArrowRight className="h-4 w-4 text-slate-400" />
            </Link>

            <Link
              href="/jobs/new"
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0b172d] px-5 py-4 hover:border-sky-500 transition"
            >
              <div className="flex items-center gap-3">
                <Plus className="h-5 w-5 text-sky-400" />
                <span>New Request</span>
              </div>

              <ArrowRight className="h-4 w-4 text-slate-400" />
            </Link>

          </div>

          <div className="mt-8 rounded-3xl border border-sky-500/20 bg-sky-500/10 p-6">

            <div className="h-2 w-24 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 mb-6" />

            <p className="text-xs uppercase tracking-[0.35em] text-slate-400 mb-3">
              Pro Tip
            </p>

            <p className="text-slate-300 leading-8">
              Keep your workflow moving with a premium dashboard experience.
            </p>

          </div>

        </aside>

        {/* Main Content */}

        <main className="space-y-8">

          {/* Hero Section */}

          <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[#071226] p-10">

            <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />

            <div className="grid lg:grid-cols-[1fr_320px] gap-10 items-start">

              <div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-5 py-2 text-sm text-sky-300 mb-8 backdrop-blur-xl"
                >
                  <Sparkles className="h-4 w-4" />
                  Dashboard Overview
                </motion.div>

                <motion.h1
                  initial={{
                    opacity: 0,
                    y: 50,
                    filter: "blur(12px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    duration: 0.9,
                    ease: "easeOut",
                  }}
                  className="
                    max-w-5xl
                    text-5xl
                    sm:text-6xl
                    lg:text-7xl
                    font-bold
                    leading-[0.9]
                    tracking-tight
                    bg-gradient-to-r
                    from-white
                    via-slate-100
                    to-slate-400
                    bg-clip-text
                    text-transparent
                    drop-shadow-[0_0_30px_rgba(255,255,255,0.08)]
                    antialiased
                  "
                >
                  A refined
                  <br />
                  command
                  <br />
                  center for your
                  <br />
                  service board
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2,
                  }}
                  className="mt-6 max-w-3xl text-lg leading-8 text-slate-300"
                >
                  Monitor request volume,
                  status distribution, and
                  recent activity with a
                  premium dashboard experience.
                </motion.p>

              </div>

              {/* Action Card */}

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="rounded-[32px] border border-white/10 bg-[#08101f] p-8 backdrop-blur-xl"
              >

                <p className="text-xs uppercase tracking-[0.35em] text-slate-400 mb-5">
                  Fast Action
                </p>

                <p className="text-slate-300 text-lg leading-8 mb-8">
                  Quickly create and manage service requests.
                </p>

                <Link
                  href="/jobs/new"
                  className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-sky-400 to-blue-600 px-6 py-4 text-lg font-semibold hover:scale-[1.02] transition"
                >
                  <Plus className="h-5 w-5" />
                  New Request
                </Link>

              </motion.div>

            </div>

            {/* Stats */}

            {loading ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded-3xl border border-white/10 bg-[#08101f] p-8 animate-pulse"
                  >
                    <div className="h-2 w-20 rounded-full bg-slate-700 mb-8" />
                    <div className="h-12 w-16 rounded bg-slate-700 mb-4" />
                    <div className="h-4 w-32 rounded bg-slate-700" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="mt-10 rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-red-300">
                {error}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">

                {metrics.map((item) => (

                  <motion.div
                    key={item.label}
                    whileHover={{ y: -6 }}
                    className="rounded-3xl border border-white/10 bg-[#08101f] p-8 transition"
                  >

                    <div
                      className={`h-2 w-20 rounded-full bg-gradient-to-r ${item.color} mb-8`}
                    />

                    <h3 className="text-6xl font-black tracking-tight">
                      {item.value}
                    </h3>

                    <p className="mt-5 text-sm uppercase tracking-[0.35em] text-slate-400">
                      {item.label}
                    </p>

                  </motion.div>

                ))}

              </div>
            )}

          </section>

          <section className="rounded-[36px] border border-white/10 bg-[#071226] p-8 sm:p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                  Recent Activity
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Latest requests from the board
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                  A premium snapshot of the newest jobs pulled from MongoDB. Click any card to review the full request details.
                </p>
              </div>

              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 text-sm font-medium text-sky-300 transition hover:text-sky-200"
              >
                View all requests
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {loading ? (
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="rounded-3xl border border-white/10 bg-[#08101f] p-6 animate-pulse"
                  >
                    <div className="h-3 w-24 rounded-full bg-slate-700" />
                    <div className="mt-5 h-6 w-3/4 rounded bg-slate-700" />
                    <div className="mt-4 h-4 w-1/2 rounded bg-slate-700" />
                    <div className="mt-6 h-10 w-full rounded-2xl bg-slate-700" />
                  </div>
                ))}
              </div>
            ) : recentJobs.length > 0 ? (
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {recentJobs.map((job, index) => {
                  const jobId = job._id || job.id || job.slug;

                  return (
                    <Link key={jobId || `${job.title}-${index}`} href={`/jobs/${jobId}`} className="group block">
                      <motion.article
                        whileHover={{ y: -6, scale: 1.01 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-[#08101f] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)] transition"
                      >
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-500/0 via-white/0 to-blue-500/0 opacity-0 transition duration-300 group-hover:opacity-100 group-hover:from-sky-500/10 group-hover:via-transparent group-hover:to-blue-500/10" />

                        <div className="relative flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                              {job.category || "General"}
                            </p>
                            <h3 className="mt-4 text-xl font-semibold tracking-tight text-white transition group-hover:text-sky-100">
                              {job.title || "Untitled request"}
                            </h3>
                          </div>

                          <span
                            className={`inline-flex shrink-0 items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] ${getStatusStyles(job.status)}`}
                          >
                            {job.status || "open"}
                          </span>
                        </div>

                        <div className="relative mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-300">
                          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-2">
                            {job.location || "Location not set"}
                          </span>
                          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-2">
                            View details
                          </span>
                        </div>
                      </motion.article>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="mt-8 rounded-3xl border border-white/10 bg-[#08101f] p-8 text-sm text-slate-300">
                No recent requests found.
              </div>
            )}
          </section>

        </main>

      </div>
    </div>
  );
}