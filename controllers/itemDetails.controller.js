import Item from "../models/item.models.js";
import ItemDetail from "../models/itemDetails.model.js";

export const addItemDetail = async (req, res) => {
  try {
    const itemId = req.params.id;

    const newDetail = await ItemDetail.create(req.body);

    const updatedItem = await Item.findByIdAndUpdate(
      itemId,
      {
        details: newDetail._id,
      },
      { new: true }
    );

    res.status(201).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Error adding detail " });
  }
};

export const getItemWithDetail = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate("details");

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Error fetching item", error });
  }
};
