import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../api/http";
import EmptyState from "../components/EmptyState";
import FoodCard from "../components/FoodCard";
import Loader from "../components/Loader";

const MealHistory = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    from: "",
    to: "",
  });
  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    from: "",
    to: "",
    page: 1,
  });
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });

  const fetchMeals = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/meals", {
        params: {
          page: appliedFilters.page,
          limit: 6,
          search: appliedFilters.search,
          from: appliedFilters.from,
          to: appliedFilters.to,
        },
      });

      setMeals(data.data);
      setPagination(data.pagination);
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not load meal history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, [appliedFilters]);

  const applyFilters = (event) => {
    event.preventDefault();
    setAppliedFilters({
      ...filters,
      page: 1,
    });
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/meals/${id}`);
      toast.success("Meal deleted");
      fetchMeals();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not delete meal");
    }
  };

  return (
    <>
      <section className="section-shell">
        <p className="text-sm uppercase tracking-[0.2em] text-brand-500">Meal History</p>
        <h1 className="mt-3 font-display text-3xl font-bold">Track every logged meal</h1>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          Filter meals by keyword or date and delete entries you no longer need.
        </p>

        <form className="mt-6 grid gap-3 lg:grid-cols-4" onSubmit={applyFilters}>
            <input
              className="input-ui"
              placeholder="Search food name"
              value={filters.search}
            onChange={(event) =>
              setFilters((prev) => ({ ...prev, search: event.target.value }))
            }
          />
          <input
            type="date"
            className="input-ui"
            value={filters.from}
            onChange={(event) => setFilters((prev) => ({ ...prev, from: event.target.value }))}
          />
          <input
            type="date"
            className="input-ui"
            value={filters.to}
            onChange={(event) => setFilters((prev) => ({ ...prev, to: event.target.value }))}
          />
          <button type="submit" className="btn-primary">
            Apply filters
          </button>
        </form>
      </section>

      {loading ? <Loader label="Loading meal history..." /> : null}

      {!loading && meals.length ? (
        <>
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {meals.map((meal) => (
              <FoodCard key={meal._id} food={meal} onDelete={handleDelete} showDelete />
            ))}
          </section>

          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              className="btn-secondary"
              onClick={() =>
                setAppliedFilters((prev) => ({ ...prev, page: Math.max(prev.page - 1, 1) }))
              }
              disabled={pagination.page <= 1}
            >
              Previous
            </button>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              type="button"
              className="btn-secondary"
              onClick={() =>
                setAppliedFilters((prev) => ({
                  ...prev,
                  page: Math.min(prev.page + 1, pagination.totalPages),
                }))
              }
              disabled={pagination.page >= pagination.totalPages}
            >
              Next
            </button>
          </div>
        </>
      ) : null}

      {!loading && !meals.length ? (
        <EmptyState
          title="No meals found"
          description="Log a meal first or adjust your search filters to see more history."
        />
      ) : null}
    </>
  );
};

export default MealHistory;
