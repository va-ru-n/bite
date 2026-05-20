const SummaryCard = ({ title, value, unit, accent = "from-brand-500 to-emerald-700" }) => {
  return (
    <div className="glass-panel overflow-hidden p-5">
      <div className={`mb-4 h-1.5 rounded-full bg-gradient-to-r ${accent}`} />
      <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
      <div className="mt-3 flex items-end gap-2">
        <span className="font-display text-3xl font-bold">{value}</span>
        <span className="pb-1 text-sm text-slate-500 dark:text-slate-400">{unit}</span>
      </div>
    </div>
  );
};

export default SummaryCard;
