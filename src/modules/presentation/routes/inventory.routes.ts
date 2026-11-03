import { Router } from "express";
import {
  inventoryControll as inventoryControllers,
  authMiddleware,
} from "../../../container.js";
import { Roles } from "../../domain/enums/user.role.js";
const routes = Router();

routes.use(authMiddleware.isAuthenticated);

//Read operations

routes.use(
  authMiddleware.isAuthorized(Roles.ADMIN, Roles.MANAGER, Roles.STAFF),
);

routes.get("/", inventoryControllers.getAll);
routes.get("/:id", inventoryControllers.getItem);

//Write operation

routes.use(authMiddleware.isAuthorized(Roles.ADMIN, Roles.MANAGER));

routes.route("/").post(inventoryControllers.addItem);
routes
  .route("/:id")
  .put(inventoryControllers.editItem)
  .delete(inventoryControllers.removeItem);

export default routes;
