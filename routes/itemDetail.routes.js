import express from "express";
import {
  addItemDetail,
  getItemWithDetail,
} from "../controllers/itemDetails.controller.js";

const router = express.Router();

router.post("/:id", addItemDetail);
router.get("/:id", getItemWithDetail);

export default router;
