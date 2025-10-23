import { Router } from "express";
import { createProjects } from "../controllers/projects.controller";



const router = Router()

router.post("/projects/:id", createProjects)

export default router;