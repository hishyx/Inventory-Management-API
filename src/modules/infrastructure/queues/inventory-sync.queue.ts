import { Queue } from "bullmq";
import { redisConnection } from "./redis.connection.js";

export const inventorySyncQueue = new Queue("inventory-sync", {
  connection: redisConnection,
});
