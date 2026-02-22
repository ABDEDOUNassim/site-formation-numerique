import { Router } from "express";
import {
  adminCardsController,
  adminListContactsController,
  adminStoriesController,
  adminTutorialsController
} from "../controllers/admin.controller.js";
import { authJwt, requireRole } from "../middlewares/authJwt.js";

export const adminRouter = Router();

adminRouter.use(authJwt, requireRole("admin"));
adminRouter.get("/contact-requests", adminListContactsController);
adminRouter.get("/stories", adminStoriesController);
adminRouter.get("/tutorials", adminTutorialsController);
adminRouter.get("/cards", adminCardsController);
