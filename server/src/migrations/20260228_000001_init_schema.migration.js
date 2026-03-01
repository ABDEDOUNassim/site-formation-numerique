import { DataTypes, Sequelize } from "sequelize";

const uuidPk = {
  type: DataTypes.UUID,
  allowNull: false,
  primaryKey: true,
  defaultValue: Sequelize.literal("gen_random_uuid()")
};

const timestamps = {
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
  }
};

export async function up({ context: queryInterface }) {
  await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');

  await queryInterface.createTable("age_bands", {
    id: uuidPk,
    code: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    label: { type: DataTypes.STRING(50), allowNull: false },
    min_age: { type: DataTypes.SMALLINT, allowNull: false },
    max_age: { type: DataTypes.SMALLINT, allowNull: false },
    tone: { type: DataTypes.STRING(30), allowNull: false },
    ...timestamps
  });

  await queryInterface.createTable("users", {
    id: uuidPk,
    role: { type: DataTypes.ENUM("child", "admin"), allowNull: false, defaultValue: "child" },
    pseudo: { type: DataTypes.STRING(40), allowNull: true, unique: true },
    email: { type: DataTypes.STRING(120), allowNull: true, unique: true },
    password_hash: { type: DataTypes.STRING(255), allowNull: false },
    age_band_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: "age_bands", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    },
    birth_year: { type: DataTypes.SMALLINT, allowNull: true },
    is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    last_login_at: { type: DataTypes.DATE, allowNull: true },
    accepted_terms_at: { type: DataTypes.DATE, allowNull: true },
    ...timestamps
  });

  await queryInterface.createTable("stories", {
    id: uuidPk,
    title: { type: DataTypes.STRING(140), allowNull: false },
    slug: { type: DataTypes.STRING(160), allowNull: false, unique: true },
    theme: { type: DataTypes.STRING(40), allowNull: false },
    summary: { type: DataTypes.TEXT, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    what_happens: { type: DataTypes.TEXT, allowNull: false },
    how_to_protect: { type: DataTypes.TEXT, allowNull: false },
    who_to_tell: { type: DataTypes.TEXT, allowNull: false },
    status: {
      type: DataTypes.ENUM("draft", "published", "archived"),
      allowNull: false,
      defaultValue: "draft"
    },
    published_at: { type: DataTypes.DATE, allowNull: true },
    age_band_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "age_bands", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT"
    },
    created_by: { type: DataTypes.UUID, allowNull: true },
    updated_by: { type: DataTypes.UUID, allowNull: true },
    ...timestamps
  });

  await queryInterface.createTable("tutorials", {
    id: uuidPk,
    title: { type: DataTypes.STRING(140), allowNull: false },
    slug: { type: DataTypes.STRING(160), allowNull: false, unique: true },
    theme: { type: DataTypes.STRING(40), allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    status: {
      type: DataTypes.ENUM("draft", "published", "archived"),
      allowNull: false,
      defaultValue: "draft"
    },
    age_band_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "age_bands", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT"
    },
    created_by: { type: DataTypes.UUID, allowNull: true },
    updated_by: { type: DataTypes.UUID, allowNull: true },
    ...timestamps
  });

  await queryInterface.createTable("card_questions", {
    id: uuidPk,
    theme: { type: DataTypes.STRING(40), allowNull: false },
    situation_text: { type: DataTypes.TEXT, allowNull: false },
    option_a: { type: DataTypes.TEXT, allowNull: false },
    option_b: { type: DataTypes.TEXT, allowNull: false },
    option_c: { type: DataTypes.TEXT, allowNull: false },
    correct_option: { type: DataTypes.ENUM("A", "B", "C"), allowNull: false },
    explanation: { type: DataTypes.TEXT, allowNull: false },
    difficulty: { type: DataTypes.SMALLINT, allowNull: false, defaultValue: 1 },
    is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    age_band_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "age_bands", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT"
    },
    created_by: { type: DataTypes.UUID, allowNull: true },
    updated_by: { type: DataTypes.UUID, allowNull: true },
    ...timestamps
  });

  await queryInterface.createTable("child_stories", {
    id: uuidPk,
    title: { type: DataTypes.STRING(140), allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    visibility: { type: DataTypes.ENUM("private"), allowNull: false, defaultValue: "private" },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "users", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    },
    is_deleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    ...timestamps
  });

  await queryInterface.createTable("game_progress", {
    id: uuidPk,
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "users", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    },
    game_key: { type: DataTypes.STRING(50), allowNull: false },
    attempts: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    best_score: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    last_score: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    level: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    progress_percent: { type: DataTypes.DECIMAL(5, 2), allowNull: false, defaultValue: 0 },
    last_played_at: { type: DataTypes.DATE, allowNull: true },
    meta: { type: DataTypes.JSONB, allowNull: false, defaultValue: {} },
    ...timestamps
  });

  await queryInterface.createTable("badges", {
    id: uuidPk,
    code: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    name: { type: DataTypes.STRING(80), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    icon_key: { type: DataTypes.STRING(120), allowNull: false },
    criteria: { type: DataTypes.JSONB, allowNull: false, defaultValue: {} },
    is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    ...timestamps
  });

  await queryInterface.createTable("user_badges", {
    id: uuidPk,
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "users", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    },
    badge_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "badges", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    },
    earned_at: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
    source_game_key: { type: DataTypes.STRING(50), allowNull: true },
    meta: { type: DataTypes.JSONB, allowNull: false, defaultValue: {} },
    ...timestamps
  });

  await queryInterface.createTable("contact_requests", {
    id: uuidPk,
    organization_name: { type: DataTypes.STRING(140), allowNull: false },
    organization_type: { type: DataTypes.STRING(50), allowNull: false },
    contact_name: { type: DataTypes.STRING(120), allowNull: false },
    contact_email: { type: DataTypes.STRING(120), allowNull: false },
    contact_phone: { type: DataTypes.STRING(30), allowNull: true },
    message: { type: DataTypes.TEXT, allowNull: false },
    expected_participants: { type: DataTypes.INTEGER, allowNull: true },
    preferred_days: { type: DataTypes.STRING(120), allowNull: true },
    status: {
      type: DataTypes.ENUM("new", "in_review", "answered", "closed"),
      allowNull: false,
      defaultValue: "new"
    },
    handled_by: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: "users", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    },
    handled_at: { type: DataTypes.DATE, allowNull: true },
    ...timestamps
  });

  await queryInterface.addIndex("users", ["role"], { name: "users_role_idx" });

  await queryInterface.addIndex("stories", ["theme", "status"], { name: "stories_theme_status_idx" });

  await queryInterface.addIndex("tutorials", ["theme", "status"], { name: "tutorials_theme_status_idx" });

  await queryInterface.addIndex("card_questions", ["theme", "age_band_id"], { name: "card_questions_theme_age_band_idx" });
  await queryInterface.addIndex("child_stories", ["user_id", "updated_at"], { name: "child_stories_user_updated_idx" });
  await queryInterface.addIndex("game_progress", ["user_id", "game_key"], { unique: true, name: "game_progress_user_game_unique" });
  await queryInterface.addIndex("user_badges", ["user_id", "badge_id"], { unique: true, name: "user_badges_user_badge_unique" });
  await queryInterface.addIndex("contact_requests", ["status"], { name: "contact_requests_status_idx" });
}

export async function down({ context: queryInterface }) {
  await queryInterface.dropTable("contact_requests");
  await queryInterface.dropTable("user_badges");
  await queryInterface.dropTable("badges");
  await queryInterface.dropTable("game_progress");
  await queryInterface.dropTable("child_stories");
  await queryInterface.dropTable("card_questions");
  await queryInterface.dropTable("tutorials");
  await queryInterface.dropTable("stories");
  await queryInterface.dropTable("users");
  await queryInterface.dropTable("age_bands");

  await queryInterface.sequelize.query("DROP TYPE IF EXISTS enum_contact_requests_status;");
  await queryInterface.sequelize.query("DROP TYPE IF EXISTS enum_child_stories_visibility;");
  await queryInterface.sequelize.query("DROP TYPE IF EXISTS enum_card_questions_correct_option;");
  await queryInterface.sequelize.query("DROP TYPE IF EXISTS enum_tutorials_status;");
  await queryInterface.sequelize.query("DROP TYPE IF EXISTS enum_stories_status;");
  await queryInterface.sequelize.query("DROP TYPE IF EXISTS enum_users_role;");
}
