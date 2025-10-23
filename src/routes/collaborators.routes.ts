import { Router } from "express";
import { addCollaborators, editCollaborators } from "../controllers/collaborators.controller";



const router = Router()

router.post("/collaborators/:projectId", addCollaborators)
router.patch("/collaborators/:projectId/:collaboratorsId/:userId", editCollaborators)
export default router;