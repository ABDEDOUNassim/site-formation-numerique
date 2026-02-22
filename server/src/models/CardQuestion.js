import { DataTypes, Model } from "sequelize";

export class CardQuestion extends Model {}

export function initCardQuestion(sequelize) {
  CardQuestion.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      theme: { type: DataTypes.STRING(40), allowNull: false },
      situationText: { type: DataTypes.TEXT, allowNull: false, field: "situation_text" },
      optionA: { type: DataTypes.TEXT, allowNull: false, field: "option_a" },
      optionB: { type: DataTypes.TEXT, allowNull: false, field: "option_b" },
      optionC: { type: DataTypes.TEXT, allowNull: false, field: "option_c" },
      correctOption: {
        type: DataTypes.ENUM("A", "B", "C"),
        allowNull: false,
        field: "correct_option"
      },
      explanation: { type: DataTypes.TEXT, allowNull: false },
      difficulty: { type: DataTypes.SMALLINT, allowNull: false, defaultValue: 1 },
      isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, field: "is_active" },
      ageBandId: { type: DataTypes.UUID, allowNull: false, field: "age_band_id" },
      createdBy: { type: DataTypes.UUID, allowNull: true, field: "created_by" },
      updatedBy: { type: DataTypes.UUID, allowNull: true, field: "updated_by" }
    },
    {
      sequelize,
      modelName: "CardQuestion",
      tableName: "card_questions",
      indexes: [{ fields: ["theme", "age_band_id"] }]
    }
  );
}
