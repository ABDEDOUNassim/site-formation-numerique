import { DataTypes, Model } from "sequelize";

export class GameProgress extends Model {}

export function initGameProgress(sequelize) {
  GameProgress.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      userId: { type: DataTypes.UUID, allowNull: false, field: "user_id" },
      gameKey: { type: DataTypes.STRING(50), allowNull: false, field: "game_key" },
      attempts: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      bestScore: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, field: "best_score" },
      lastScore: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, field: "last_score" },
      level: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
      progressPercent: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        defaultValue: 0,
        field: "progress_percent"
      },
      lastPlayedAt: { type: DataTypes.DATE, allowNull: true, field: "last_played_at" },
      meta: { type: DataTypes.JSONB, allowNull: false, defaultValue: {} }
    },
    {
      sequelize,
      modelName: "GameProgress",
      tableName: "game_progress",
      indexes: [{ unique: true, fields: ["user_id", "game_key"] }]
    }
  );
}
