import { Op } from "sequelize";
import { AgeBand, User } from "../models/index.js";
import { ApiError } from "../utils/ApiError.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import { signAccessToken } from "../utils/jwt.js";

function sanitizeUser(user) {
  return {
    id: user.id,
    role: user.role,
    pseudo: user.pseudo,
    email: user.email,
    ageBandId: user.ageBandId
  };
}

export async function registerChild({ pseudo, password, ageBandId, birthYear }) {
  const ageBand = await AgeBand.findByPk(ageBandId);
  if (!ageBand) throw new ApiError(400, "Tranche d'âge inconnue");

  const exists = await User.findOne({ where: { pseudo } });
  if (exists) throw new ApiError(409, "Pseudo déjà utilisé");

  const user = await User.create({
    role: "child",
    pseudo,
    passwordHash: await hashPassword(password),
    ageBandId,
    birthYear
  });

  const token = signAccessToken({ id: user.id, role: user.role });
  return { token, user: sanitizeUser(user) };
}

export async function login({ identifier, password }) {
  const user = await User.findOne({
    where: {
      [Op.or]: [{ pseudo: identifier }, { email: identifier }]
    }
  });

  if (!user) throw new ApiError(401, "Identifiants invalides");

  const ok = await comparePassword(password, user.passwordHash);
  if (!ok) throw new ApiError(401, "Identifiants invalides");

  user.lastLoginAt = new Date();
  await user.save();

  const token = signAccessToken({ id: user.id, role: user.role });
  return { token, user: sanitizeUser(user) };
}

export async function getProfile(userId) {
  const user = await User.findByPk(userId, {
    include: [{ model: AgeBand, attributes: ["id", "code", "label"] }],
    attributes: ["id", "role", "pseudo", "email", "createdAt", "ageBandId"]
  });
  if (!user) throw new ApiError(404, "Utilisateur introuvable");

  return user;
}
