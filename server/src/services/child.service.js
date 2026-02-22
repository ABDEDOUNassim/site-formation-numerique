import { ChildStory } from "../models/index.js";
import { ApiError } from "../utils/ApiError.js";

export async function listPrivateStories(userId) {
  return ChildStory.findAll({
    where: { userId, isDeleted: false },
    order: [["updatedAt", "DESC"]]
  });
}

export async function createPrivateStory(userId, data) {
  return ChildStory.create({ ...data, userId, visibility: "private" });
}

export async function updatePrivateStory(userId, storyId, data) {
  const story = await ChildStory.findOne({ where: { id: storyId, userId, isDeleted: false } });
  if (!story) throw new ApiError(404, "Histoire introuvable");

  Object.assign(story, data);
  await story.save();
  return story;
}

export async function deletePrivateStory(userId, storyId) {
  const story = await ChildStory.findOne({ where: { id: storyId, userId, isDeleted: false } });
  if (!story) throw new ApiError(404, "Histoire introuvable");

  story.isDeleted = true;
  await story.save();
}
