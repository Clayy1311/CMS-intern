import { Router } from "express";
import { home } from "./home.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/home", authMiddleware, home)

export default router;