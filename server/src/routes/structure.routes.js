import { Router } from "express";
import { createContactController } from "../controllers/structure.controller.js";
import { contactLimiter } from "../middlewares/rateLimiters.js";
import { validate } from "../middlewares/validate.js";
import { contactSchema } from "../validators/structureValidators.js";

export const structureRouter = Router();

structureRouter.post("/contact-requests", contactLimiter, validate(contactSchema), createContactController);
