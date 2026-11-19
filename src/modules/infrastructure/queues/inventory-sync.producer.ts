import type IInventorySyncJobsRepo from "../../application/interfaces/repositories/syncJobs.repository.interface.js";
import { inventorySyncQueue } from "./inventory-sync.queue.js";

const createJobProvider = (repo: IInventorySyncJobsRepo) => {
  return async (job: any) => {
    const jobId = await repo.addJob(job);

    job.jobId = jobId;
    await inventorySyncQueue.add("sync-item", job, {
      attempts: 5,
      backoff: {
        type: "exponential",
        delay: 1000,
      },
    });
  };
};

export default createJobProvider;
