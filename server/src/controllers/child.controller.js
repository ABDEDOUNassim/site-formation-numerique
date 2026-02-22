import { asyncHandler } from "../utils/asyncHandler.js";
import {
  createPrivateStory,
  deletePrivateStory,
  listPrivateStories,
  updatePrivateStory
} from "../services/child.service.js";

export const listPrivateStoriesController = asyncHandler(async (req, res) => {
  const data = await listPrivateStories(req.user.id);
  res.json({ success: true, data });
});

export const createPrivateStoryController = asyncHandler(async (req, res) => {
  const data = await createPrivateStory(req.user.id, req.body);
  res.status(201).json({ success: true, data });
});

export const updatePrivateStoryController = asyncHandler(async (req, res) => {
  const data = await updatePrivateStory(req.user.id, req.params.id, req.body);
  res.json({ success: true, data });
});

export const deletePrivateStoryController = asyncHandler(async (req, res) => {
  await deletePrivateStory(req.user.id, req.params.id);
  res.json({ success: true, data: { deleted: true } });
});
