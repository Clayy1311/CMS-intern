import { Router } from "express";
import { home } from "../controllers/home.controller"
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/home", authMiddleware, home)

export default router;