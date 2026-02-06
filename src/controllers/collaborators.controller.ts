import { createResource, editResource, findResource, deleteResource,getAllUser } from "../services/collaborators.services";
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


//get all user

export async function getUser(req:Request, res:Response){

    const projectId = parseInt(req.params.projectId)
    try {
        const allUser = await getAllUser(projectId)


        return res.json({success : true, data: allUser})
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


    if(!userId){
        return res.status(404).json({error : "User not found"})
    }
    try {
        const collaborators = await editResource(
            {   ownerId:Number(ownerId), 
                userId, 
                projectId, 
                collaboratorsId,
                 role,
                 roleName : role

            })

        return res.json({success: true, message:"Edit Successfully", data:collaborators})
    } catch (err) {
        if(err instanceof Error){
            return res.status(500).json({error : err.message})
        }
    }
}


export async function findAllCollaborators(req:Request, res:Response){
    const projectId = parseInt(req.params.projectId)
    const userId = req.userId
    
    try {
        const collaborators = await findResource({projectId, userId:Number(userId)})

        return res.json({success : true, data: collaborators})
    } catch (err) {
        if(err instanceof Error){
            return res.status(500).json({error : err.message})
        }
    }

}

export async function deleteCollaborators(req:Request, res:Response){
    const ownerId = req.userId
    const projectId = parseInt(req.params.projectId)
    const collaboratorsId = parseInt(req.params.collaboratorsId)
    const userId = parseInt(req.params.userId)


    try {
        const collaborators = await deleteResource(
            {   ownerId: Number(ownerId), 
                projectId, 
                collaboratorsId, 
                userId

            })

        return res.json({success:true, data:collaborators})
    } catch (err) {
        if(err instanceof Error){
            return res.status(500).json({error : err.message})
        }
    }
}