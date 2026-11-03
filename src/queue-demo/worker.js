import { Worker } from "bullmq";

const worker = new Worker(
  "inventory-sync",
  async (job) => {
    console.log("Processing job:", job.id);
    console.log("Job name:", job.name);
    console.log("Job data:", job.data);

    // Simulate some asynchronous work
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Job completed!");
  },
  {
    connection: {
      host: "127.0.0.1",
      port: 6379,
    },
  },
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, error) => {
  console.error(`Job ${job?.id} failed:`, error.message);
});
