import type { inventoryItemDTO } from "../../dto/item.dto.js";
import type { InventoryItem } from "../../../domain/entities/inventory-item.entity.js";

export default interface IInventoryRepository {
  addItem(item: inventoryItemDTO): Promise<InventoryItem | null>;
  getItemById(id: string): Promise<InventoryItem | null>;
  getItemByName(name: string): Promise<InventoryItem | null>;
  editItemById(
    id: string,
    newData: inventoryItemDTO,
  ): Promise<InventoryItem | null>;
  getAllItems(): Promise<InventoryItem[]>;
  deleteItem(id: string): Promise<boolean>;
}
