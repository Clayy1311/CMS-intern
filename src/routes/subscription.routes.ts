import { handleCreateSubscription } from "../controllers/subscription.controller";
import { Router } from "express";

const router = Router();

router.post("/subscriptions", handleCreateSubscription);


export default router;