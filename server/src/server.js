import { app } from "./app.js";
import { env } from "./config/env.js";
import { sequelize } from "./models/index.js";

async function startServer() {
  await sequelize.authenticate();
  if (env.dbSyncOnStartup) {
    await sequelize.sync();
    console.log("DB sync on startup: enabled");
  } else {
    console.log("DB sync on startup: disabled");
  }

  app.listen(env.port, () => {
    console.log(`Server running on http://localhost:${env.port}`);
  });
}

startServer().catch((error) => {
  console.error("Server startup failed:", error);
  process.exit(1);
});
