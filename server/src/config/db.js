import { Sequelize } from "sequelize";
import { env } from "./env.js";

function resolveSslConfig() {
  const shouldUseSsl =
    env.dbSsl === "true" ||
    (env.dbSsl === "auto" && env.databaseUrl.includes("supabase.co"));

  if (!shouldUseSsl) return undefined;

  return {
    rejectUnauthorized: env.dbSslRejectUnauthorized === "true"
  };
}

export const sequelize = new Sequelize(env.databaseUrl, {
  dialect: "postgres",
  logging: env.nodeEnv === "development" ? console.log : false,
  dialectOptions: {
    ssl: resolveSslConfig()
  },
  define: {
    underscored: true,
    freezeTableName: false,
    timestamps: true
  }
});
