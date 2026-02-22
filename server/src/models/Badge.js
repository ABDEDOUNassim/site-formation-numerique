import { DataTypes, Model } from "sequelize";

export class Badge extends Model {}

export function initBadge(sequelize) {
  Badge.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      code: { type: DataTypes.STRING(50), allowNull: false, unique: true },
      name: { type: DataTypes.STRING(80), allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      iconKey: { type: DataTypes.STRING(120), allowNull: false, field: "icon_key" },
      criteria: { type: DataTypes.JSONB, allowNull: false, defaultValue: {} },
      isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, field: "is_active" }
    },
    {
      sequelize,
      modelName: "Badge",
      tableName: "badges"
    }
  );
}
