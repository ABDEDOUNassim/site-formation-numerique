import { asyncHandler } from "../utils/asyncHandler.js";
import {
  getStoryById,
  getTutorialById,
  listAgeBands,
  listCardQuestions,
  listStories,
  listTutorials
} from "../services/public.service.js";

export const ageBandsController = asyncHandler(async (_req, res) => {
  const data = await listAgeBands();
  res.json({ success: true, data });
});

export const storiesController = asyncHandler(async (req, res) => {
  const data = await listStories(req.query);
  res.json({ success: true, data });
});

export const storyDetailController = asyncHandler(async (req, res) => {
  const data = await getStoryById(req.params.id);
  if (!data) return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Histoire introuvable" } });
  res.json({ success: true, data });
});

export const tutorialsController = asyncHandler(async (req, res) => {
  const data = await listTutorials(req.query);
  res.json({ success: true, data });
});

export const tutorialDetailController = asyncHandler(async (req, res) => {
  const data = await getTutorialById(req.params.id);
  if (!data) return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Tutoriel introuvable" } });
  res.json({ success: true, data });
});

export const cardQuestionsController = asyncHandler(async (req, res) => {
  const { ageBandId, limit } = req.query;
  const data = await listCardQuestions(ageBandId, limit || 10);
  res.json({ success: true, data });
});
