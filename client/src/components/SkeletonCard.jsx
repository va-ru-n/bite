const SkeletonCard = () => {
  return (
    <div className="glass-panel animate-pulse p-5">
      <div className="mb-4 h-6 w-2/3 rounded-full bg-slate-200 dark:bg-slate-700" />
      <div className="space-y-3">
        <div className="h-4 rounded-full bg-slate-200 dark:bg-slate-700" />
        <div className="h-4 w-5/6 rounded-full bg-slate-200 dark:bg-slate-700" />
        <div className="h-4 w-4/6 rounded-full bg-slate-200 dark:bg-slate-700" />
      </div>
    </div>
  );
};

export default SkeletonCard;
