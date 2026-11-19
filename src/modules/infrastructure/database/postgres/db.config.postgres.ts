import { Pool } from "pg";
import env from "../../../../config/zod.env.js";

const connectionString = env.POSTGRES_URL;

if (!connectionString) {
  console.error("PostgreSQL connection URL is missing");
}

export const postgresPool = new Pool({
  connectionString,
});

postgresPool.on("error", () => {
  console.error("PostgreSQL pool error");
});
