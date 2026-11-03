import { Pool } from "pg";
import env from "../../../../config/zod.env.js";

const connectionString = env.POSTGRES_URL;

if (!connectionString) {
  console.log("No PostgreSQL connection URL found", 500);
}

export const postgresPool = new Pool({
  connectionString,
});

postgresPool.on("error", (error) => {
  console.error("Unexpected PostgreSQL pool error:", error);
});

console.log("connectionString is", connectionString);
