import { Router } from "express";
import { publishContent, unpublishContent, reviewContent, scheduleContent } from "../../../controllers/contentMangement/projectsOrganizations/publishingWorkflow.controller";
import { personalProjectAccess } from "../../../middlewares/personalProjectAccess";
const router = Router();

router.post("/personal-projects/:personalProjectId/:contentEntryId/publish-content", personalProjectAccess, publishContent)
router.post("/personal-projects/:personalProjectId/:contentEntryId/unpublish-content", personalProjectAccess, unpublishContent)
router.post("/personal-projects/:personalProjectId/:contentEntryId/review", personalProjectAccess, reviewContent)
router.post("/personal-projects/:personalProjectId/:contentEntryId/scheduleContent", personalProjectAccess, scheduleContent)


export default router;