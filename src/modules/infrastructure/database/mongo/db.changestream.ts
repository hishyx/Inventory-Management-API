import { inventoryBackfiller } from "../../../../container.js";
import { addJob } from "../../queues/inventory-sync.producer.js";
import Inventory from "./models/inventory.model.js";

export const startInventoryChangeStream = async () => {
  const changeStream = Inventory.watch([], {
    fullDocument: "updateLookup",
  });

  console.log("Inventory synchronization worker started");

  changeStream.on("change", async (change) => {
    try {
      const operation = change.operationType;

      let data;

      if (operation === "delete") data = change.documentKey._id;
      else data = change.fullDocument;

      await addJob({
        operation,
        data,
      });

      console.log("synchronisation completed");
    } catch (err) {
      console.error("Sycnronisation failed", err);
    }
  });

  changeStream.on("error", (error) => {
    console.log(`MongoDB Change Stream error`, error);
  });

  await inventoryBackfiller();
};
