import { DataTypes, Model } from "sequelize";

export class Story extends Model {}

export function initStory(sequelize) {
  Story.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      title: { type: DataTypes.STRING(140), allowNull: false },
      slug: { type: DataTypes.STRING(160), allowNull: false, unique: true },
      theme: { type: DataTypes.STRING(40), allowNull: false },
      summary: { type: DataTypes.TEXT, allowNull: false },
      content: { type: DataTypes.TEXT, allowNull: false },
      whatHappens: { type: DataTypes.TEXT, allowNull: false, field: "what_happens" },
      howToProtect: { type: DataTypes.TEXT, allowNull: false, field: "how_to_protect" },
      whoToTell: { type: DataTypes.TEXT, allowNull: false, field: "who_to_tell" },
      status: {
        type: DataTypes.ENUM("draft", "published", "archived"),
        allowNull: false,
        defaultValue: "draft"
      },
      publishedAt: { type: DataTypes.DATE, allowNull: true, field: "published_at" },
      ageBandId: { type: DataTypes.UUID, allowNull: false, field: "age_band_id" },
      createdBy: { type: DataTypes.UUID, allowNull: true, field: "created_by" },
      updatedBy: { type: DataTypes.UUID, allowNull: true, field: "updated_by" }
    },
    {
      sequelize,
      modelName: "Story",
      tableName: "stories",
      indexes: [
        { unique: true, fields: ["slug"] },
        { fields: ["theme", "status"] }
      ]
    }
  );
}
