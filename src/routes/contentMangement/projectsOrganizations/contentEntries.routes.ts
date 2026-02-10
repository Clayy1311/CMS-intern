import  Router from "express";
import {  postContentEntry, updateContentEntry, getAllContentEntry, handleGetContentEntryById, deleteContentEntry } from "../../../controllers/contentMangement/projectsOrganizations/contentEntry.controller";
import { orgProjectAccess } from "../../../middlewares/organizationalProjectAccess";
import { roleGuard } from "../../../middlewares/roleGuard.middleware";

const router = Router()


router.post("/projects/:projectId/content-entry/content-models/:contentModelId",  orgProjectAccess,roleGuard(["editor", "org_owner"]), postContentEntry)
router.patch("/projects/:projectId/content-entry/:contentEntryId", orgProjectAccess,roleGuard(["editor", "org_owner"]), updateContentEntry)
router.get("/projects/:projectId/content-entry/:contentEntryId", orgProjectAccess,roleGuard(["viewer", "editor", "writer", "org_owner", "approver", "reviewer"]), handleGetContentEntryById)
router.get("/projects/:projectId/content-entry/content-models/:contentModelId", orgProjectAccess,roleGuard(["viewer", "editor", "writer", "org_owner", "approver", "reviewer"]), getAllContentEntry)
router.delete("/projects/:projectId/content-entry/:contentEntryId", orgProjectAccess, roleGuard(["org_owner"]), deleteContentEntry)

export default router;