import type { inventoryItemDTO } from "../../dto/item.dto.js";
import type { InventoryItem } from "../../../domain/entities/inventory-item.entity.js";

export default interface IInventoryService {
  addItem(itemData: inventoryItemDTO): Promise<void>;
  getItem(id: string): Promise<InventoryItem | null>;
  editItem(id: string, newData: inventoryItemDTO): Promise<void>;
  getAll(): Promise<InventoryItem[]>;
  removeItem(id: string): Promise<void>;
}
