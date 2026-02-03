import  Router from "express";
import {  postContentEntry, updateContentEntry, getAllContentEntry, handleGetContentEntryById, deleteContentEntry } from "../../../controllers/contentMangement/projectsOrganizations/contentEntry.controller";
import { orgProjectAccess } from "../../../middlewares/organizationalProjectAccess";

const router = Router()


router.post("/projects/:projectId/content-entry/content-models/:contentModelId", orgProjectAccess, postContentEntry)
router.patch("/projects/:projectId/content-entry/:contentEntryId", orgProjectAccess, updateContentEntry)
router.get("/projects/:projectId/content-entry/:contentEntryId", orgProjectAccess, handleGetContentEntryById)
router.get("/projects/:projectId/content-entry/content-models/:contentModelId", orgProjectAccess, getAllContentEntry)
router.delete("/projects/:projectId/content-entry/:contentEntryId", orgProjectAccess, deleteContentEntry)

export default router;