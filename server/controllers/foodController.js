import axios from "axios";
import { buildMealPayload, normalizeProduct } from "../utils/nutrition.js";

const openFoodFacts = axios.create({
  baseURL: process.env.OPEN_FOOD_FACTS_BASE_URL || "https://world.openfoodfacts.org",
  timeout: 10000,
});

export const getFoodByBarcode = async (req, res, next) => {
  try {
    const { barcode } = req.params;

    if (!/^\d{8,14}$/.test(barcode)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid barcode",
      });
    }

    const response = await openFoodFacts.get(`/api/v2/product/${barcode}.json`);
    const product = response.data?.product;

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "No product found for this barcode",
      });
    }

    res.status(200).json({
      success: true,
      data: normalizeProduct(product),
      mealPayload: buildMealPayload(product),
    });
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({
        success: false,
        message: "No product found for this barcode",
      });
    }

    next(error);
  }
};

export const searchFoods = async (req, res, next) => {
  try {
    const query = req.query.q?.trim();

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const response = await openFoodFacts.get("/cgi/search.pl", {
      params: {
        search_terms: query,
        search_simple: 1,
        action: "process",
        json: 1,
        page_size: 12,
      },
    });

    const products = (response.data?.products || [])
      .filter((product) => product.product_name || product.product_name_en)
      .map((product) => normalizeProduct(product));

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};
