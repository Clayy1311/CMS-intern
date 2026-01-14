import { createSubscription } from "../services/subscription.services";


import { Request, Response } from "express";


export async function handleCreateSubscription(req: Request, res: Response) {
    const data = req.body;
    const userId = req.userId;
    if(!data.planId){
        return res.status(400).json({message : "Plan ID is required"})
    }

    try {
        const subscription = await createSubscription({...data, userId});
        return res.status(201).json(subscription);
    } catch (error) {
        return res.status(500).json({message : "Internal Server Error"});
    }
}