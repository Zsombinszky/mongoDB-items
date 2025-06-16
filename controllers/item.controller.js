import Item from "../models/item.models.js";

export const getItems = async (req, res) => {
  try {
    const items = await Item.find({});
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching items" });
  }
};

export const createItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: "Invalid data" });
  }
};

//lekérés kategória szerint // GET http://localhost:5000/api/items/category/fruit
export const getItemsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const items = await Item.find({ category });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching category" });
  }
};

// GET http://localhost:5000/api/items/in-stock
export const getItemsInStock = async (req, res) => {
  try {
    const items = await Item.find({ inStock: true });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching items in stock" });
  }
};

// GET http://localhost:5000/api/items/sorted/price-asc
export const getItemsByPrice = async (req, res) => {
  try {
    const items = await Item.find().sort({ price: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error sorting by Price" });
  }
};

// http://localhost:5000/api/items/count
export const getNumberOfItems = async (req, res) => {
  try {
    const count = await Item.countDocuments();
    res.json(count);
  } catch (error) {
    res.status(500).json({ message: "Error counting items", error });
  }
};

// GET http://localhost:5000/api/items/random
export const getRandomItem = async (req, res) => {
  try {
    const count = await Item.countDocuments();
    const random = Math.floor(Math.random() * count);
    const item = await Item.findOne().skip(random);
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Error fetching random item" });
  }
};

// GET http://localhost:5000/api/items/price-range?min=5&max=20
export const getItemsByPriceRange = async (req, res) => {
  try {
    const { min, max } = req.query;
    const filter = {};

    if (min) filter.price = { ...filter.price, $gte: parseFloat(min) };
    if (max) filter.price = { ...filter.price, $lte: parseFloat(max) };

    const items = await Item.find(filter).sort({ price: 1 });
    res.json(items);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching items between price range" });
  }
};

// DELETE item by ID
// DELETE http://localhost:5000/api/items/:id
export const deleteItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByIdAndDelete(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting item", error });
  }
};

// PUT update item by ID
// PUT http://localhost:5000/api/items/:id
export const updateItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(item);
  } catch (error) {
    res.status(400).json({ message: "Error updating item", error });
  }
};

export const addReviewToItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    const { username, rating, comment } = req.body;
    const newReview = { username, rating, comment };

    item.reviews.push(newReview);
    await item.save();

    res.status(201).json({ message: "Review added", review: newReview });
  } catch (error) {
    res.status(500).json({ message: "Error adding review" });
  }
};

export const getReviewsForItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    res.json(item.reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews" });
  }
};

// get average rating
export const getAverageRating = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "item not found" });

    let totalRating = 0;
    for (const review of item.reviews) {
      totalRating += review.rating;
    }

    const averageRating =
      item.reviews.length > 0 ? totalRating / item.reviews.length : 0;

    res.json({ avgRating: averageRating.toFixed(2) });
  } catch (error) {
    res.status(500).json({ message: "Error calculating average rating" });
  }
};
