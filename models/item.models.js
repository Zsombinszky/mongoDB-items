import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: String,
    price: Number,
    inStock: Boolean,
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);
