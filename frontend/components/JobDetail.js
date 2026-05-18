'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, BadgeDollarSign, CalendarDays, PencilLine, Trash2 } from 'lucide-react';

import StatusBadge from './Badge';
import DeleteConfirmModal from './DeleteConfirmModal';
import { jobsApi } from '../services/api';
import { useDeleteConfirm } from '../hooks/useDeleteConfirm';

const statusOptions = ['Open', 'In Progress', 'Closed'];

function isValidObjectId(value) {
  return typeof value === 'string' && /^[a-fA-F0-9]{24}$/.test(value);
}

export default function JobDetail({ id }) {
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [status, setStatus] = useState('Open');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  
  // Delete confirmation modal hook
  const { isOpen, isLoading, openModal, closeModal, confirm } = useDeleteConfirm();

  useEffect(() => {
    const loadJob = async () => {
      if (!id || !isValidObjectId(id)) {
        setError('Invalid job identifier.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await jobsApi.getById(id);
        const jobData = response.data.data;
        setJob(jobData);
        setStatus(jobData.status);
      } catch (requestError) {
        setError(requestError.response?.data?.message || 'Unable to load job details.');
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id]);

  const handleStatusUpdate = async () => {
    if (!id || !isValidObjectId(id)) {
      setMessage('Invalid job identifier.');
      return;
    }

    try {
      setActionLoading(true);
      setMessage('');
      const response = await jobsApi.updateStatus(id, status);
      setJob(response.data.data);
      setMessage('Job status updated successfully.');
    } catch (requestError) {
      setMessage(requestError.response?.data?.message || 'Unable to update job status.');
    } finally {
      setActionLoading(false);
    }
  };

  const openDeleteModal = () => {
    if (!id || !isValidObjectId(id)) {
      setMessage('Invalid job identifier.');
      return;
    }

    openModal(async () => {
      try {
        await jobsApi.remove(id);
        router.push('/jobs');
      } catch (requestError) {
        const errorMsg = requestError.response?.data?.message || 'Unable to delete job request.';
        setMessage(errorMsg);
        throw requestError;
      }
    });
  };

  return (
    <main className="min-h-screen bg-board">
      

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-medium text-slate-100 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/12"
            aria-label="Back to jobs"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Jobs
          </Link>
        </div>

        {loading ? (
          <div className="glass-card rounded-[32px] p-8 text-slate-100">Loading job details...</div>
        ) : error ? (
          <div className="rounded-[28px] border border-rose-400/20 bg-rose-500/10 px-6 py-5 text-rose-100 backdrop-blur-xl">{error}</div>
        ) : job ? (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-[32px] p-6 shadow-glow sm:p-8">
            <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-200/70">Job details</p>
                <h2 className="mt-3 font-display text-4xl font-semibold text-white">{job.title}</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">{job.description}</p>
              </div>
              <StatusBadge status={job.status} />
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Info label="Category" value={job.category || 'Not provided'} />
              <Info label="Location" value={job.location || 'Not provided'} />
              <Info label="Contact name" value={job.contactName || 'Not provided'} />
              <Info label="Contact email" value={job.contactEmail || 'Not provided'} />
              <Info label="Created at" value={new Date(job.createdAt).toLocaleString()} />
              <Info label="Budget" value={job.budget || job.estimate || 'Quote requested'} icon={BadgeDollarSign} />
            </div>

            {message ? <div className="mt-6 rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-slate-100 backdrop-blur-xl">{message}</div> : null}

            <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-end sm:justify-between">
              <label className="flex w-full flex-col gap-2 sm:max-w-xs">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-200">
                  <CalendarDays className="h-4 w-4 text-sky-300" />
                  Update status
                </span>
                <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-400/50 focus:shadow-[0_0_0_4px_rgba(96,165,250,0.12)]">
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleStatusUpdate}
                  disabled={actionLoading}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lift transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <PencilLine className="h-4 w-4" />
                  {actionLoading ? 'Saving...' : 'Save status'}
                </button>
                <button
                  onClick={() => openDeleteModal(id)}
                  disabled={isLoading}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-red-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(244,63,94,0.2)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}

        {/* Delete Confirmation Modal */}
        <DeleteConfirmModal
          isOpen={isOpen}
          onConfirm={confirm}
          onCancel={closeModal}
          isLoading={isLoading}
          title="Delete Job Request"
          message="This job request will be permanently deleted. This action cannot be undone."
          confirmText="Delete Request"
          cancelText="Cancel"
          itemName={job?.title}
        />
      </section>
    </main>
  );
}

function Info({ label, value, icon: Icon }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-slate-950/45 p-4">
      <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
        {Icon ? <Icon className="h-4 w-4 text-sky-300" /> : null}
        {label}
      </p>
      <p className="mt-3 text-sm font-medium leading-6 text-white">{value}</p>
    </div>
  );
}