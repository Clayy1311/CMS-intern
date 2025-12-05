import prisma from "../db";
import { Request, Response, NextFunction } from "express";


export async function orgProjectAccess(req: Request, res:Response, next:NextFunction){

    const userId = req.userId as number;
    const projectId = Number(req.params.projectId)


    const project = await prisma.projects.findUnique({
        where : {
            id : projectId
        },
        include: {
            collaborators : true,
            organization : true
        }
    })

    if(!project){
        return res.status(404).json({message : "project not found"})
    }

    const isOwner =  project.organization.ownerId === userId

    const isCollaborator = project.collaborators.some(c => 
    c.userId === userId && c.status === "active"
  );
  
  if(!isOwner && !isCollaborator){
    return res.status(403).json({message: "You dont have authorize"})
  }

  next();
}