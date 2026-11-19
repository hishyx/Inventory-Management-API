export default interface IInventorySyncJobsRepo {
  addJob(job: { operation: string; payload: Object | string }): Promise<string>;
  markCompleted(id: string): Promise<void>;
  markFailed(id: string): Promise<void>;
}
