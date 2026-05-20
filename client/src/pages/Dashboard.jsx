import { useEffect, useMemo, useState } from "react";
import { api } from "../api/http";
import EmptyState from "../components/EmptyState";
import FoodCard from "../components/FoodCard";
import Loader from "../components/Loader";
import NutritionChart from "../components/NutritionChart";
import SummaryCard from "../components/SummaryCard";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/meals/stats");
        setStats(data.data);
        setError("");
      } catch (err) {
        setError(err.response?.data?.message || "Could not load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const summary = useMemo(
    () =>
      stats?.dailySummary || {
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0,
      },
    [stats]
  );

  if (loading) return <Loader label="Loading your dashboard..." />;
  if (error) return <EmptyState title="Dashboard unavailable" description={error} />;

  return (
    <>
      <section className="section-shell">
        <p className="text-sm uppercase tracking-[0.2em] text-brand-500">Dashboard</p>
        <h1 className="mt-3 font-display text-3xl font-bold">Welcome back to Bite</h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
          Monitor today&apos;s calories, macros, and your recent meals in one place.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard title="Daily Calories" value={summary.calories.toFixed(1)} unit="kcal" />
        <SummaryCard
          title="Protein"
          value={summary.protein.toFixed(1)}
          unit="g"
          accent="from-sky-500 to-cyan-700"
        />
        <SummaryCard
          title="Carbs"
          value={summary.carbs.toFixed(1)}
          unit="g"
          accent="from-amber-400 to-orange-600"
        />
        <SummaryCard
          title="Fats"
          value={summary.fats.toFixed(1)}
          unit="g"
          accent="from-rose-400 to-pink-600"
        />
      </section>

      <NutritionChart summary={summary} />

      <section className="section-shell">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold">Recent Meals</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Total tracked meals: {stats.totalMeals}
            </p>
          </div>
        </div>

        {stats.recentMeals.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {stats.recentMeals.map((meal) => (
              <FoodCard key={meal._id} food={meal} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No meals yet"
            description="Your logged meals will appear here once you scan or search and save one."
          />
        )}
      </section>
    </>
  );
};

export default Dashboard;
