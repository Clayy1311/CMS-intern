import { Router } from "express";
import { postContentField, updateContentField,deleteContentField } from "../../../controllers/contentMangement/projectsOrganizations/contentField.controller";
import { orgProjectAccess } from "../../../middlewares/organizationalProjectAccess";

const router = Router()


router.post("/projects/:projectId/content-models/:contentModelId/fields", orgProjectAccess, postContentField)
// /projects/:projectId/content-fields/:fieldId

router.patch("/projects/:projectId/content-fields/:contentFieldId", orgProjectAccess, updateContentField)
router.delete("/projects/:projectId/content-fields/:contentFieldId", orgProjectAccess, deleteContentField)

export default router;
