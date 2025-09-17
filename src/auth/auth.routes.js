import { Router } from "express";
import { register, login, profile, logout, verifyemail } from "./auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();



router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, profile );
router.post("/logout",  logout);
router.get("/verifyemail", verifyemail);



export default router;