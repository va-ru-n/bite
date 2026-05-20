import { Router } from "express";
import { getFoodByBarcode, searchFoods } from "../controllers/foodController.js";

const router = Router();

router.get("/search", searchFoods);
router.get("/barcode/:barcode", getFoodByBarcode);

export default router;
