'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Filter, FolderKanban, Search, Sparkles } from 'lucide-react';
import { jobsApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

import JobCard from './JobCard';

const loadingCards = Array.from({ length: 6 }, (_, index) => index);

function belongsToUser(job, user) {
  if (!user) {
    return false;
  }

  const email = user.email?.toLowerCase();
  const name = user.name?.toLowerCase();
  const candidates = [job.contactEmail, job.email, job.ownerEmail, job.requestedByEmail, job.createdBy?.email]
    .filter(Boolean)
    .map((value) => String(value).toLowerCase());
  const nameCandidates = [job.contactName, job.requestedByName, job.createdBy?.name]
    .filter(Boolean)
    .map((value) => String(value).toLowerCase());

  return candidates.includes(email) || nameCandidates.includes(name);
}

export default function JobsBoard({ scope = 'all', title, subtitle }) {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await jobsApi.getAll();
        setJobs(response.data.data || []);
      } catch (requestError) {
        setError(requestError.response?.data?.message || 'Unable to load job requests.');
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  const scopedJobs = useMemo(() => {
    if (scope !== 'mine') {
      return jobs;
    }

    const personalJobs = jobs.filter((job) => belongsToUser(job, user));
    return personalJobs.length > 0 ? personalJobs : jobs;
  }, [jobs, scope, user]);

  const categories = useMemo(() => {
    const unique = new Set(scopedJobs.map((job) => job.category).filter(Boolean));
    return ['All', ...Array.from(unique).sort()];
  }, [scopedJobs]);

  const visibleJobs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return scopedJobs.filter((job) => {
      const matchesCategory = category === 'All' || job.category === category;
      const haystack = [job.title, job.description, job.category, job.location, job.contactName].filter(Boolean).join(' ').toLowerCase();
      const matchesSearch = !query || haystack.includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [category, search, scopedJobs]);

  const stats = useMemo(() => {
    const open = scopedJobs.filter((job) => String(job.status).toLowerCase() === 'open').length;
    const progress = scopedJobs.filter((job) => String(job.status).toLowerCase() === 'in progress').length;
    return [
      { label: 'Active requests', value: scopedJobs.length, accent: 'from-sky-400 to-blue-500' },
      { label: 'Open jobs', value: open, accent: 'from-emerald-400 to-teal-500' },
      { label: 'In progress', value: progress, accent: 'from-violet-400 to-fuchsia-500' }
    ];
  }, [scopedJobs]);

  const pageTitle = title || (scope === 'mine' ? 'My Jobs' : 'Service request command center');
  const pageSubtitle =
    subtitle ||
    (scope === 'mine'
      ? 'Track your own requests, review status changes, and jump back into high-priority work instantly.'
      : 'Browse live requests, filter by category, and move from intake to delivery in a refined premium workspace.');

  return (
    <main className="min-h-screen bg-board">
     

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-[32px] glass-card p-6 shadow-glow sm:p-8 lg:p-10"
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_48%)]" />
          <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-sky-400/10 blur-3xl" />
          <div className="pointer-events-none absolute left-0 top-24 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/60 px-4 py-2 font-label text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-sky-100/75 backdrop-blur-xl">
                <Sparkles className="h-4 w-4 text-sky-300" />
                Premium operations board
              </div>

              <h1 className="mt-6 max-w-3xl text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] lg:leading-none tracking-tight text-white sm:text-[clamp(2.75rem,6vw,3.5rem)] break-words antialiased overflow-hidden">
                {pageTitle}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">{pageSubtitle}</p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {stats.map((card) => (
                  <motion.div key={card.label} whileHover={{ y: -4 }} className="rounded-[24px] border border-white/10 bg-slate-950/72 p-4 shadow-[0_18px_38px_rgba(2,6,23,0.26)]">
                    <div className={`h-1.5 w-16 rounded-full bg-gradient-to-r ${card.accent}`} />
                    <p className="mt-4 font-display text-3xl font-black tracking-[-0.05em] tabular-nums text-white">{card.value}</p>
                    <p className="mt-1 font-label text-xs font-semibold uppercase tracking-[0.3em] text-slate-300/80">{card.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-slate-950/72 p-5 shadow-[0_18px_38px_rgba(2,6,23,0.26)] sm:p-6">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3">
                <Search className="h-4 w-4 text-sky-300" />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search requests, locations, or categories"
                  className="w-full bg-transparent text-base text-slate-100 outline-none placeholder:text-slate-400"
                />
              </div>

              <div className="mt-5 flex items-center gap-2 font-label text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-slate-400">
                <Filter className="h-4 w-4 text-sky-300" />
                Filter by category
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {categories.map((option) => {
                  const active = category === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setCategory(option)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                        active ? 'bg-gradient-to-r from-sky-400 to-blue-600 text-white shadow-lift' : 'glass-chip hover:-translate-y-0.5 hover:bg-white/14'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/jobs/new"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lift transition hover:-translate-y-0.5"
                >
                  Post a request
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-5 py-3 text-sm font-semibold text-slate-100 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/12"
                >
                  <FolderKanban className="h-4 w-4" />
                  Open dashboard
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <p className="text-sm text-slate-300">
            {visibleJobs.length} {visibleJobs.length === 1 ? 'request' : 'requests'} visible
          </p>
          <Link href="/jobs/new" className="hidden text-sm font-medium text-sky-300 transition hover:text-sky-200 sm:inline-flex">
            Create new job
          </Link>
        </div>

        {loading ? (
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {loadingCards.map((index) => (
              <div key={index} className="h-72 animate-pulse rounded-[28px] border border-white/10 bg-white/8 p-5 shadow-glow backdrop-blur-xl">
                <div className="mb-4 h-4 w-24 rounded-full bg-white/10" />
                <div className="mb-4 h-6 w-4/5 rounded-full bg-white/10" />
                <div className="space-y-3">
                  <div className="h-4 rounded-full bg-white/10" />
                  <div className="h-4 rounded-full bg-white/10" />
                  <div className="h-4 w-2/3 rounded-full bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="mt-6 rounded-[28px] border border-rose-400/20 bg-rose-500/10 px-6 py-5 text-rose-100 backdrop-blur-xl">{error}</div>
        ) : visibleJobs.length === 0 ? (
          <div className="mt-6 rounded-[28px] border border-white/10 bg-slate-950/72 px-6 py-12 text-center shadow-glow backdrop-blur-xl">
            <p className="text-[clamp(1.5rem,2vw,2rem)] font-bold leading-[1.05] tracking-[-0.04em] text-white">No jobs match this filter.</p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-300">Try another category or create a fresh request to populate the board.</p>
            <Link
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lift"
              href="/jobs/new"
            >
              Post a job request
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visibleJobs.map((job, index) => (
              <JobCard
                key={job._id}
                job={job}
                index={index}
                onDelete={(deletedId) => {
                  setJobs((currentJobs) => currentJobs.filter((currentJob) => currentJob._id !== deletedId));
                }}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}