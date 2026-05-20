import { Link, useNavigate } from "react-router-dom";
import { ActivitySquare, LogOut, Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

const Navbar = ({ onMenuToggle }) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-100/80 backdrop-blur-xl dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="btn-secondary p-3 lg:hidden"
            onClick={onMenuToggle}
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-glow">
              <ActivitySquare size={22} />
            </div>
            <div>
              <p className="font-display text-xl font-bold">Bite</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Smart bite tracking</p>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {isAuthenticated ? (
            <>
              <span className="hidden text-sm text-slate-500 dark:text-slate-400 sm:inline">
                {user?.name}
              </span>
              <button type="button" className="btn-secondary gap-2" onClick={handleLogout}>
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <div className="hidden items-center gap-3 sm:flex">
              <Link to="/login" className="btn-secondary">
                Login
              </Link>
              <Link to="/register" className="btn-primary">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
