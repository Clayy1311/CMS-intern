import { Router } from "express";
import { postModel,indexContentModel,updateContentModel, deleteContentModel, infoContentModel } from "../../../controllers/contentMangement/personalProjects/contentModels.controller";
import { personalProjectAccess } from "../../../middlewares/personalProjectAccess";
const router = Router();



router.post("/personal-projects/:personalProjectId/content-models", personalProjectAccess, postModel)
router.get("/personal-projects/:personalProjectId/content-models", personalProjectAccess, indexContentModel)
router.patch("/personal-projects/:personalProjectId/content-models/:contentModelId", personalProjectAccess, updateContentModel)
router.delete("/personal-projects/:personalProjectId/content-models/:contentModelId", personalProjectAccess, deleteContentModel)
router.get("/personal-projects/:personalProjectId/content-models/:contentModelId", personalProjectAccess, infoContentModel)

export default router;