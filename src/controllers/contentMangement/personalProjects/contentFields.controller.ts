import { createContentField, editContentField, destroyContentField } from "../../../services/contentMangement/personalProjects/contentField.services"
import { Request, Response } from "express"

export async function postContentField(req:Request, res:Response){


    try {
    const contentModelId = Number(req.params.contentModelId)
    const data = req.body
    const contentField = await createContentField({contentModelId, ...data})

    res.json({
        success: true,
        message: "field added",
        data : contentField
    })


    }  catch (err) {
        if(err instanceof Error){
            return res.status(500).json({error : err.message})
        }
    }
  
}

export async function updateContentField(req:Request, res:Response){

    try {
        const contentFieldId  = Number(req.params.contentFieldId)
        const data = req.body

        const contentField = await editContentField({contentFieldId, ...data})

        res.json({
            success : true,
            message : "Update successful",
            data : contentField
        })
    }  catch (err) {
        if(err instanceof Error){
            return res.status(500).json({error : err.message})
        }
    }
}

export async function deleteContentField(req:Request, res:Response){
    try {
        const contentFieldId = Number(req.params.contentFieldId)

        const contentField = await destroyContentField({contentFieldId})

        res.json({
            success : true,
            message : "Field deleted",
            data : contentField
        })
    }  catch (err) {
        if(err instanceof Error){
            return res.status(500).json({error : err.message})
        }
    }
}