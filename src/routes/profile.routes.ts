import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

import { editProfile } from "../controllers/profile.controller";



router.patch("/:userId/edit-Profile", authMiddleware, editProfile);
// router.get("/profile", authMiddleware, profile );
export default router;
