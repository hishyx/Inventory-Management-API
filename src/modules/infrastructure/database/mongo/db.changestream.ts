import { string } from "zod";
import { addJob, inventoryBackfiller } from "../../../../container.js";
import Inventory from "./models/inventory.model.js";

export const startInventoryChangeStream = async () => {
  const changeStream = Inventory.watch([], {
    fullDocument: "updateLookup",
  });

  console.log("Inventory synchronization worker started");

  changeStream.on("change", async (change) => {
    try {
      const operation = change.operationType;

      let payload: any;

      if (operation === "delete") payload = change.documentKey._id;
      else payload = change.fullDocument;

      await addJob({
        operation,
        payload,
      });
    } catch (err) {
      console.error("Inventory synchronization failed");

      console.log(err);
    }
  });

  changeStream.on("error", () => {
    console.error("MongoDB change stream failed");
  });

  await inventoryBackfiller();
};
