import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

import { editProfile } from "./profile.controller.js";



router.patch("/profile", authMiddleware, editProfile);

export default router;
