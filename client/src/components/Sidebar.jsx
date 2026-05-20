import { History, House, LayoutDashboard, ScanLine, Search } from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home", icon: House },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/scanner", label: "Scanner", icon: ScanLine },
  { to: "/search", label: "Search Food", icon: Search },
  { to: "/history", label: "Meal History", icon: History },
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-slate-950/40 transition lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed left-0 top-0 z-40 flex h-full w-72 flex-col border-r border-white/10 bg-white/80 p-5 backdrop-blur-xl transition-transform dark:bg-slate-950/85 lg:sticky lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 mt-20 lg:mt-6">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-500">Navigation</p>
        </div>
        <nav className="space-y-2">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-brand-500 text-white shadow-glow"
                    : "text-slate-600 hover:bg-white dark:text-slate-300 dark:hover:bg-slate-900"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto rounded-3xl bg-gradient-to-br from-brand-500 to-emerald-700 p-5 text-white">
          <p className="font-display text-lg font-semibold">Daily focus</p>
          <p className="mt-2 text-sm text-emerald-50">
            Scan packaged foods fast, log better meals, and keep your nutrition visible.
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
