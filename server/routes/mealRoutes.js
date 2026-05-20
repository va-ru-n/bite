import { Router } from "express";
import {
  createMeal,
  deleteMeal,
  getMeals,
  getMealStats,
} from "../controllers/mealController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.use(protect);
router.get("/", getMeals);
router.post("/", createMeal);
router.get("/stats", getMealStats);
router.delete("/:id", deleteMeal);

export default router;
