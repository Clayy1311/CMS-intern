import { createResource, editResource } from "../services/collaborators.services";
import { Request, Response } from "express";


export async function addCollaborators(req:Request, res:Response){
    const ownerId = req.userId
    const projectId = parseInt(req.params.projectId)
    const userId = parseInt(req.body.userId)
    
    try {
        const collaborators = await createResource({ownerId : Number(ownerId), projectId, userId})
        return res.json({success:true, message: "User added", data : collaborators})

    } catch (err) {
      if(err instanceof Error){
        return res.status(500).json({error : err.message})
      }
    }
}


export async function editCollaborators(req:Request, res:Response){
    const ownerId = req.userId
    const userId = parseInt(req.params.userId)
    const projectId = parseInt(req.params.projectId)
    const  collaboratorsId = parseInt(req.params.collaboratorsId)
    const {role} = req.body


    try {
        const collaborators = await editResource(
            {   ownerId:Number(ownerId), 
                userId, 
                projectId, 
                collaboratorsId,
                 role

            })

        return res.json({success: true, message:"Edit Successfully", data:collaborators})
    } catch (err) {
        if(err instanceof Error){
            return res.status(500).json({error : err.message})
        }
    }
}