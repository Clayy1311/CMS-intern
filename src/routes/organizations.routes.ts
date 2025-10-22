import { createOrganizations, getAllOrganizations, updateOrganizations } from "../controllers/organizations.controller";
import { Router } from "express";

const router = Router();

router.get("/resources/all", getAllOrganizations)
router.post("/resources/organizations", createOrganizations);
router.patch("/resources/organizations/:id", updateOrganizations);

export default router;