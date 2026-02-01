import { getDashboardDataService } from "../services/dashboard.services";
import { Request, Response } from "express";


export async function getDashboardData(req:Request, res:Response){

    try {
        const userId = req.userId;
        const dashboardData = await getDashboardDataService(Number(userId));
        res.json(dashboardData);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}