import axios from "axios";
import { buildMealPayload, normalizeProduct } from "../utils/nutrition.js";

const OPEN_FOOD_FACTS_BASE_URL =
  process.env.OPEN_FOOD_FACTS_BASE_URL || "https://world.openfoodfacts.org";
const OPEN_FOOD_FACTS_FALLBACK_BASE_URL = "https://world.openfoodfacts.net";

const openFoodFacts = axios.create({
  baseURL: OPEN_FOOD_FACTS_BASE_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "User-Agent": "Bite/1.0 (manual-search-support)",
  },
});

const wait = (duration) =>
  new Promise((resolve) => {
    setTimeout(resolve, duration);
  });

const shouldRetrySearch = (error) =>
  !error.response || (error.response.status >= 500 && error.response.status < 600);

const fetchFoodSearchResults = async (query) => {
  const searchParams = {
    search_terms: query,
    search_simple: 1,
    action: "process",
    json: 1,
    page_size: 12,
  };

  const attempts = [
    { baseURL: OPEN_FOOD_FACTS_BASE_URL, delay: 0 },
    { baseURL: OPEN_FOOD_FACTS_BASE_URL, delay: 400 },
    { baseURL: OPEN_FOOD_FACTS_FALLBACK_BASE_URL, delay: 0 },
  ];

  let lastError;

  for (const attempt of attempts) {
    try {
      if (attempt.delay) {
        await wait(attempt.delay);
      }

      const response = await openFoodFacts.get("/cgi/search.pl", {
        baseURL: attempt.baseURL,
        params: searchParams,
      });

      return response;
    } catch (error) {
      lastError = error;

      if (!shouldRetrySearch(error)) {
        throw error;
      }
    }
  }

  throw lastError;
};

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

    const response = await fetchFoodSearchResults(query);

    const products = (response.data?.products || [])
      .filter((product) => product.product_name || product.product_name_en)
      .map((product) => normalizeProduct(product));

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    if (shouldRetrySearch(error)) {
      return res.status(503).json({
        success: false,
        message: "Food search is temporarily unavailable. Please try again in a moment.",
      });
    }

    next(error);
  }
};
