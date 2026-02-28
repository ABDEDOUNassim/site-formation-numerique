import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env.js";
import { globalLimiter } from "./middlewares/rateLimiters.js";
import { apiRouter } from "./routes/index.js";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import { sequelize } from "./models/index.js";
import { requestMeta } from "./middlewares/requestMeta.js";

export const app = express();

if (env.trustProxy) {
  app.set("trust proxy", 1);
}

app.disable("x-powered-by");
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
  })
);
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (env.frontendUrls.includes(origin)) return callback(null, true);
      if (env.nodeEnv === "development" && /^http:\/\/localhost:\d+$/.test(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true
  })
);
app.use(requestMeta);
app.use(globalLimiter);
app.use(express.json({ limit: "300kb" }));

app.get("/health", (_req, res) => {
  res.json({
    success: true,
    data: { status: "ok", env: env.nodeEnv, uptimeSec: Math.round(process.uptime()) }
  });
});

app.get("/ready", async (_req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ success: true, data: { status: "ready", database: "ok" } });
  } catch (_error) {
    res.status(503).json({
      success: false,
      error: { code: "NOT_READY", message: "Database unavailable" }
    });
  }
});

app.use("/api", apiRouter);
app.use(notFound);
app.use(errorHandler);
