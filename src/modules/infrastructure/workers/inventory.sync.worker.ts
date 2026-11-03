import { Worker } from "bullmq";
import { redisConnection } from "../queues/redis.connection.js";
import type { IInventorySyncRepository } from "../../application/interfaces/repositories/inventory.sync.interface.js";

export const createInventorySyncWorker = (repo: IInventorySyncRepository) => {
  return new Worker(
    "inventory-sync",
    async (job) => {
      console.log("Processing job:", job);

      if (job.data.operation === "delete") {
        await repo.deleteById(job.data);
      } else {
        await repo.upsert(job.data.data);
      }

      console.log("Job completed!");
    },
    {
      connection: redisConnection,
    },
  );
};
