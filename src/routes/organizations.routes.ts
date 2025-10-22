import { createOrganizations, getAllOrganizations, updateOrganizations,deleteOrganizations  } from "../controllers/organizations.controller";
import { Router } from "express";

const router = Router();

router.get("/resources/all", getAllOrganizations)
router.post("/resources/organizations", createOrganizations);
router.patch("/resources/organizations/:id", updateOrganizations);
router.delete("/resources/organizations/:id/delete", deleteOrganizations)
export default router;