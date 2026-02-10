import { Router } from "express";
import { postContentField, updateContentField,deleteContentField } from "../../../controllers/contentMangement/projectsOrganizations/contentField.controller";
import { orgProjectAccess } from "../../../middlewares/organizationalProjectAccess";
import { roleGuard } from "../../../middlewares/roleGuard.middleware";
const router = Router()


router.post("/projects/:projectId/content-models/:contentModelId/fields", orgProjectAccess, roleGuard(["editor","org_owner", "writer"]), postContentField)
// /projects/:projectId/content-fields/:fieldId

router.patch("/projects/:projectId/content-fields/:contentFieldId", orgProjectAccess,roleGuard(["editor", "org_owner", "writer"]), updateContentField)
router.delete("/projects/:projectId/content-fields/:contentFieldId", orgProjectAccess,roleGuard(["org_owner"]), deleteContentField)

export default router;
