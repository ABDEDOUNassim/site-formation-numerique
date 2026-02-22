import { asyncHandler } from "../utils/asyncHandler.js";
import { createContactRequest } from "../services/structure.service.js";

export const createContactController = asyncHandler(async (req, res) => {
  const data = await createContactRequest(req.body);
  res.status(201).json({ success: true, data });
});
