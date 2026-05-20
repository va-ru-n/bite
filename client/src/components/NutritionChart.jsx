import {
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const NutritionChart = ({ summary }) => {
  const macroData = [
    { name: "Protein", value: Number(summary.protein || 0) },
    { name: "Carbs", value: Number(summary.carbs || 0) },
    { name: "Fats", value: Number(summary.fats || 0) },
  ];

  const calorieData = [
    { name: "Calories", value: Number(summary.calories || 0) },
    { name: "Protein", value: Number(summary.protein || 0) * 4 },
    { name: "Carbs", value: Number(summary.carbs || 0) * 4 },
    { name: "Fats", value: Number(summary.fats || 0) * 9 },
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <div className="section-shell">
        <div className="mb-5">
          <h3 className="font-display text-xl font-semibold">Macro Distribution</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Your grams tracked today.</p>
        </div>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={macroData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                fill="#10b981"
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="section-shell">
        <div className="mb-5">
          <h3 className="font-display text-xl font-semibold">Calorie Breakdown</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Energy across meals and macros.
          </p>
        </div>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={calorieData}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#10b981" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default NutritionChart;
