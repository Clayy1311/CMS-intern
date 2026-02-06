import { Router } from "express";
import { createProjects,  deleteProjects,  detailInfoProject,  getAllProjects, updateProjects} from "../controllers/projects.controller";
import { orgProjectAccess } from "../middlewares/organizationalProjectAccess";
import { roleGuard } from "../middlewares/roleGuard.middleware";

const router = Router()

router.post("/projects/:id", createProjects)
router.get("/project/:projectId",orgProjectAccess, roleGuard(["viewer", "editor", "writer", "org_owner", "approver", "reviewer"]) , detailInfoProject )
router.get("/project/get-all/:organizationId",  getAllProjects)
router.patch("/organization/:organizationsId/project/:projectId", orgProjectAccess, roleGuard(["org_owner"]), updateProjects)
router.delete("/organization/:organizationsId/project/:projectId", orgProjectAccess, roleGuard(["org_owner"]), deleteProjects)
//ket : id ngambil dari field organizationsId dari tabel projects berelasi dengan tabel organizations
export default router;