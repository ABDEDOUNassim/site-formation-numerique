import { asyncHandler } from "../utils/asyncHandler.js";
import { getProfile, login, registerChild } from "../services/auth.service.js";

export const registerChildController = asyncHandler(async (req, res) => {
  const data = await registerChild(req.body);
  res.status(201).json({ success: true, data });
});

export const loginController = asyncHandler(async (req, res) => {
  const data = await login(req.body);
  res.json({ success: true, data });
});

export const meController = asyncHandler(async (req, res) => {
  const profile = await getProfile(req.user.id);
  res.json({ success: true, data: profile });
});
