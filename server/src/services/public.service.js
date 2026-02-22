import { AgeBand, CardQuestion, Story, Tutorial } from "../models/index.js";

export async function listAgeBands() {
  return AgeBand.findAll({ order: [["min_age", "ASC"]] });
}

export async function listStories({ ageBandId, theme }) {
  const where = { status: "published" };
  if (ageBandId) where.ageBandId = ageBandId;
  if (theme) where.theme = theme;

  return Story.findAll({
    where,
    order: [["createdAt", "DESC"]]
  });
}

export async function getStoryById(id) {
  return Story.findOne({ where: { id, status: "published" } });
}

export async function listTutorials({ ageBandId, theme }) {
  const where = { status: "published" };
  if (ageBandId) where.ageBandId = ageBandId;
  if (theme) where.theme = theme;

  return Tutorial.findAll({ where, order: [["createdAt", "DESC"]] });
}

export async function getTutorialById(id) {
  return Tutorial.findOne({ where: { id, status: "published" } });
}

export async function listCardQuestions(ageBandId, limit = 10) {
  return CardQuestion.findAll({
    where: {
      ageBandId,
      isActive: true
    },
    limit: Number(limit),
    order: [["difficulty", "ASC"]],
    attributes: ["id", "theme", "situationText", "optionA", "optionB", "optionC"]
  });
}
