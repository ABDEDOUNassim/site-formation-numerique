import { DataTypes, Model } from "sequelize";

export class ContactRequest extends Model {}

export function initContactRequest(sequelize) {
  ContactRequest.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      organizationName: { type: DataTypes.STRING(140), allowNull: false, field: "organization_name" },
      organizationType: { type: DataTypes.STRING(50), allowNull: false, field: "organization_type" },
      contactName: { type: DataTypes.STRING(120), allowNull: false, field: "contact_name" },
      contactEmail: { type: DataTypes.STRING(120), allowNull: false, field: "contact_email" },
      contactPhone: { type: DataTypes.STRING(30), allowNull: true, field: "contact_phone" },
      message: { type: DataTypes.TEXT, allowNull: false },
      expectedParticipants: { type: DataTypes.INTEGER, allowNull: true, field: "expected_participants" },
      preferredDays: { type: DataTypes.STRING(120), allowNull: true, field: "preferred_days" },
      status: {
        type: DataTypes.ENUM("new", "in_review", "answered", "closed"),
        allowNull: false,
        defaultValue: "new"
      },
      handledBy: { type: DataTypes.UUID, allowNull: true, field: "handled_by" },
      handledAt: { type: DataTypes.DATE, allowNull: true, field: "handled_at" }
    },
    {
      sequelize,
      modelName: "ContactRequest",
      tableName: "contact_requests",
      indexes: [{ fields: ["status"] }]
    }
  );
}
