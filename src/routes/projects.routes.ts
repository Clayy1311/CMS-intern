import { Router } from "express";
import { createProjects,  deleteProjects,  getAllProjects, updateProjects} from "../controllers/projects.controller";



const router = Router()

router.post("/projects/:id", createProjects)
router.get("/project/:id", getAllProjects )
router.patch("/organization/:organizationsId/project/:id", updateProjects)
router.delete("/organization/:organizationsId/project/:id", deleteProjects)
//ket : id ngambil dari field organizationsId dari tabel projects berelasi dengan tabel organizations
export default router;