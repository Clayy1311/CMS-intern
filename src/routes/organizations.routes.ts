import { createOrganizations } from "../controllers/organizations.controller";
import { Router } from "express";

const router = Router();


router.post("/resources/organizations", createOrganizations);

export default router;