import { asyncHandler } from "../utils/asyncHandler.js";
import { evaluateReflexAnswers, getUserBadges, getUserProgress, saveProgress } from "../services/game.service.js";

export const reflexSubmitController = asyncHandler(async (req, res) => {
  const data = await evaluateReflexAnswers(req.user.id, req.body.answers);
  res.json({ success: true, data });
});

export const genericProgressController = asyncHandler(async (req, res) => {
  const data = await saveProgress({ userId: req.user.id, ...req.body });
  res.json({ success: true, data });
});

export const progressListController = asyncHandler(async (req, res) => {
  const data = await getUserProgress(req.user.id);
  res.json({ success: true, data });
});

export const badgesListController = asyncHandler(async (req, res) => {
  const data = await getUserBadges(req.user.id);
  res.json({ success: true, data });
});
