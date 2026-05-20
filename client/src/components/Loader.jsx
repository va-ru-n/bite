const Loader = ({ label = "Loading..." }) => {
  return (
    <div className="flex min-h-[180px] items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-sm text-slate-500 dark:text-slate-300">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-200 border-t-brand-500" />
        <p>{label}</p>
      </div>
    </div>
  );
};

export default Loader;
