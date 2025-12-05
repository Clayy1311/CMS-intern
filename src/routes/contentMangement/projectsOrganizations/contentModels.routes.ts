import { Router } from "express";
import { postContentModel,indexContentModel, infoContentModel, updateContentModel, deleteContentModel } from "../../../controllers/contentMangement/projectsOrganizations/contentModels.controller";
import { orgProjectAccess } from "../../../middlewares/organizationalProjectAccess";
const router = Router();


router.post("/projects/:projectId/content-models", orgProjectAccess, postContentModel)
router.get("/projects/:projectId/content-models",orgProjectAccess, indexContentModel)
router.get("/projects/:projectId/content-models/:contentModelId",orgProjectAccess, infoContentModel)
router.patch("/projects/:projectId/content-models/:contentModelId", orgProjectAccess, updateContentModel)
router.delete("/projects/:projectId/content-models/:contentModelId", orgProjectAccess, deleteContentModel)

export default router;