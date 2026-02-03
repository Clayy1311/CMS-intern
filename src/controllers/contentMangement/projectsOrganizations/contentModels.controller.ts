import { createContentModel, showContentModel,detailContentModel, editContentModel, destroyContentModel } from "../../../services/contentMangement/projectOrganizations/contentModels.services";
import { Request, Response } from "express";


export async function postContentModel(req:Request, res:Response){

    try {
        const {name} = req.body
        const projectId = Number(req.params.projectId)
    
         const slug = name.toLowerCase().replace(/\s+/g, '_')
        const createModel = await createContentModel({name, projectId, slug })
      
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
         const { name} = req.body

         const slug = name.toLowerCase().replace(/\s+/g, '_')
         const contentModel = await editContentModel({slug, name, contentModelId})
        
         

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