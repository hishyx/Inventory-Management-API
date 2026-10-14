import express from "express";
import inventoryRoutes from "./routes/inventory.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { errorHandlingMiddleware } from "./middlewares/errorHandling.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/inventory", inventoryRoutes);
app.use("/api/auth", authRoutes);

app.use(errorHandlingMiddleware);

export default app;
