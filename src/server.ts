import connectDB from "./config/db.js";
import app from "./app.js";

import { config as dotenvConfig } from "dotenv";

dotenvConfig();

connectDB(() => app.listen(process.env.PORT));
