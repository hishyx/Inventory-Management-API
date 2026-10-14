import * as inventoryRepository from "../repositories/inventory.repository.js";
import type { inventoryItemDTO } from "../dtos/item.dto.js";
import httpError from "../utils/custom.error.class.js";

export const addItem = async (itemData: inventoryItemDTO) => {
  const { name, description, stock, images, category } = itemData;
  if (!name || name.length < 5)
    throw new httpError("Name should be at least 5 characters", 400);

  const existingItem = await inventoryRepository.getItem(name, true);

  if (existingItem)
    throw new httpError("Item with same name already exists", 409);

  if (!description || description.length < 30)
    throw new httpError("Description should be at least 30 characters", 400);

  if (!images || images.length < 1)
    throw new httpError("At least one image should be present", 400);

  if (!category) throw new httpError("Category is mandatory", 400);

  if (stock == null || stock < 10)
    throw new httpError("Minimum stock is 10", 400);

  const item = await inventoryRepository.addItem(itemData);

  return item.toObject();
};

export const editItem = async (id: string, newData: inventoryItemDTO) => {
  const { name, description, stock, images, category } = newData;

  if (!name || name.length < 5)
    throw new httpError("Name should be at least 5 characters", 400);

  const existingItem = await inventoryRepository.getItem(name, true);

  if (existingItem && existingItem?._id.toString() !== id)
    throw new httpError("Item with same name already exists", 409);

  if (!description || description.length < 30)
    throw new httpError("Description should be at least 30 characters", 400);

  if (!images || images.length < 1)
    throw new httpError("At least one image should be present", 400);

  if (!category) throw new httpError("Category is mandatory", 400);

  if (stock == null || stock < 10)
    throw new httpError("Minimum stock is 10", 400);

  const item = await inventoryRepository.editItem(id, newData);

  if (!item) throw new httpError("Item doesn't exist", 404);

  return item.toObject();
};

export const getAll = async () => {
  const items = await inventoryRepository.getAll();

  if (items.length < 1) throw new httpError("Inventory is Empty", 404);

  return items;
};

export const getItem = async (id: string) => {
  const item = await inventoryRepository.getItem(id);

  if (!item) throw new httpError("Item doesn't exist", 404);

  return item?.toObject();
};

export const removeItem = async (id: string) => {
  const item = await inventoryRepository.removeItem(id);

  if (!item) throw new httpError("Item doesn't exist", 404);
};
