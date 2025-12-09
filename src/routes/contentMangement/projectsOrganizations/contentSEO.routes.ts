import { Router } from "express";
import { upsertSEO, getSEOContent } from "../../../controllers/contentMangement/projectsOrganizations/contentSEO.controller";

const router = Router();
router.get("/projects/:projectId/content-entry/:contentEntryId/content-SEO", getSEOContent)
router.post("/projects/:projectId/content-entry/:contentEntryId/content-SEO", upsertSEO)


export default router;