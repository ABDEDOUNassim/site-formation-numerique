import { Router } from "express";
import {
  ageBandsController,
  cardQuestionsController,
  storyDetailController,
  storiesController,
  tutorialDetailController,
  tutorialsController
} from "../controllers/public.controller.js";

export const publicRouter = Router();

publicRouter.get("/age-bands", ageBandsController);
publicRouter.get("/stories", storiesController);
publicRouter.get("/stories/:id", storyDetailController);
publicRouter.get("/tutorials", tutorialsController);
publicRouter.get("/tutorials/:id", tutorialDetailController);
publicRouter.get("/cards", cardQuestionsController);
