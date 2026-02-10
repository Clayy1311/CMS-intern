import { handleInformationPackage } from "../../controllers/plan & billings/planAndBillings.controller";
import { Router } from "express";


const router = Router();

router.get("/summary", handleInformationPackage)

export default router;