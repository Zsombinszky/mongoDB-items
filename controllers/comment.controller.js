import Comment from "../models/comment.model.js";
import Item from "../models/item.models.js";

// 1. Új komment létrehozása egy itemhez

export const addCommentToItem = async (req, res) => {
  try {
    const { author, message } = req.body;
    const itemId = req.params.id;

    const newComment = await Comment.create({
      author,
      message,
    });

    const updatedItem = await Item.findByIdAndUpdate(
      itemId,
      { $push: { comments: newComment._id } },
      { new: true, runValidators: true }
    ).populate("comments");

    res.status(201).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error });
  }
};

export const getItemWithComments = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate("comments");
    res.json(item.comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error });
  }
};
