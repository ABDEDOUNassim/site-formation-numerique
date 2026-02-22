import { DataTypes, Model } from "sequelize";

export class UserBadge extends Model {}

export function initUserBadge(sequelize) {
  UserBadge.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      userId: { type: DataTypes.UUID, allowNull: false, field: "user_id" },
      badgeId: { type: DataTypes.UUID, allowNull: false, field: "badge_id" },
      earnedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: "earned_at" },
      sourceGameKey: { type: DataTypes.STRING(50), allowNull: true, field: "source_game_key" },
      meta: { type: DataTypes.JSONB, allowNull: false, defaultValue: {} }
    },
    {
      sequelize,
      modelName: "UserBadge",
      tableName: "user_badges",
      indexes: [{ unique: true, fields: ["user_id", "badge_id"] }]
    }
  );
}
