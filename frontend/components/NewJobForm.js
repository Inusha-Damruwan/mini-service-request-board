'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, CalendarRange, MapPinned, SaveAll, Sparkles, Tags, UserRound } from 'lucide-react';
import { jobsApi } from '../services/api';

const initialState = {
  title: '',
  description: '',
  category: '',
  location: '',
  contactName: '',
  contactEmail: ''
};

export default function NewJobForm() {
  const router = useRouter();
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!formData.title.trim()) nextErrors.title = 'Title is required.';
    if (!formData.description.trim()) nextErrors.description = 'Description is required.';
    if (formData.contactEmail && !/^\S+@\S+\.\S+$/.test(formData.contactEmail)) {
      nextErrors.contactEmail = 'Enter a valid email address.';
    }
    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setLoading(true);
      setMessage('');
      await jobsApi.create(formData);
      setMessage('Job request submitted successfully.');
      setFormData(initialState);
      router.push('/jobs');
    } catch (requestError) {
      setMessage(requestError.response?.data?.message || 'Unable to create job request.');
    } finally {
      setLoading(false);
    }
  };

 return (
  <main className="min-h-screen bg-board">
    

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-medium text-slate-100 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/12"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="glass-card rounded-[32px] p-6 sm:p-8">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-sky-100/80">
                <Sparkles className="h-4 w-4 text-sky-300" />
                New job request
              </div>
              <h2 className="mt-5 font-display text-4xl font-semibold text-white">Post a service request</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">Share the work details and contact information so tradespeople can respond quickly.</p>
            </div>

            {message ? <div className="mb-6 rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-slate-100 backdrop-blur-xl">{message}</div> : null}

            <form className="grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit} noValidate>
              <Field label="Title" error={errors.title} icon={Sparkles}>
                <input name="title" value={formData.title} onChange={handleChange} className="input" placeholder="Kitchen repair request" />
              </Field>

              <Field label="Category" icon={Tags}>
                <input name="category" value={formData.category} onChange={handleChange} className="input" placeholder="Plumbing, Electrical, Home Cleaning, Painting" />
              </Field>

              <Field label="Location" icon={MapPinned}>
                <input name="location" value={formData.location} onChange={handleChange} className="input" placeholder="Colombo, Sri Lanka" />
              </Field>

              <Field label="Contact name" icon={UserRound}>
                <input name="contactName" value={formData.contactName} onChange={handleChange} className="input" placeholder="Kasun Perera" />
              </Field>

              <Field label="Contact email" error={errors.contactEmail} icon={CalendarRange}>
                <input name="contactEmail" type="email" value={formData.contactEmail} onChange={handleChange} className="input" placeholder="kasun@gmail.com" />
              </Field>

              <Field label="Description" error={errors.description} full icon={Sparkles}>
                <textarea name="description" rows="7" value={formData.description} onChange={handleChange} className="input resize-none" placeholder="Describe the work, urgency, access notes, and any special instructions. e.g., Fix leaking kitchen sink in Colombo 03; available weekdays after 5pm." />
              </Field>

              <div className="sm:col-span-2 flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-300">Fields marked required are validated before submission.</p>
                <motion.button whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lift transition disabled:cursor-not-allowed disabled:opacity-70">
                  <SaveAll className="h-4 w-4" />
                  {loading ? 'Submitting...' : 'Submit request'}
                </motion.button>
              </div>
            </form>
          </div>

          <div className="glass-card rounded-[32px] p-6 sm:p-8">
            <div className="rounded-[28px] bg-gradient-to-br from-sky-500/20 to-blue-500/10 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-100/80">What happens next</p>
              <h3 className="mt-4 font-display text-3xl font-semibold text-white">A refined intake experience</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                This premium form keeps the entry flow short, readable, and ready for real business use.
              </p>
            </div>

            <div className="mt-6 space-y-3">
              {[
                'A cleaner form helps requests feel more trustworthy.',
                'Glass surfaces keep the interface modern and focused.',
                'Rounded cards and calm spacing improve readability.'
              ].map((item) => (
                <div key={item} className="rounded-[22px] border border-white/10 bg-slate-950/45 p-4 text-sm leading-6 text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

function Field({ label, error, full, icon: Icon, children }) {
  return (
    <label className={`flex flex-col gap-2 ${full ? 'sm:col-span-2' : ''}`}>
      <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-200">
        <Icon className="h-4 w-4 text-sky-300" />
        {label}
      </span>
      {children}
      {error ? <span className="text-sm text-rose-300">{error}</span> : null}
    </label>
  );
}

Field.defaultProps = { full: false };