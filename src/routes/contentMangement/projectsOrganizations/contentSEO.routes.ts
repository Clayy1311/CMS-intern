import { Router } from "express";
import { upsertSEO, getSEOContent } from "../../../controllers/contentMangement/projectsOrganizations/contentSEO.controller";
import { orgProjectAccess } from "../../../middlewares/organizationalProjectAccess";

const router = Router();
router.get("/projects/:projectId/content-entry/:contentEntryId/content-SEO", orgProjectAccess, getSEOContent)
router.post("/projects/:projectId/content-entry/:contentEntryId/content-SEO", orgProjectAccess, upsertSEO)


export default router;