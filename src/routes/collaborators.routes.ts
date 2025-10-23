import { Router } from "express";
import { addCollaborators, editCollaborators, findAllCollaborators } from "../controllers/collaborators.controller";



const router = Router()

router.post("/collaborators/:projectId", addCollaborators)
router.get("/collaborators/:projectId", findAllCollaborators)
router.patch("/collaborators/:projectId/:collaboratorsId/:userId", editCollaborators)
export default router;