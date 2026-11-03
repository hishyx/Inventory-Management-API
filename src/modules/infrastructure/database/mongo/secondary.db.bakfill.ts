import type { IInventorySyncRepository } from "../../../application/interfaces/repositories/inventory.sync.interface.js";
import Inventory from "./models/inventory.model.js";

export const createInventoryBackfiller = (repo: IInventorySyncRepository) => {
  return async () => {
    console.log("Starting inventory backfill...");

    const cursor = Inventory.find().lean().cursor();

    for await (const item of cursor) {
      await repo.upsert(item);
    }

    console.log("Completed inventory backfill...");
  };
};
