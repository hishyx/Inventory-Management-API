import { config as loadEnv } from "dotenv";
import mongoose, { Schema } from "mongoose";

loadEnv();

const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) {
  throw new Error("MONGO_URL is required to seed the database.");
}

const passwordHash =
  "$2a$12$O3Dxp6sllzmQRxc8yKe8ee9CLvhvs1nxNlDVn0gLawgyUIlufaoJ2";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "staff", "manager"],
      required: true,
    },
  },
  { timestamps: true },
);

const inventorySchema = new Schema(
  {
    name: { type: String, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: Array, required: true },
  },
  { timestamps: true },
);

// These model names match src/models/user.model.ts and inventory.model.ts.
const User = mongoose.models.user ?? mongoose.model("user", userSchema);
const Inventory =
  mongoose.models.item ?? mongoose.model("item", inventorySchema);

const users = [
  {
    name: "Inventory Manager",
    email: "manager@inventory.com",
    role: "manager",
  },
  {
    name: "Inventory Admin",
    email: "admin@inventory.com",
    role: "admin",
  },
  {
    name: "Company Staff",
    email: "staff@inventory.com",
    role: "staff",
  },
  { name: "Aarav Mehta", email: "aarav.mehta@example.com", role: "staff" },
  { name: "Maya Patel", email: "maya.patel@example.com", role: "manager" },
  { name: "Noah Kim", email: "noah.kim@example.com", role: "admin" },
  { name: "Sara Khan", email: "sara.khan@example.com", role: "staff" },
];

const inventoryItems = [
  {
    name: "Wireless Keyboard",
    stock: 42,
    category: "Electronics",
    description: "Compact wireless keyboard with a rechargeable battery.",
    images: [],
  },
  {
    name: "USB-C Hub",
    stock: 28,
    category: "Electronics",
    description: "Seven-port USB-C hub for laptops and tablets.",
    images: [],
  },
  {
    name: "Desk Lamp",
    stock: 16,
    category: "Office",
    description: "Adjustable LED desk lamp with three brightness settings.",
    images: [],
  },
  {
    name: "Notebook Set",
    stock: 75,
    category: "Stationery",
    description: "Set of three ruled notebooks with recycled paper.",
    images: [],
  },
  {
    name: "Ergonomic Mouse",
    stock: 33,
    category: "Electronics",
    description: "Wireless ergonomic mouse with adjustable DPI.",
    images: [],
  },
];

try {
  await mongoose.connect(mongoUrl);

  const userResult = await User.bulkWrite(
    users.map((user) => ({
      updateOne: {
        filter: { email: user.email },
        update: {
          $set: { ...user, password: passwordHash },
        },
        upsert: true,
      },
    })),
  );

  const inventoryResult = await Inventory.bulkWrite(
    inventoryItems.map((item) => ({
      updateOne: {
        filter: { name: item.name },
        update: { $set: item },
        upsert: true,
      },
    })),
  );

  console.log(
    `Seed complete: ${users.length} users and ${inventoryItems.length} inventory items processed.`,
  );
  console.log(
    `Inserted or updated users: ${userResult.upsertedCount} inserted, ${userResult.modifiedCount} updated.`,
  );
  console.log(
    `Inserted or updated inventory: ${inventoryResult.upsertedCount} inserted, ${inventoryResult.modifiedCount} updated.`,
  );
} catch (error) {
  console.error("Database seeding failed:", error);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
