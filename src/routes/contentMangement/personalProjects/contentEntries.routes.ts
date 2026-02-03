import { postContentEntry, updateContentEntry, deleteContentEntry, handleGetContentEntryById, getAllContentEntry } from "../../../controllers/contentMangement/personalProjects/contentEntry.controller";
import { Router } from "express";
import { personalProjectAccess } from "../../../middlewares/personalProjectAccess";


const router =Router()

router.post("/personal-projects/:personalProjectId/content-entry/content-models/:contentModelId", personalProjectAccess, postContentEntry)
router.patch("/personal-projects/:personalProjectId/content-entry/:contentEntryId", personalProjectAccess, updateContentEntry)
router.get("/personal-projects/:personalProjectId/content-entry/:contentEntryId", personalProjectAccess, handleGetContentEntryById)
router.get("/personal-projects/:personalProjectId/content-entry/content-models/:contentModelId", personalProjectAccess, getAllContentEntry)
router.delete("/personal-projects/:personalProjectId/content-entry/:contentEntryId", personalProjectAccess, deleteContentEntry)

export default router;