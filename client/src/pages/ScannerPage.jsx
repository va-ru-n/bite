import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "../api/http";
import BarcodeScanner from "../components/BarcodeScanner";
import EmptyState from "../components/EmptyState";
import FoodCard from "../components/FoodCard";
import Loader from "../components/Loader";

const ScannerPage = () => {
  const [barcode, setBarcode] = useState("");
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fetchByBarcode = async (barcodeValue) => {
    try {
      setLoading(true);
      setError("");
      setBarcode(barcodeValue);
      const { data } = await api.get(`/foods/barcode/${barcodeValue}`);
      setFood(data.data);
      toast.success("Nutrition details loaded");
    } catch (err) {
      const message = err.response?.data?.message || "Could not fetch barcode data";
      setError(message);
      setFood(null);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogMeal = async (selectedFood) => {
    try {
      setSubmitting(true);
      await api.post("/meals", selectedFood);
      toast.success("Meal logged successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not log meal");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
      <div className="space-y-6">
        <BarcodeScanner onDetected={fetchByBarcode} />

        <div className="section-shell">
          <h2 className="font-display text-xl font-semibold">Manual barcode input</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Use this if camera scanning is unavailable.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <input
              className="input-ui"
              placeholder="Enter barcode"
              value={barcode}
              onChange={(event) => setBarcode(event.target.value)}
            />
            <button
              type="button"
              className="btn-primary min-w-[160px]"
              onClick={() => fetchByBarcode(barcode)}
            >
              Fetch Nutrition
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <section className="section-shell">
          <p className="text-sm uppercase tracking-[0.2em] text-brand-500">Scanner Result</p>
          <h1 className="mt-3 font-display text-3xl font-bold">Nutrition from barcode</h1>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Scan or enter a barcode to view food details from OpenFoodFacts.
          </p>
        </section>

        {loading ? <Loader label="Fetching product nutrition..." /> : null}
        {!loading && error ? <EmptyState title="No product found" description={error} /> : null}
        {!loading && food ? (
          <FoodCard
            food={food}
            onAdd={handleLogMeal}
            showAdd={!submitting}
          />
        ) : null}
        {!loading && !food && !error ? (
          <EmptyState
            title="Ready to scan"
            description="Your product nutrition card will appear here after a successful barcode scan."
          />
        ) : null}
      </div>
    </div>
  );
};

export default ScannerPage;
