import { Schema, model as createModel } from "mongoose";

const inventorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true },
);

const Inventory = createModel("item", inventorySchema);

export default Inventory;
