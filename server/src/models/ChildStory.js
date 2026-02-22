import { DataTypes, Model } from "sequelize";

export class ChildStory extends Model {}

export function initChildStory(sequelize) {
  ChildStory.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      title: { type: DataTypes.STRING(140), allowNull: false },
      content: { type: DataTypes.TEXT, allowNull: false },
      visibility: {
        type: DataTypes.ENUM("private"),
        allowNull: false,
        defaultValue: "private"
      },
      userId: { type: DataTypes.UUID, allowNull: false, field: "user_id" },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "is_deleted"
      }
    },
    {
      sequelize,
      modelName: "ChildStory",
      tableName: "child_stories",
      indexes: [{ fields: ["user_id", "updated_at"] }]
    }
  );
}
