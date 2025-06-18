import User from "../models/user.model.js";
import Item from "../models/item.models.js";

export const addFavorite = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    //frissítjük a user favorites tömbjét
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: itemId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Cannot found user" });
    }

    //frssítjük az item favoredby tömbjét

    await Item.findByIdAndUpdate(itemId, { $addToSet: { favoredBy: userId } });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error adding favorite", error });
  }
};

export const getUserFavorites = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate("favorites");

    if (!user) {
      return res.status(404).json({ message: "Cannot found user" });
    }

    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: "Error fetching favorites", error });
  }
};

export const getItemFans = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate("favoredBy");

    res.json(item.favoredBy);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};
