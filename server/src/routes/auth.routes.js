import { Router } from "express";
import { loginController, meController, registerChildController } from "../controllers/auth.controller.js";
import { authLimiter } from "../middlewares/rateLimiters.js";
import { validate } from "../middlewares/validate.js";
import { loginSchema, registerChildSchema } from "../validators/authValidators.js";
import { authJwt } from "../middlewares/authJwt.js";

export const authRouter = Router();

authRouter.post("/register-child", authLimiter, validate(registerChildSchema), registerChildController);
authRouter.post("/login", authLimiter, validate(loginSchema), loginController);
authRouter.get("/me", authJwt, meController);
