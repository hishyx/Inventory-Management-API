import { Router } from "express";
import * as authControllers from "../controllers/auth.controller.js";
import {
  isAuthenticated,
  isAuthorized,
} from "../middlewares/auth.middlewares.js";
import Roles from "../utils/roles.enum.js";

const routes = Router();

routes.post("/login", authControllers.login);

routes.use(isAuthenticated);

routes.post("/user", isAuthorized(Roles.ADMIN), authControllers.createUser);

routes.post("/user/:id", isAuthorized(Roles.ADMIN), authControllers.editUser);

export default routes;
