import mongoose from "mongoose";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";
import { connectDB } from "../config/db.js";
import Item from "../models/item.models.js";

dotenv.config();

const seedItems = async () => {
  try {
    await connectDB();

    await Item.deleteMany();
    console.log("Items collection cleared");

    const categories = ["fruit", "vegetable", "dairy", "meat", "snack"];

    const fakeItems = Array.from({ length: 40 }, () => ({
      name: faker.commerce.productName(),
      category: faker.helpers.arrayElement(categories),
      price: parseFloat(faker.commerce.price({ min: 0.5, max: 30 })),
      inStock: faker.datatype.boolean(),
    }));

    await Item.insertMany(fakeItems);
    console.log("40 fake items inserted into DB");

    process.exit(0);
  } catch (error) {
    console.error("Seeder error: ", error.message);
    process.exit(1);
  }
};

seedItems();
