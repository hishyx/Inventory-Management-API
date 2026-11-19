import { MongoInventoryRepository } from "./modules/infrastructure/repositories/inventory.repository.js";
import { InventoryServices } from "./modules/application/services/inventory.services.js";
import { InventoryControllers } from "./modules/presentation/controllers/inventory.controllers.js";

import { MongoUserRepository } from "./modules/infrastructure/repositories/user.repository.js";
import { AuthServices } from "./modules/application/services/auth.services.js";
import { AuthControllers } from "./modules/presentation/controllers/auth.controllers.js";
import { BcryptPasswordHasher } from "./modules/infrastructure/services/bcrypt.hasher.js";
import { JwtService } from "./modules/infrastructure/services/jwt.service.js";
import { AuthMiddleware } from "./modules/presentation/middlewares/auth.middlewares.js";
import { PostgresSyncRepository } from "./modules/infrastructure/repositories/inventory.sync.repository.js";
import { createInventorySyncWorker } from "./modules/infrastructure/workers/inventory.sync.worker.js";
import { createInventoryBackfiller } from "./modules/infrastructure/database/mongo/secondary.db.bakfill.js";

import createJobProvider from "./modules/infrastructure/queues/inventory-sync.producer.js";
import InventorySyncJobsRepository from "./modules/infrastructure/repositories/syncJobs.repository.js";

//Inventory setup

const inventoryRepo = new MongoInventoryRepository();
const inventoryServ = new InventoryServices(inventoryRepo);
export const inventoryControll = new InventoryControllers(inventoryServ);

//Auth/User setup

const userRepo = new MongoUserRepository();
const passwordHasher = new BcryptPasswordHasher();
const tokenService = new JwtService();
const authServ = new AuthServices(userRepo, passwordHasher, tokenService);
export const authControll = new AuthControllers(authServ);
export const authMiddleware = new AuthMiddleware(tokenService);

//Job Saving

const syncJobsRepo = new InventorySyncJobsRepository();
export const addJob = createJobProvider(syncJobsRepo);

const inventorySyncRepo = new PostgresSyncRepository();
export const inventorySyncWorker = createInventorySyncWorker(
  inventorySyncRepo,
  syncJobsRepo,
);

export const inventoryBackfiller = createInventoryBackfiller(inventorySyncRepo);
