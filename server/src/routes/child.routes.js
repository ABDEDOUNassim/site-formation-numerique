import { Router } from "express";
import {
  createPrivateStoryController,
  deletePrivateStoryController,
  listPrivateStoriesController,
  updatePrivateStoryController
} from "../controllers/child.controller.js";
import { authJwt, requireRole } from "../middlewares/authJwt.js";
import { validate } from "../middlewares/validate.js";
import {
  childStoryCreateSchema,
  childStoryDeleteSchema,
  childStoryUpdateSchema
} from "../validators/childValidators.js";

export const childRouter = Router();

childRouter.use(authJwt, requireRole("child"));

childRouter.get("/stories", listPrivateStoriesController);
childRouter.post("/stories", validate(childStoryCreateSchema), createPrivateStoryController);
childRouter.patch("/stories/:id", validate(childStoryUpdateSchema), updatePrivateStoryController);
childRouter.delete("/stories/:id", validate(childStoryDeleteSchema), deletePrivateStoryController);
