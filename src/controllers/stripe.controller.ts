import { createCheckoutSessionService, handleStripeWebhookService } from "../services/stripe.services";


import {stripe} from "../lib/strip"
import { Request, Response } from "express";
import Stripe from "stripe"

export async function createCheckoutSession(req: Request, res: Response) {
  const userId = req.userId;
  const { planId } = req.body;

  const url = await createCheckoutSessionService(Number(userId), Number(planId));

  res.json({ checkoutUrl: url });
}

/**
 * Stripe Webhook endpoint
 */
export async function stripeWebhook(req: Request, res: Response) {
  const sig = req.headers["stripe-signature"] as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  await handleStripeWebhookService(event);

  res.json({ received: true });
}