import { createCheckoutSession } from "../controllers/stripe.controller";


import { Router } from "express";

const router = Router();



router.post("/checkout", createCheckoutSession)



export default router;