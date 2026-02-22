import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  DB_SSL: z.enum(["true", "false", "auto"]).default("auto"),
  DB_SSL_REJECT_UNAUTHORIZED: z.enum(["true", "false"]).default("false"),
  DB_SYNC_ON_STARTUP: z.enum(["true", "false"]).default("true"),
  JWT_SECRET: z.string().min(16, "JWT_SECRET must be at least 16 characters"),
  JWT_EXPIRES_IN: z.string().default("7d"),
  FRONTEND_URL: z.string().default("http://localhost:5173"),
  FRONTEND_URLS: z.string().optional(),
  TRUST_PROXY: z.enum(["true", "false"]).default("false"),
  ADMIN_SEED_EMAIL: z.string().email().default("admin@example.com"),
  ADMIN_SEED_PASSWORD: z.string().min(10).default("Admin123!Secure")
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const details = parsedEnv.error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join(" | ");
  throw new Error(`Invalid environment configuration: ${details}`);
}

const raw = parsedEnv.data;
const frontendUrls = (raw.FRONTEND_URLS || raw.FRONTEND_URL)
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

export const env = {
  port: raw.PORT,
  nodeEnv: raw.NODE_ENV,
  databaseUrl: raw.DATABASE_URL,
  dbSsl: raw.DB_SSL,
  dbSslRejectUnauthorized: raw.DB_SSL_REJECT_UNAUTHORIZED,
  dbSyncOnStartup: raw.DB_SYNC_ON_STARTUP === "true",
  jwtSecret: raw.JWT_SECRET,
  jwtExpiresIn: raw.JWT_EXPIRES_IN,
  frontendUrl: raw.FRONTEND_URL,
  frontendUrls,
  trustProxy: raw.TRUST_PROXY === "true",
  adminSeedEmail: raw.ADMIN_SEED_EMAIL,
  adminSeedPassword: raw.ADMIN_SEED_PASSWORD
};
