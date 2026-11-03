import { Schema, model as createModel, type InferSchemaType } from "mongoose";

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
      type: [String],
      required: true,
    },
  },
  { timestamps: true },
);

export type InventoryType = InferSchemaType<typeof inventorySchema>;

const Inventory = createModel("item", inventorySchema);

export default Inventory;
