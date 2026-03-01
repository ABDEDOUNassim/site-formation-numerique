import { SequelizeStorage, Umzug } from "umzug";
import { sequelize } from "../config/db.js";

const umzug = new Umzug({
  migrations: {
    glob: "src/migrations/*.migration.js"
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({
    sequelize,
    tableName: "sequelize_meta"
  }),
  logger: console
});

async function run() {
  const action = process.argv[2] || "up";

  try {
    await sequelize.authenticate();

    if (action === "up") {
      const results = await umzug.up();
      console.log(`Migrations appliquees: ${results.length}`);
    } else if (action === "down") {
      const results = await umzug.down({ step: 1 });
      console.log(`Migrations annulees: ${results.length}`);
    } else if (action === "status") {
      const [executed, pending] = await Promise.all([umzug.executed(), umzug.pending()]);
      console.log("Executed:", executed.map((m) => m.name));
      console.log("Pending:", pending.map((m) => m.name));
    } else {
      throw new Error(`Action inconnue: ${action}. Utiliser up | down | status`);
    }

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error("Migration error", error);
    try {
      await sequelize.close();
    } catch {
      // no-op
    }
    process.exit(1);
  }
}

run();
