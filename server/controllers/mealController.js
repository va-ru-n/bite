import mongoose from "mongoose";
import { Meal } from "../models/Meal.js";

const buildQuery = ({ search, from, to }) => {
  const query = {};

  if (search) {
    query.foodName = { $regex: search, $options: "i" };
  }

  if (from || to) {
    query.createdAt = {};

    if (from) {
      query.createdAt.$gte = new Date(from);
    }

    if (to) {
      const endDate = new Date(to);
      endDate.setHours(23, 59, 59, 999);
      query.createdAt.$lte = endDate;
    }
  }

  return query;
};

export const getMeals = async (req, res, next) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 8, 1), 50);
    const query = {
      user: req.user._id,
      ...buildQuery(req.query),
    };

    const [meals, total] = await Promise.all([
      Meal.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      Meal.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      data: meals,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createMeal = async (req, res, next) => {
  try {
    const { foodName, calories, protein, carbs, fats, barcode = "" } = req.body;

    if (!foodName?.trim()) {
      return res.status(400).json({ success: false, message: "Food name is required" });
    }

    const meal = await Meal.create({
      user: req.user._id,
      foodName: foodName.trim(),
      calories: Number(calories) || 0,
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fats: Number(fats) || 0,
      barcode: typeof barcode === "string" ? barcode.trim() : "",
    });

    res.status(201).json({
      success: true,
      message: "Meal logged successfully",
      data: meal,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMeal = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid meal id",
      });
    }

    const meal = await Meal.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!meal) {
      return res.status(404).json({ success: false, message: "Meal not found" });
    }

    res.status(200).json({
      success: true,
      message: "Meal deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getMealStats = async (req, res, next) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const [dailySummary, recentMeals, totalMeals] = await Promise.all([
      Meal.aggregate([
        {
          $match: {
            user: req.user._id,
            createdAt: { $gte: startOfDay },
          },
        },
        {
          $group: {
            _id: null,
            calories: { $sum: "$calories" },
            protein: { $sum: "$protein" },
            carbs: { $sum: "$carbs" },
            fats: { $sum: "$fats" },
          },
        },
      ]),
      Meal.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(5),
      Meal.countDocuments({ user: req.user._id }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalMeals,
        dailySummary: dailySummary[0] || {
          calories: 0,
          protein: 0,
          carbs: 0,
          fats: 0,
        },
        recentMeals,
      },
    });
  } catch (error) {
    next(error);
  }
};
