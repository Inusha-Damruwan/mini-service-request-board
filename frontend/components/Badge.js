const badgeStyles = {
  Open: 'bg-emerald-500/12 text-emerald-300 ring-1 ring-emerald-400/20',
  'In Progress': 'bg-amber-500/12 text-amber-300 ring-1 ring-amber-400/20',
  Closed: 'bg-slate-500/12 text-slate-300 ring-1 ring-white/10'
};

export default function StatusBadge({ status }) {
  const tone = badgeStyles[status] || badgeStyles.Open;

  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur ${tone}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {status}
    </span>
  );
}