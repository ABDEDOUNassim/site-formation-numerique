import { Router } from "express";
import { adminRouter } from "./admin.routes.js";
import { authRouter } from "./auth.routes.js";
import { childRouter } from "./child.routes.js";
import { gamesRouter } from "./games.routes.js";
import { publicRouter } from "./public.routes.js";
import { structureRouter } from "./structure.routes.js";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/public", publicRouter);
apiRouter.use("/child", childRouter);
apiRouter.use("/games", gamesRouter);
apiRouter.use("/structure", structureRouter);
apiRouter.use("/admin", adminRouter);
