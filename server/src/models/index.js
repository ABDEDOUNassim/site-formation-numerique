import { sequelize } from "../config/db.js";
import { AgeBand, initAgeBand } from "./AgeBand.js";
import { User, initUser } from "./User.js";
import { Story, initStory } from "./Story.js";
import { ChildStory, initChildStory } from "./ChildStory.js";
import { Tutorial, initTutorial } from "./Tutorial.js";
import { CardQuestion, initCardQuestion } from "./CardQuestion.js";
import { GameProgress, initGameProgress } from "./GameProgress.js";
import { Badge, initBadge } from "./Badge.js";
import { UserBadge, initUserBadge } from "./UserBadge.js";
import { ContactRequest, initContactRequest } from "./ContactRequest.js";

initAgeBand(sequelize);
initUser(sequelize);
initStory(sequelize);
initChildStory(sequelize);
initTutorial(sequelize);
initCardQuestion(sequelize);
initGameProgress(sequelize);
initBadge(sequelize);
initUserBadge(sequelize);
initContactRequest(sequelize);

AgeBand.hasMany(User, { foreignKey: "ageBandId" });
User.belongsTo(AgeBand, { foreignKey: "ageBandId" });

AgeBand.hasMany(Story, { foreignKey: "ageBandId" });
Story.belongsTo(AgeBand, { foreignKey: "ageBandId" });

AgeBand.hasMany(Tutorial, { foreignKey: "ageBandId" });
Tutorial.belongsTo(AgeBand, { foreignKey: "ageBandId" });

AgeBand.hasMany(CardQuestion, { foreignKey: "ageBandId" });
CardQuestion.belongsTo(AgeBand, { foreignKey: "ageBandId" });

User.hasMany(ChildStory, { foreignKey: "userId" });
ChildStory.belongsTo(User, { foreignKey: "userId" });

User.hasMany(GameProgress, { foreignKey: "userId" });
GameProgress.belongsTo(User, { foreignKey: "userId" });

User.belongsToMany(Badge, { through: UserBadge, foreignKey: "userId", otherKey: "badgeId" });
Badge.belongsToMany(User, { through: UserBadge, foreignKey: "badgeId", otherKey: "userId" });
UserBadge.belongsTo(User, { foreignKey: "userId" });
UserBadge.belongsTo(Badge, { foreignKey: "badgeId" });

User.hasMany(ContactRequest, { foreignKey: "handledBy", as: "handledContacts" });
ContactRequest.belongsTo(User, { foreignKey: "handledBy", as: "handler" });

export {
  sequelize,
  AgeBand,
  User,
  Story,
  ChildStory,
  Tutorial,
  CardQuestion,
  GameProgress,
  Badge,
  UserBadge,
  ContactRequest
};
