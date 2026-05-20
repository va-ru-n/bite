const EmptyState = ({ title, description }) => {
  return (
    <div className="section-shell flex min-h-[220px] flex-col items-center justify-center text-center">
      <h3 className="font-display text-xl font-semibold">{title}</h3>
      <p className="mt-3 max-w-md text-sm text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  );
};

export default EmptyState;
