import type IInventoryRepository from "../interfaces/repositories/inventory.repository.interface.js";
import type IInventoryService from "../interfaces/services/inventory.services.interface.js";
import httpError from "../utils/custom.error.class.js";
import type { inventoryItemDTO } from "../dto/item.dto.js";
import type { InventoryItem } from "../../domain/entities/inventory-item.entity.js";

export class InventoryServices implements IInventoryService {
  constructor(private repo: IInventoryRepository) {}

  addItem = async (itemData: inventoryItemDTO): Promise<void> => {
    const { name, description, stock, images, category } = itemData;
    if (!name || name.length < 5)
      throw new httpError("Name should be at least 5 characters", 400);

    const existingItem = await this.repo.getItemByName(name);

    if (existingItem)
      throw new httpError("Item with same name already exists", 409);

    if (!description || description.length < 30)
      throw new httpError("Description should be at least 30 characters", 400);

    if (!images || images.length < 1)
      throw new httpError("At least one image should be present", 400);

    if (!category) throw new httpError("Category is mandatory", 400);

    if (stock == null || stock < 10)
      throw new httpError("Minimum stock is 10", 400);

    const createdItem = await this.repo.addItem(itemData);

    if (!createdItem) throw new httpError("Failed to create inventory item", 500);
  };

  editItem = async (id: string, newData: inventoryItemDTO): Promise<void> => {
    const { name, description, stock, images, category } = newData;

    if (!name || name.length < 5)
      throw new httpError("Name should be at least 5 characters", 400);

    const existingItem = await this.repo.getItemByName(name);

    if (existingItem && existingItem.id !== id)
      throw new httpError("Item with same name already exists", 409);

    if (!description || description.length < 30)
      throw new httpError("Description should be at least 30 characters", 400);

    if (!images || images.length < 1)
      throw new httpError("At least one image should be present", 400);

    if (!category) throw new httpError("Category is mandatory", 400);

    if (stock == null || stock < 10)
      throw new httpError("Minimum stock is 10", 400);

    const updated = await this.repo.editItemById(id, newData);

    if (!updated) throw new httpError("Item doesn't exist", 404);
  };

  getAll = async (): Promise<InventoryItem[]> => {
    const items = await this.repo.getAllItems();

    if (items.length < 1) throw new httpError("Inventory is Empty", 404);

    return items;
  };

  getItem = async (id: string): Promise<InventoryItem> => {
    const item = await this.repo.getItemById(id);

    if (!item) throw new httpError("Item doesn't exist", 404);

    return item;
  };

  removeItem = async (id: string): Promise<void> => {
    const deleted = await this.repo.deleteItem(id);

    if (!deleted) throw new httpError("Item doesn't exist", 404);
  };
}
