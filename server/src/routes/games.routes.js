import { Router } from "express";
import {
  badgesListController,
  genericProgressController,
  progressListController,
  reflexSubmitController
} from "../controllers/games.controller.js";
import { authJwt, requireRole } from "../middlewares/authJwt.js";
import { validate } from "../middlewares/validate.js";
import { progressSchema, reflexSubmitSchema } from "../validators/gameValidators.js";

export const gamesRouter = Router();

gamesRouter.use(authJwt, requireRole("child"));
gamesRouter.post("/reflex/submit", validate(reflexSubmitSchema), reflexSubmitController);
gamesRouter.post("/progress", validate(progressSchema), genericProgressController);
gamesRouter.get("/progress", progressListController);
gamesRouter.get("/badges", badgesListController);
