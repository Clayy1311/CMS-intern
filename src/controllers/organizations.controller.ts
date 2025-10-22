import { createResource, findResources, updateResources, deleteResources} from "../services/organizations.services";
import { Request, Response } from "express";

export async function createOrganizations(req:Request, res:Response){
  

    const {name} = req.body
    const ownerId = req.userId

    try {
        const organizations = await createResource({
            name : String(name),
             ownerId : Number(ownerId),

    })
        
      
        return res.status(201).json({
      success: true,
      message: "Organization created successfully",
      data: organizations,
    });
    } catch (err) {
      if(err instanceof Error){
        return res.status(500).json({error : err.message})
      }
    }
}

export async function getAllOrganizations(req:Request, res:Response){
    
    const ownerId = req.userId
    try {
        
        const organizations = await findResources(
            {ownerId : Number(ownerId)}
        
        )

        return res.status(201).json({
            success: true,
            data : organizations
        })
    } catch (err) {
    if(err instanceof Error){
        return res.status(500).json({error : err.message})
    }
    }
}

export async function updateOrganizations(req:Request, res:Response){

    const ownerId = req.userId
    const id =  parseInt(req.params.id)
    const {name} = req.body

      if (!id || isNaN(id)) {
      return res.status(400).json({ success: false, error: "Invalid organization ID" });
    }

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: "Organization name is required" });
    }

    try {
        const organizations = await updateResources({ownerId : Number(ownerId), id, name})

        return res.json({success: true, message: "Update Behasil", data: organizations})
    } catch (err) {
      if(err instanceof Error){
        return res.status(500).json({error : err.message})
      }
    }
}


export async function deleteOrganizations(req:Request, res:Response){

    const ownerId = req.userId
    const id = parseInt(req.params.id)

   try {
    const organizations = await deleteResources({id, ownerId: Number(ownerId)})

    return res.json({success: true, message: "Organizations delete successfully", data: organizations})
   } catch (err) {
      if(err instanceof Error){
          return res.status(500).json({error : err.message})
      }
   }
}