import { Router } from "express";
import { register, login,  logout, 
    verifyemail, requestResetPassword, resetpassword,refreshToken } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { google } from "../controllers/google.controller"


const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout",  authMiddleware, logout);
router.get("/verifyemail", verifyemail);
router.post("/requestreset", requestResetPassword);
router.post("/resetpassword", resetpassword);
router.post("/refresh-token", refreshToken);
router.post("/google", google);


export default router;