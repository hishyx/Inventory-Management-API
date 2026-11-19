import type { inventoryItemDTO } from "../../dto/item.dto.js";

export default interface IInventorySyncRepository {
  upsert(item: inventoryItemDTO): Promise<void>;
  deleteById(id: string): Promise<void>;
  cleanUp(): Promise<void>;
}
