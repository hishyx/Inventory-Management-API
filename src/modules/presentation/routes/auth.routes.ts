import { Router } from "express";
import {
  authControll as authControllers,
  authMiddleware,
} from "../../../container.js";
import { Roles } from "../../domain/enums/user.role.js";
const routes = Router();

routes.post("/login", authControllers.login);

routes.use(authMiddleware.isAuthenticated);

routes.post(
  "/user",
  authMiddleware.isAuthorized(Roles.ADMIN),
  authControllers.createUser,
);

routes.put(
  "/user/:id",
  authMiddleware.isAuthorized(Roles.ADMIN),
  authControllers.editUser,
);

export default routes;
