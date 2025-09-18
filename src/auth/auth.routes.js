import { Router } from "express";
import { register, login, profile, logout, 
    verifyemail, requestResetPassword, resetpassword } from "./auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { google } from "./google.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, profile );
router.post("/logout",  logout);
router.get("/verifyemail", verifyemail);
router.post("/requestreset", requestResetPassword);
router.post("/resetpassword", resetpassword);
router.post("/google", google);

export default router;