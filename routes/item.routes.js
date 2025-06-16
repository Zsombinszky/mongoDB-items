import express from "express";
import {
  getItems,
  createItem,
  getItemsByCategory,
  getItemsInStock,
  getItemsByPrice,
  getNumberOfItems,
  getRandomItem,
  getItemsByPriceRange,
  updateItemById,
  deleteItemById,
  addReviewToItem,
  getReviewsForItem,
  getAverageRating,
} from "../controllers/item.controller.js";

const router = express.Router();

router.get("/", getItems);
router.post("/", createItem);
router.get("/category/:category", getItemsByCategory);
router.get("/in-stock", getItemsInStock);
router.get("/sorted/price-asc", getItemsByPrice);
router.get("/count", getNumberOfItems);
router.get("/random", getRandomItem);
router.get("/price-range", getItemsByPriceRange);

router.put("/:id", updateItemById);
router.delete("/:id", deleteItemById);
router.post("/:id/reviews", addReviewToItem);
router.get("/:id/reviews", getReviewsForItem);
router.get("/:id/average-rating", getAverageRating);

export default router;
