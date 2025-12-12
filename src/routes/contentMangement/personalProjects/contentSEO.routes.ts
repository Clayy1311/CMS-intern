import { Router } from "express";
import { postOrPatchSEO, indexSEOContent } from "../../../controllers/contentMangement/personalProjects/contentSEO.controller";
import { personalProjectAccess } from "../../../middlewares/personalProjectAccess";

const router = Router();
router.get("/personal-projects/:personalProjectId/content-entry/:contentEntryId/content-SEO", personalProjectAccess, indexSEOContent)
router.post("/personal-projects/:personalProjectId/content-entry/:contentEntryId/content-SEO", personalProjectAccess, postOrPatchSEO)


export default router;