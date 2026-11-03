import { inventoryQueue } from "./queue.js";

const addJob = async () => {
  const job = await inventoryQueue.add("sync-item", {
    itemId: "123",
    name: "Keyboard",
    stock: 20,
  });

  await inventoryQueue.add("sync-item", {
    itemId: "124",
    name: "Car",
    stock: 20,
  });

  await inventoryQueue.add("sync-item", {
    itemId: "122",
    name: "Bus",
    stock: 20,
  });

  console.log("Job added:", job.id);

  await inventoryQueue.close();
};

addJob().catch(console.error);
