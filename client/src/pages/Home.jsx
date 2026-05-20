import { ArrowRight, LockKeyhole, ScanLine, Search, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="page-shell">
      <section className="glass-panel relative overflow-hidden px-6 py-10 sm:px-10 sm:py-14">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 via-transparent to-slate-950/20" />
        <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="animate-fade-up">
            <p className="mb-4 inline-flex rounded-full bg-brand-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-brand-700 dark:bg-brand-900/30 dark:text-brand-200">
              Nutrition tracking made simple
            </p>
            <h1 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl">
              Scan smarter, search faster, and keep every bite visible.
            </h1>
            <p className="mt-5 max-w-2xl text-base text-slate-600 dark:text-slate-300 sm:text-lg">
              Bite helps you scan barcodes, search food products, and log meals with clean
              nutrition insights across calories, protein, carbs, and fats.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="btn-primary gap-2">
                    Open Dashboard
                    <ArrowRight size={18} />
                  </Link>
                  <Link to="/scanner" className="btn-secondary">
                    Scan a Barcode
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/register" className="btn-primary gap-2">
                    Create Account
                    <ArrowRight size={18} />
                  </Link>
                  <Link to="/login" className="btn-secondary">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="grid gap-4">
            {[
              {
                title: "Instant barcode scan",
                description: "Use your camera to detect packaged foods in real time.",
                icon: ScanLine,
              },
              {
                title: "Manual food search",
                description: "Search OpenFoodFacts results and log meals in one tap.",
                icon: Search,
              },
              {
                title: "JWT secured tracking",
                description: "Your dashboard and meal history are protected with account-based access.",
                icon: LockKeyhole,
              },
              {
                title: "Scalable foundation",
                description: "Built cleanly so features can grow without rewriting the core app.",
                icon: ShieldCheck,
              },
            ].map(({ title, description, icon: Icon }) => (
              <div key={title} className="glass-panel animate-float p-5">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-brand-500 p-3 text-white">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold">{title}</h3>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
