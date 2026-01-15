import prisma from "../db";
import {stripe} from "../lib/strip"
import Stripe from "stripe";

export async function createCheckoutSessionService(userId: number, planId: number) {
    const plan = await prisma.plans.findUnique({where : {
        id : planId
    }})

    if(!plan) {
        throw new Error("Plan not found")
    }

    const user = await prisma.users.findUnique({
        where : {
            id : userId
        }
    })

    if(!user){
        throw new Error("User Not found")
    }


    if (!plan.stripePriceId) {
        throw new Error("Plan does not have a Stripe Price ID");
    }

    const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        customer_email: user.email,
      
        line_items: [
            {
                price: plan.stripePriceId,
                quantity: 1
            }
        ],
        success_url: `${process.env.FRONTEND_URL}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/billing/cancel`,
        metadata: {
            userId: user.id.toString(),
            planId: plan.id.toString()
        }
    });

    if (!session || !session.url) {
        throw new Error("Failed to create Stripe checkout session");
    }

    return session.url;
}


export async function handleStripeWebhookService(event: Stripe.Event) {
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const subscriptionId = session.subscription as string;
    const userId = Number(session.metadata?.userId);
    const planId = Number(session.metadata?.planId);

    const subscription = await stripe.subscriptions.retrieve(subscriptionId ,{
      expand : ["latest_invoice"]
    });

   const invoiceUrl = (subscription.latest_invoice as any)?.hosted_invoice_url;
   
    await prisma.subscriptions.upsert({
      where: {
        stripeSubscriptionId: subscription.id
      },
      update: {
        status: subscription.status,
        startAt: new Date(subscription.current_period_start * 1000),
        endAt: new Date(subscription.current_period_end * 1000),
        invoiceUrl : invoiceUrl
      },
      create: {
        userId,
        planId,
        status: subscription.status,
        stripeSubscriptionId: subscription.id,
        startAt: new Date(subscription.current_period_start * 1000),
        endAt: new Date(subscription.current_period_end * 1000),
        invoiceUrl : invoiceUrl
      }
    });
  }
}