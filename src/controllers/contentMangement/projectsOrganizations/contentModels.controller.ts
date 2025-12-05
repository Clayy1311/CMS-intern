import { createContentModel, showContentModel,detailContentModel, editContentModel, destroyContentModel } from "../../../services/contentMangement/projectOrganizations/contentModels.services";
import { Request, Response } from "express";


export async function postContentModel(req:Request, res:Response){

    try {
        const {name, apiKey} = req.body
        const projectId = Number(req.params.projectId)
    

        const createModel = await createContentModel({name,apiKey, projectId})
      
        return res.json({success:true, data: createModel})
        
     } catch (err) {
        if(err instanceof Error){
            return res.status(500).json({error : err.message})
        }
    }
}

export async function indexContentModel(req:Request, res:Response){
    try {
        const projectId = Number(req.params.projectId)

        const contentModel = await showContentModel(projectId)

        return res.json({success: true, data:contentModel})
    } catch (err) {
        if(err instanceof Error){
            return res.status(500).json({error : err.message})
        }
    }
}

export async function infoContentModel(req:Request, res:Response){
    try {
        
        const contentModelId = Number(req.params.contentModelId)

        const contentModel = await detailContentModel(contentModelId)
       
        return res.json({sucess: true, data:contentModel})
     } catch (err) {
        if(err instanceof Error){
            return res.status(500).json({error : err.message})
        }
    }

}

export async function updateContentModel(req:Request, res:Response){
    try {
         const contentModelId = Number(req.params.contentModelId)
         const {apiKey, name} = req.body
         const contentModel = await editContentModel({apiKey, name, contentModelId})

         if(!apiKey){
            return res.status(403).json({message : "apiKey Required"})
         }

         if(!name){
             return res.status(403).json({message : "name Required"})
         }

         return res.json({success : true, data: contentModel})
    } catch (err) {
        if(err instanceof Error){
            return res.status(500).json({error : err.message})
        }
    }
}

export async function deleteContentModel(req:Request, res:Response){
 try {
         const contentModelId = Number(req.params.contentModelId)

         const contentModel = await destroyContentModel(contentModelId)

         return res.json({success: true, data:contentModel})
 }  catch (err) {
        if(err instanceof Error){
            return res.status(500).json({error : err.message})
        }
    }
}