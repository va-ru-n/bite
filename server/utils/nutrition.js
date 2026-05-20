const roundNumber = (value) => {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? Number(numericValue.toFixed(1)) : 0;
};

export const normalizeProduct = (product = {}) => {
  const nutriments = product.nutriments || {};

  return {
    foodName: product.product_name || product.product_name_en || "Unknown Food",
    brand: product.brands || "Unknown Brand",
    imageUrl: product.image_front_small_url || product.image_url || "",
    barcode: product.code || "",
    servingSize: product.serving_size || "100g",
    categories: product.categories_tags?.slice(0, 3) || [],
    calories: roundNumber(
      nutriments["energy-kcal_100g"] ||
        nutriments["energy-kcal_serving"] ||
        nutriments["energy-kcal"]
    ),
    protein: roundNumber(nutriments.proteins_100g || nutriments.proteins_serving),
    carbs: roundNumber(
      nutriments.carbohydrates_100g || nutriments.carbohydrates_serving
    ),
    fats: roundNumber(nutriments.fat_100g || nutriments.fat_serving),
  };
};

export const buildMealPayload = (product = {}) => {
  const normalized = normalizeProduct(product);

  return {
    foodName: normalized.foodName,
    calories: normalized.calories,
    protein: normalized.protein,
    carbs: normalized.carbs,
    fats: normalized.fats,
    barcode: normalized.barcode,
  };
};
