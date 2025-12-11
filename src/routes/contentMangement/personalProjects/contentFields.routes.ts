import { postContentField, updateContentField, deleteContentField } from "../../../controllers/contentMangement/personalProjects/contentFields.controller";
import { Router } from "express";
import { personalProjectAccess } from "../../../middlewares/personalProjectAccess";

const router = Router();

router.post("/personal-projects/:personalProjectId/content-models/:contentModelId/fields", personalProjectAccess, postContentField)
// /projects/:projectId/content-fields/:fieldId

router.patch("/personal-projects/:personalProjectId/content-fields/:contentFieldId", personalProjectAccess, updateContentField)
router.delete("/personal-projects/:personalProjectId/content-fields/:contentFieldId", personalProjectAccess, deleteContentField)

export default router;
