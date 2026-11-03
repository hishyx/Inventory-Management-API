import { Queue } from "bullmq";

export const inventoryQueue = new Queue("inventory-sync", {
  connection: {
    host: "127.0.0.1",
    port: 6379,
  },
});
