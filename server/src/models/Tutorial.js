import { DataTypes, Model } from "sequelize";

export class Tutorial extends Model {}

export function initTutorial(sequelize) {
  Tutorial.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      title: { type: DataTypes.STRING(140), allowNull: false },
      slug: { type: DataTypes.STRING(160), allowNull: false, unique: true },
      theme: { type: DataTypes.STRING(40), allowNull: false },
      content: { type: DataTypes.TEXT, allowNull: false },
      status: {
        type: DataTypes.ENUM("draft", "published", "archived"),
        allowNull: false,
        defaultValue: "draft"
      },
      ageBandId: { type: DataTypes.UUID, allowNull: false, field: "age_band_id" },
      createdBy: { type: DataTypes.UUID, allowNull: true, field: "created_by" },
      updatedBy: { type: DataTypes.UUID, allowNull: true, field: "updated_by" }
    },
    {
      sequelize,
      modelName: "Tutorial",
      tableName: "tutorials",
      indexes: [{ unique: true, fields: ["slug"] }, { fields: ["theme", "status"] }]
    }
  );
}
