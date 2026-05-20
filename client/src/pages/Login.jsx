import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      await login(form);
      toast.success("Welcome back to Bite");
      navigate(location.state?.from?.pathname || "/dashboard", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <section className="glass-panel mx-auto w-full max-w-lg p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-brand-500">Login</p>
        <h1 className="mt-3 font-display text-3xl font-bold">Welcome back to Bite</h1>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          Sign in to keep your meal history, dashboard, and nutrition tracking private.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            className="input-ui"
            placeholder="Email address"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            required
          />
          <input
            type="password"
            className="input-ui"
            placeholder="Password"
            value={form.password}
            onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
            required
          />
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">
          Need an account?{" "}
          <Link to="/register" className="font-semibold text-brand-600">
            Create one
          </Link>
        </p>
      </section>
    </div>
  );
};

export default Login;
