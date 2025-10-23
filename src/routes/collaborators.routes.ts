import { Router } from "express";
import { addCollaborators, deleteCollaborators, editCollaborators, findAllCollaborators } from "../controllers/collaborators.controller";



const router = Router()

router.post("/collaborators/:projectId", addCollaborators)
router.get("/collaborators/:projectId", findAllCollaborators)
router.patch("/collaborators/:projectId/:collaboratorsId/:userId", editCollaborators)
router.delete("/collaborators/:projectId/:collaboratorsId/:userId/delete", deleteCollaborators)
export default router;