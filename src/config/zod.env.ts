import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),

  MONGO_URL: z.string().min(1),
  POSTGRES_URL: z.string().min(1),

  JWT_SECRET_KEY: z.string().min(32),

  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

const env = envSchema.parse(process.env);

export default env;
