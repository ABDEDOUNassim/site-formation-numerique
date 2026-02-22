import { DataTypes, Model } from "sequelize";

export class User extends Model {}

export function initUser(sequelize) {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      role: {
        type: DataTypes.ENUM("child", "admin"),
        allowNull: false,
        defaultValue: "child"
      },
      pseudo: {
        type: DataTypes.STRING(40),
        unique: true,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING(120),
        unique: true,
        allowNull: true
      },
      passwordHash: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "password_hash"
      },
      ageBandId: {
        type: DataTypes.UUID,
        allowNull: true,
        field: "age_band_id"
      },
      birthYear: {
        type: DataTypes.SMALLINT,
        allowNull: true,
        field: "birth_year"
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: "is_active"
      },
      lastLoginAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "last_login_at"
      },
      acceptedTermsAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "accepted_terms_at"
      }
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      indexes: [
        { unique: true, fields: ["pseudo"] },
        { unique: true, fields: ["email"] },
        { fields: ["role"] }
      ]
    }
  );
}
