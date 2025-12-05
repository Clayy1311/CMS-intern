import { Router } from "express";
import { postContentModel,indexContentModel, infoContentModel } from "../../../controllers/contentMangement/projectsOrganizations/contentModels.controller";
import { orgProjectAccess } from "../../../middlewares/organizationalProjectAccess";
const router = Router();


router.post("/projects/:projectId/content-models", orgProjectAccess, postContentModel)
router.get("/projects/:projectId/content-models",orgProjectAccess, indexContentModel)
router.get("/projects/:projectId/content-models/:contentModelId",orgProjectAccess, infoContentModel)


export default router;