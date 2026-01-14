import prisma from "../db";
import { Subscription,getActiveSubscription } from "../types/subscription";


export async function createSubscription(data: Subscription){

    const now = new Date();
    const periodEnd = new Date();

    periodEnd.setMonth(now.getMonth() + 1); 

    return await prisma.subscriptions.create({
        data : {
            planId : data.planId,
            organizationId : data.organizationId,
            userId : data.userId,
            status  : "active",
            startAt : now,
            endAt : periodEnd
        }
    })
}

export async function getActiveSubscription(data: getActiveSubscription){

    return await prisma.subscriptions.findFirst({
        where : {
            status : "active",
            userId : data.userId,
            organizationId : data.organizationId,
            endAt : {
                gte : new Date()
            }
        },
        include :{
            plan : true
        }
    })
}