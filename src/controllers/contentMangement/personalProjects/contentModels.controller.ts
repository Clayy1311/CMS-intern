import { createContentModel,showContentModel,editContentModel, destroyContentModel } from "../../../services/contentMangement/personalProjects/contentModels.services";
import { Request, Response } from "express";
import { detailContentModel } from "../../../services/contentMangement/projectOrganizations/contentModels.services";



export async function postModel(req:Request, res:Response){
    


    try {
    const personalProjectId = Number(req.params.personalProjectId)
    const {name} = req.body

     const slug = name.toLowerCase().replace(/\s+/g, '_')

    const createModel = await createContentModel({personalProjectId, name, slug})


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

export async function infoContentModel(req:Request, res:Response){
    try {
        const contentModelId = Number(req.params.contentModelId)

        const contentModel = await detailContentModel(contentModelId)

        if(!contentModel){
            return res.status(404).json({message : "Content Model not found"})
        }

       return res.json({
        success : true,
        data : contentModel
       })
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({error : error.message})
        }
    }
}

export async function updateContentModel(req:Request, res:Response){

    try {
        const contentModelId = Number(req.params.contentModelId)
        const {name} = req.body

        if(!name) {
            return res.status(403).json({message : "name Required"})
        }

        const slug = name.toLowerCase().replace(/\s+/g, '_')

        const contentModel = await editContentModel({contentModelId, name, slug})

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