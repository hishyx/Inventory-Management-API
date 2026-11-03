import { inventorySyncQueue } from "./inventory-sync.queue.js";

export const addJob = async (data: any) => {
  await inventorySyncQueue.add("sync-item", data, {
    attempts: 5,
    backoff: {
      type: "exponential",
      delay: 1000,
    },
  });
};
