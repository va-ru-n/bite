import { Plus, ScanBarcode, Trash2 } from "lucide-react";
import { formatDateTime, formatNumber } from "../utils/formatters";

const statItems = (food) => [
  { label: "Calories", value: formatNumber(food.calories), unit: "kcal" },
  { label: "Protein", value: formatNumber(food.protein), unit: "g" },
  { label: "Carbs", value: formatNumber(food.carbs), unit: "g" },
  { label: "Fats", value: formatNumber(food.fats), unit: "g" },
];

const FoodCard = ({ food, onAdd, onDelete, showAdd = false, showDelete = false }) => {
  return (
    <article className="glass-panel flex h-full flex-col overflow-hidden p-5">
      {food.imageUrl ? (
        <img
          src={food.imageUrl}
          alt={food.foodName}
          className="mb-4 h-40 w-full rounded-2xl object-cover"
        />
      ) : (
        <div className="mb-4 flex h-40 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-100 to-white text-brand-700 dark:from-brand-900/40 dark:to-slate-900">
          <ScanBarcode size={40} />
        </div>
      )}

      <div className="flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-semibold">{food.foodName}</h3>
            {food.brand ? (
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{food.brand}</p>
            ) : null}
          </div>
          {food.barcode ? (
            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-900/30 dark:text-brand-200">
              {food.barcode}
            </span>
          ) : null}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {statItems(food).map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200/70 bg-white/70 p-3 dark:border-slate-700 dark:bg-slate-900/60"
            >
              <p className="text-xs text-slate-500 dark:text-slate-400">{item.label}</p>
              <p className="mt-1 text-base font-semibold">
                {item.value} <span className="text-xs text-slate-500">{item.unit}</span>
              </p>
            </div>
          ))}
        </div>

        {food.createdAt ? (
          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            Logged {formatDateTime(food.createdAt)}
          </p>
        ) : null}
      </div>

      <div className="mt-5 flex gap-3">
        {showAdd ? (
          <button type="button" className="btn-primary flex-1 gap-2" onClick={() => onAdd(food)}>
            <Plus size={18} />
            Log meal
          </button>
        ) : null}
        {showDelete ? (
          <button
            type="button"
            className="btn-secondary flex-1 gap-2 text-rose-600 dark:text-rose-300"
            onClick={() => onDelete(food._id)}
          >
            <Trash2 size={18} />
            Delete
          </button>
        ) : null}
      </div>
    </article>
  );
};

export default FoodCard;
