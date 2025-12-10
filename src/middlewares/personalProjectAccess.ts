import prisma from "../db";
import { Request, Response, NextFunction } from "express";

export async function personalProjectAccess(req: Request, res:Response, next:NextFunction){

    const userId = req.userId
    const personalProjectId = Number(req.params.personalProjectId)
    const project  = await prisma.personalProjects.findUnique({
        where : {
            id : personalProjectId
        }
    })

    if(!project){
        return res.status(400).json({message:"project not found"})
    }

    if(project.ownerId !== userId){
        return res.status(403).json({message: "You dont have authorize"})
    }
    next();
}
