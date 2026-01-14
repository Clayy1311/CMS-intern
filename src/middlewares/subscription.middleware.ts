import { getActiveSubscription } from "../services/subscription.services";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
      subscription?: any; 
      plan?: any;
    }
  }
}

export async function subscriptionMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const subscription = await getActiveSubscription({ userId });

    if (!subscription) {
      return res.status(403).json({
        message: "No active subscription found",
      });
    }

    req.subscription = subscription;
    req.plan = subscription.plan;

    next();
  } catch (error) {
    console.error("Subscription Middleware Error:", error);
    return res.status(500).json({
      message: "Failed to validate subscription",
    });
  }
}
