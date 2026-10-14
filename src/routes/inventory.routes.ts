import { Router } from "express";
import * as inventoryControllers from "../controllers/inventory.controller.js";
import {
  isAuthenticated,
  isAuthorized,
} from "../middlewares/auth.middlewares.js";
import Roles from "../utils/roles.enum.js";

const routes = Router();

routes.use(isAuthenticated);

//Read operations

routes.use(isAuthorized(Roles.ADMIN, Roles.MANAGER, Roles.STAFF));

routes.get("/", inventoryControllers.getAll);
routes.get("/:id", inventoryControllers.getItem);

//Write operation

routes.use(isAuthorized(Roles.ADMIN, Roles.MANAGER));

routes.route("/").post(inventoryControllers.addItem);
routes
  .route("/:id")
  .patch(inventoryControllers.editItem)
  .delete(inventoryControllers.removeItem);

export default routes;
