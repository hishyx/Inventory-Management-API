import type IInventorySyncJobsRepo from "../../application/interfaces/repositories/syncJobs.repository.interface.js";
import SyncJob from "../database/mongo/models/syncJob.model.js";

export default class InventorySyncJobsRepository implements IInventorySyncJobsRepo {
  async addJob(job: {
    operation: string;
    payload: Object | string;
  }): Promise<string> {
    const doc = await SyncJob.insertOne(job);

    console.log(`The mongo id is ${doc._id}`);

    return doc._id.toString();
  }

  async markCompleted(id: string): Promise<void> {
    await SyncJob.findByIdAndUpdate(id, { status: "COMPLETED" });
  }

  async markFailed(id: string): Promise<void> {
    await SyncJob.findByIdAndUpdate(id, { status: "FAILED" });
  }
}
