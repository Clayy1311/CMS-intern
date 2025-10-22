import { createResource } from "../services/organizations.services";
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