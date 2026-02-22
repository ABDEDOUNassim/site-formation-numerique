import bcrypt from "bcryptjs";

export async function hashPassword(plainPassword) {
  return bcrypt.hash(plainPassword, 12);
}

export async function comparePassword(plainPassword, hash) {
  return bcrypt.compare(plainPassword, hash);
}
