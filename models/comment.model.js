import mongoose, { mongo } from "mongoose";

// author text, message text , createdAt & updatedAt

const commentSchema = new mongoose.Schema(
  {
    author: String,
    message: String,
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
