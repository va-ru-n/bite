import { useState } from "react";
import toast from "react-hot-toast";
import { Search } from "lucide-react";
import { api } from "../api/http";
import EmptyState from "../components/EmptyState";
import FoodCard from "../components/FoodCard";
import Loader from "../components/Loader";
import SkeletonCard from "../components/SkeletonCard";

const SearchFoodPage = () => {
  const [query, setQuery] = useState("");
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submittingId, setSubmittingId] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");
      const { data } = await api.get("/foods/search", { params: { q: query } });
      setFoods(data.data);
      if (!data.data.length) {
        setError("No foods matched your search.");
      }
    } catch (err) {
      setFoods([]);
      setError(err.response?.data?.message || "Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogMeal = async (food) => {
    try {
      setSubmittingId(food.foodName);
      await api.post("/meals", food);
      toast.success(`${food.foodName} added to history`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not log meal");
    } finally {
      setSubmittingId("");
    }
  };

  return (
    <>
      <section className="section-shell">
        <p className="text-sm uppercase tracking-[0.2em] text-brand-500">Manual Search</p>
        <h1 className="mt-3 font-display text-3xl font-bold">Find meals by name</h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
          Search food products manually when a barcode is unavailable.
        </p>

        <form className="mt-6 flex flex-col gap-3 sm:flex-row" onSubmit={handleSearch}>
          <div className="relative flex-1">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              className="input-ui pl-11"
              placeholder="Search oats, yogurt, protein bar..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <button className="btn-primary min-w-[160px]" type="submit" disabled={!query.trim()}>
            Search food
          </button>
        </form>
      </section>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : null}

      {!loading && foods.length ? (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {foods.map((food) => (
            <div key={`${food.barcode}-${food.foodName}`}>
              <FoodCard
                food={food}
                onAdd={handleLogMeal}
                showAdd={submittingId !== food.foodName}
              />
              {submittingId === food.foodName ? <Loader label="Logging meal..." /> : null}
            </div>
          ))}
        </section>
      ) : null}

      {!loading && !foods.length ? (
        error ? (
          <EmptyState title="Search result" description={error} />
        ) : (
          <EmptyState
            title="Search for a meal"
            description="Start with a food keyword and Bite will fetch matching nutrition data."
          />
        )
      ) : null}
    </>
  );
};

export default SearchFoodPage;
