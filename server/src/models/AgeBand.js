import { DataTypes, Model } from "sequelize";

export class AgeBand extends Model {}

export function initAgeBand(sequelize) {
  AgeBand.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      code: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
      },
      label: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      minAge: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        field: "min_age"
      },
      maxAge: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        field: "max_age"
      },
      tone: {
        type: DataTypes.STRING(30),
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "AgeBand",
      tableName: "age_bands",
      indexes: [{ unique: true, fields: ["code"] }]
    }
  );
}
