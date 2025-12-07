import  Router from "express";
import { indexContentEntry, postContentEntry, updateContentEntry,deleteContentEntry } from "../../../controllers/contentMangement/projectsOrganizations/contentEntry.controller";
import { orgProjectAccess } from "../../../middlewares/organizationalProjectAccess";

const router = Router()


router.post("/projects/:projectId/content-entry/content-models/:contentModelId", orgProjectAccess, postContentEntry)
router.patch("/projects/:projectId/content-entry/:contentEntryId", orgProjectAccess, updateContentEntry)
router.get("/projects/:projectId/content-entry/:contentEntryId", orgProjectAccess, indexContentEntry)
router.delete("/projects/:projectId/content-entry/:contentEntryId", orgProjectAccess, deleteContentEntry)

export default router;