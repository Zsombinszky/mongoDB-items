import express from "express";
import {
  addCommentToItem,
  getItemWithComments,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/:id", addCommentToItem);

router.get("/:id", getItemWithComments);

export default router;
