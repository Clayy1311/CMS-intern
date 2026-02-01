import { getDashboardData } from "../controllers/dashboard.controller";
import { Router } from "express";


const router = Router();


router.get("/dashboard/data", getDashboardData)

export default router;