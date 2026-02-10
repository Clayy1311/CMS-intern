import { Router } from "express";
import { publishContent, unpublishContent, reviewContent, scheduleContent } from "../../../controllers/contentMangement/projectsOrganizations/publishingWorkflow.controller";
import { orgProjectAccess } from "../../../middlewares/organizationalProjectAccess";
import { roleGuard } from "../../../middlewares/roleGuard.middleware";
const router = Router();

router.post("/projects/:projectId/:contentEntryId/publish-content",  orgProjectAccess, roleGuard(["org_owner"]), publishContent)
router.post("/projects/:projectId/:contentEntryId/unpublish-content", orgProjectAccess, roleGuard(["org_owner"]), unpublishContent)
router.post("/projects/:projectId/:contentEntryId/review", orgProjectAccess, roleGuard(["reviewer"]), reviewContent)
router.post("/projects/:projectId/:contentEntryId/scheduleContent", orgProjectAccess, roleGuard(["org_owner"]), scheduleContent)


export default router;