import "dotenv/config";
import connectDB from "./modules/infrastructure/database/mongo/db.config.mongo.js";
import app from "./app.js";
import env from "./config/zod.env.js";
import { inventorySyncWorker } from "./container.js";
import { startInventoryChangeStream } from "./modules/infrastructure/database/mongo/db.changestream.js";

await connectDB(async () => {
  await startInventoryChangeStream();
  await inventorySyncWorker.waitUntilReady();
  app.listen(env.PORT);
});
