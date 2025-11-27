import { Router } from "express";
import { addPersonalProjects, deletePersonalProject, detailPersonalProjects, findManyPersonalProjects, updatePersonalProjects } from "../controllers/personalProjects.controller";

const router = Router();


router.get("/personal-projects", findManyPersonalProjects);
router.post("/personal-project/create", addPersonalProjects);
router.get("/personal-project/:projectId", detailPersonalProjects);
router.patch("/personal-project/:projectId", updatePersonalProjects);
router.delete("/personal-project/:projectId", deletePersonalProject)
export default router;