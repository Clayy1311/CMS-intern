import { Router } from "express";
import { addCollaborators, deleteCollaborators, editCollaborators, findAllCollaborators, getUser } from "../controllers/collaborators.controller";
import { roleGuard } from "../middlewares/roleGuard.middleware";
import { orgProjectAccess } from "../middlewares/organizationalProjectAccess";

const router = Router()

router.post("/collaborators/:projectId",  orgProjectAccess, roleGuard(["org_owner"]), addCollaborators)
router.get("/collaborators/:projectId/users", getUser)
router.get("/collaborators/:projectId", orgProjectAccess,roleGuard(["viewer", "editor", "writer", "org_owner", "approver", "reviewer"]), findAllCollaborators)
router.patch("/collaborators/:projectId/:collaboratorsId/:userId", orgProjectAccess,roleGuard(["org_owner"]), editCollaborators)
router.delete("/collaborators/:projectId/:collaboratorsId/:userId/delete", orgProjectAccess, roleGuard(["org_owner"]), deleteCollaborators)
export default router;