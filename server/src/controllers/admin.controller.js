import { asyncHandler } from "../utils/asyncHandler.js";
import { ContactRequest, Story, Tutorial, CardQuestion } from "../models/index.js";

export const adminListContactsController = asyncHandler(async (_req, res) => {
  const data = await ContactRequest.findAll({ order: [["createdAt", "DESC"]] });
  res.json({ success: true, data });
});

export const adminStoriesController = asyncHandler(async (_req, res) => {
  const data = await Story.findAll({ order: [["createdAt", "DESC"]] });
  res.json({ success: true, data });
});

export const adminTutorialsController = asyncHandler(async (_req, res) => {
  const data = await Tutorial.findAll({ order: [["createdAt", "DESC"]] });
  res.json({ success: true, data });
});

export const adminCardsController = asyncHandler(async (_req, res) => {
  const data = await CardQuestion.findAll({ order: [["createdAt", "DESC"]] });
  res.json({ success: true, data });
});
