import Inventory from "../models/inventory.model.js";
import type { inventoryItemDTO } from "../dtos/item.dto.js";

export const addItem = async (item: inventoryItemDTO) => {
  return await Inventory.insertOne(item);
};

export const getItem = async (identifier: string, isName: boolean = false) => {
  if (isName)
    return await Inventory.findOne({
      name: { $regex: `^${identifier}$`, $options: "i" },
    });
  else return await Inventory.findById(identifier);
};

export const editItem = async (id: string, newData: inventoryItemDTO) => {
  return await Inventory.findByIdAndUpdate(id, newData, { new: true });
};

export const getAll = async () => {
  return await Inventory.find({});
};

export const removeItem = async (id: string) => {
  return await Inventory.findByIdAndDelete(id);
};
