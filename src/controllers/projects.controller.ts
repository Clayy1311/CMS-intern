import { createResources, findResources, updateResources } from "../services/projects.services";
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

export async function getAllProjects(req:Request, res:Response){

    const ownerId = req.userId
    const organizationsId = parseInt(req.params.id)
    

    try {
        const projects = await findResources({ownerId : Number(ownerId), organizationsId})

        return res.json({success : true, data:projects})
    } catch (err) {
       if(err instanceof Error){
        return res.status(500).json({error : err.message})
       }
    }
}

export async function UpdateProjects(req:Request, res:Response){


    const {name} = req.body
     
    const id = parseInt(req.params.id)
    const ownerId = req.userId
    let organizationsId = parseInt(req.params.id)

    if(!name) {
        return res.status(400).json({message : "Empty Name"})
    }
    
    try {
     const project = await updateResources({id, ownerId: Number(ownerId), organizationsId, name})
     
    return res.json({success : true, data: project})
    } catch (err) {
        if(err instanceof Error){
            return res.status(500).json({error : err.message})
        }
    }


}