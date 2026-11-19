import { config as loadEnv } from "dotenv";
import mongoose, { Schema } from "mongoose";

loadEnv();

const mongoUrl = "mongodb://127.0.0.1:27017/inventory-management-api"
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
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800",
    ],
  },
  {
    name: "USB-C Hub",
    stock: 28,
    category: "Electronics",
    description: "Seven-port USB-C hub for laptops and tablets.",
    images: [
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800",
      "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800",
    ],
  },
  {
    name: "Desk Lamp",
    stock: 16,
    category: "Office",
    description: "Adjustable LED desk lamp with three brightness settings.",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800",
    ],
  },
  {
    name: "Notebook Set",
    stock: 75,
    category: "Stationery",
    description: "Set of three ruled notebooks with recycled paper.",
    images: [
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800",
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800",
    ],
  },
  {
    name: "Ergonomic Mouse",
    stock: 33,
    category: "Electronics",
    description: "Wireless ergonomic mouse with adjustable DPI.",
    images: [
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800",
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800",
    ],
  },
];

try {
  await mongoose.connect(mongoUrl);

  await User.bulkWrite(
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

  await Inventory.bulkWrite(
    inventoryItems.map((item) => ({
      updateOne: {
        filter: { name: item.name },
        update: { $set: item },
        upsert: true,
      },
    })),
  );

  console.log("Database seeding completed");
} catch {
  console.error("Database seeding failed");
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
