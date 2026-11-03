import express from "express";
import inventoryRoutes from "./modules/presentation/routes/inventory.routes.js";
import authRoutes from "./modules/presentation/routes/auth.routes.js";
import { errorHandlingMiddleware } from "./modules/presentation/middlewares/errorHandling.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/inventory", inventoryRoutes);
app.use("/api/auth", authRoutes);

app.use(errorHandlingMiddleware);

export default app;
