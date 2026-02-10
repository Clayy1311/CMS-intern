import { Router } from "express";
import { postContentModel,indexContentModel, infoContentModel, updateContentModel, deleteContentModel } from "../../../controllers/contentMangement/projectsOrganizations/contentModels.controller";
import { orgProjectAccess } from "../../../middlewares/organizationalProjectAccess";
import { roleGuard } from "../../../middlewares/roleGuard.middleware";
const router = Router();


router.post("/projects/:projectId/content-models", orgProjectAccess,roleGuard(["editor", "org_owner", "writer"]), postContentModel)
router.get("/projects/:projectId/content-models",orgProjectAccess,roleGuard(["viewer", "editor", "writer", "org_owner", "approver", "reviewer"]),  indexContentModel)
router.get("/projects/:projectId/content-models/:contentModelId",orgProjectAccess,roleGuard(["viewer", "editor", "writer", "org_owner", "approver", "reviewer"]), infoContentModel)
router.patch("/projects/:projectId/content-models/:contentModelId", orgProjectAccess,roleGuard(["editor", "org_owner", "writer"]), updateContentModel)
router.delete("/projects/:projectId/content-models/:contentModelId", orgProjectAccess, roleGuard(["org_owner"]),deleteContentModel)

export default router;