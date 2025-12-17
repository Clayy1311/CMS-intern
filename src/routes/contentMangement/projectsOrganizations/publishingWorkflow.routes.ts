import { Router } from "express";
import { publishContent, unpublishContent, reviewContent, scheduleContent } from "../../../controllers/contentMangement/projectsOrganizations/publishingWorkflow.controller";
import { orgProjectAccess } from "../../../middlewares/organizationalProjectAccess";
const router = Router();

router.post("/projects/:projectId/:contentEntryId/publish-content", orgProjectAccess, publishContent)
router.post("/projects/:projectId/:contentEntryId/unpublish-content", orgProjectAccess, unpublishContent)
router.post("/projects/:projectId/:contentEntryId/review", orgProjectAccess, reviewContent)
router.post("/projects/:projectId/:contentEntryId/scheduleContent", orgProjectAccess, scheduleContent)


export default router;