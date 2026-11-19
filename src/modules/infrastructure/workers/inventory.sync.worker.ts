import { Worker } from "bullmq";
import { redisConnection } from "../queues/redis.connection.js";
import type IInventorySyncRepository from "../../application/interfaces/repositories/inventory.sync.interface.js";
import type InventorySyncJobsRepository from "../repositories/syncJobs.repository.js";

export const createInventorySyncWorker = (
  syncRepo: IInventorySyncRepository,
  syncJobRepo: InventorySyncJobsRepository,
) => {
  const worker = new Worker(
    "inventory-sync",
    async (job) => {
      console.log("Inventory sync job started");

      if (job.data.operation === "delete") {
        await syncRepo.deleteById(job.data.payload);
      } else {
        await syncRepo.upsert(job.data.payload);
      }

      await syncJobRepo.markCompleted(job.data.jobId);
      console.log("Inventory sync job completed");
    },
    {
      connection: redisConnection,
    },
  );

  worker.on("failed", async (job, err) => {
    if (!job) return;

    if (job.attemptsMade >= (job.opts.attempts ?? 1)) {
      console.error(
        "All retry attempts exhausted! Pls check the postgres connection and restart the server for backfilling",
      );

      await syncJobRepo.markFailed(job.data.jobId);

      console.error(err.message);
    }
  });

  return worker;
};
