"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, BadgeDollarSign, CalendarClock, MapPin, Trash2, UserCircle2 } from "lucide-react";
import StatusBadge from "./Badge";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { jobsApi } from "../services/api";

function getInitials(name) {
  if (!name) {
    return "U";
  }

  const words = String(name).trim().split(/\s+/);
  return words.slice(0, 2).map((word) => word.charAt(0).toUpperCase()).join("");
}

function formatBudget(job) {
  return job.budget || job.estimate || job.price || job.budgetRange || "Quote requested";
}

export default function JobCard({ job, index = 0, onDelete }) {
  const createdAt = job.createdAt ? new Date(job.createdAt) : null;
  const avatarLabel = getInitials(job.contactName || job.requestedByName || job.title);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const openDeleteModal = (jobId) => {
    setPendingDeleteId(jobId);
    setIsOpen(true);
  };

  const closeDeleteModal = () => {
    setIsOpen(false);
    setIsLoading(false);
    setPendingDeleteId(null);
  };

  const confirmDelete = async () => {
    if (!pendingDeleteId) {
      return;
    }

    try {
      setIsLoading(true);
      await jobsApi.remove(pendingDeleteId);

      if (onDelete) {
        onDelete(pendingDeleteId);
      }
      closeDeleteModal();
    } catch (requestError) {
      console.error("Delete error:", requestError);
      setIsLoading(false);
      throw requestError;
    }
  };

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: index * 0.04 }}
        whileHover={{ y: -8 }}
        className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/8 p-5 shadow-glow backdrop-blur-2xl transition"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.16),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200/70">{job.category || "General"}</p>
            <h2 className="mt-2 text-xl font-semibold leading-tight text-white">{job.title}</h2>
          </div>
          <StatusBadge status={job.status} />
        </div>

        <p className="relative line-clamp-3 text-sm leading-6 text-slate-300">{job.description}</p>

        <div className="relative mt-5 grid gap-3 sm:grid-cols-2">
          <Meta icon={MapPin} label="Location" value={job.location || "Remote / not specified"} />
          <Meta icon={BadgeDollarSign} label="Budget" value={formatBudget(job)} />
          <Meta icon={UserCircle2} label="Owner" value={job.contactName || "Service request"} avatar={avatarLabel} />
          <Meta
            icon={CalendarClock}
            label="Created"
            value={createdAt ? createdAt.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "Recently"}
          />
        </div>

        <div className="relative mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
          <p className="text-xs text-slate-400">{createdAt ? createdAt.toLocaleString() : "Fresh request"}</p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => openDeleteModal(job._id)}
              disabled={isLoading}
              className="inline-flex items-center gap-2 rounded-full border border-rose-400/20 bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-100 transition hover:-translate-y-0.5 hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
            <Link
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lift transition hover:-translate-y-0.5"
              href={`/jobs/${job._id}`}
            >
              View Details
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.article>

      <DeleteConfirmModal
        isOpen={isOpen}
        onConfirm={confirmDelete}
        onCancel={closeDeleteModal}
        isLoading={isLoading}
        title="Delete Request"
        message="Are you sure you want to delete this job request? This action cannot be undone."
        confirmText="Delete Request"
        cancelText="Cancel"
        itemName={job.title}
      />
    </>
  );
}

function Meta({ icon: Icon, label, value, avatar }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-slate-950/45 p-4">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
        <Icon className="h-4 w-4 text-sky-300" />
        {label}
      </div>
      <div className="mt-3 flex items-center gap-3">
        {avatar ? <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-600 font-display text-sm font-semibold text-white">{avatar}</span> : null}
        <p className="text-sm font-medium leading-6 text-white">{value}</p>
      </div>
    </div>
  );
}