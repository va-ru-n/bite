import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import mealRoutes from "./routes/mealRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Connect MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: [
      "https://bite-two.vercel.app",
      "https://bite-git-main-va-ru-ns-projects.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Health Route
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Bite API is running",
  });
});

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Bite backend is live",
    endpoints: {
      health: "/api/health",
      auth: "/api/auth",
      meals: "/api/meals",
      foods: "/api/foods",
    },
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/foods", foodRoutes);

app.use("/api/*", (_req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
});

// Error Handler
app.use((err, _req, res, _next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message:
      err.response?.data?.status_verbose || err.message || "Server error",
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
