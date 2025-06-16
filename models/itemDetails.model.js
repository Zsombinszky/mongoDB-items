import mongoose from "mongoose";

const itemDetailSchema = new mongoose.Schema({
  description: String,
  manufacturer: String,
  warrantyPeriod: String,
});

export default mongoose.model("ItemDetail", itemDetailSchema);
