import express from "express";
import {
  addFavorite,
  getUserFavorites,
  getItemFans,
} from "../controllers/favorite.controller.js";

const router = express.Router();

router.post("/", addFavorite);
router.get("/user/:id", getUserFavorites);
router.get("/item/:id", getItemFans);

export default router;
