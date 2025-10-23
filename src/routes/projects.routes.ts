import { Router } from "express";
import { createProjects,  getAllProjects, UpdateProjects} from "../controllers/projects.controller";



const router = Router()

router.post("/projects/:id", createProjects)
router.get("/project/:id", getAllProjects )
router.patch("/organization/:organizationsId/project/:id", UpdateProjects)

//ket : id ngambil dari field organizationsId dari tabel projects berelasi dengan tabel organizations
export default router;