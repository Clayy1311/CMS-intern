
import { createResources, findResources, updateResources, deleteResources, infoProject } from "../services/projects.services";
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

    const userId = req.userId
    const organizationId = parseInt(req.params.organizationId)
    

    try {
        const projects = await findResources({userId : Number(userId), organizationId})

        return res.json({success : true, data:projects})
    } catch (err) {
       if(err instanceof Error){
        return res.status(500).json({error : err.message})
       }
    }
}

export async function updateProjects(req:Request, res:Response){


    const {name} = req.body
     
    const projectId = parseInt(req.params.projectId)
    const ownerId = req.userId
    let organizationsId = parseInt(req.params.organizationsId)

    if(!name) {
        return res.status(400).json({message : "Empty Name"})
    }
    
    try {
     const project = await updateResources({projectId, ownerId: Number(ownerId), organizationsId, name})
     
    return res.json({success : true, data: project})
    } catch (err) {
        if(err instanceof Error){
            return res.status(500).json({error : err.message})
        }
    }


}

export async function deleteProjects(req:Request, res:Response){
    const projectId =  parseInt(req.params.projectId)
    const ownerId = req.userId
    const organizationsId = parseInt(req.params.organizationsId)

    try {
        const projects = await deleteResources({projectId, ownerId : Number(ownerId), organizationsId})

        return res.json({success: true, message: "Delete Successfully", data: projects})
    } catch (err) {
      if (err instanceof Error){
         return res.status(500).json({error : err.message})
      }
    }
}


export async function detailInfoProject(req:Request, res:Response){

    const userId = req.userId
    const projectId = parseInt(req.params.projectId)

    const allInfoProject = await infoProject({projectId, userId:Number(userId)})

    return res.json({success : true, data: allInfoProject})
}