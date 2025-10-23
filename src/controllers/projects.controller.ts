import { createResources } from "../services/projects.services";
import { Request, Response } from "express";


export async function createProjects(req:Request, res:Response){
        
    const {name} = req.body
    const ownerId = req.userId
    const  organizationsId = parseInt(req.params.id)
    
    if (!name || !name.trim()) {
    return res.status(400).json({ error: "Project name is required" });
  }

  if (isNaN(organizationsId)) {
    return res.status(400).json({ error: "Invalid organization ID" });
  }
     
    try {
        const organizations = await createResources({name, ownerId :Number(ownerId), organizationsId})
        
         return res.status(201).json({success: true, message:"Project Created Successfully", data: organizations})
    } catch (err) {
        if(err instanceof Error){
            return res.status(500).json({error : err.message})
        }
    }

    
}