import { createContentModel, showContentModel,detailContentModel } from "../../../services/contentMangement/projectOrganizations/contentModels.services";
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