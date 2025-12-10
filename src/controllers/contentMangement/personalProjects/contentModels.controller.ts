import { createContentModel,showContentModel,editContentModel, destroyContentModel } from "../../../services/contentMangement/personalProjects/contentModels.services";
import { Request, Response } from "express";



export async function postModel(req:Request, res:Response){
    


    try {
    const personalProjectId = Number(req.params.personalProjectId)
    const data = req.body


    const createModel = await createContentModel({personalProjectId, ...data})


    res.json({
        success : true,
        data : createModel
    })
    } catch (err) {
        if(err instanceof Error){
            return res.status(500).json({error : err.message})
        }
    }

}


export async function indexContentModel(req:Request, res:Response){

    const personalProjectId = Number(req.params.personalProjectId)
    try {
       const getModel = await showContentModel({personalProjectId})

        res.json({
            success: true,
            data : getModel
        })
    }  catch (err) {
        if(err instanceof Error){
            return res.status(500).json({error : err.message})
        }
    }
    
}


export async function updateContentModel(req:Request, res:Response){

    try {
        const contentModelId = Number(req.params.contentModelId)
        const data = req.body

        const contentModel = await editContentModel({contentModelId, ...data})

        res.json({
            success: true,
            data : contentModel
        })
     } catch (err) {
        if(err instanceof Error){
            return res.status(500).json({error : err.message})
        }
    }
}


export async function deleteContentModel(req:Request, res:Response){

    try {
        const contentModelId = Number(req.params.contentModelId)
        

        const contentModel = await destroyContentModel({
            contentModelId
        })

        res.json({
            success: true,
            message: "model deleted",
            data : contentModel
        })
   } catch (err) {
        if(err instanceof Error){
            return res.status(500).json({error : err.message})
        }
    }
}