import { Request, Response } from "express";
import { createContentField, editContentField, destroyContentField } from "../../../services/contentMangement/projectOrganizations/contentField.services";



export async function postContentField(req:Request, res:Response){
    try {
    const contentModelId = Number(req.params.contentModelId)
    const {name,key,type,required,unique,order,validation,relationType,relationContentModelId} = req.body

    if (!contentModelId || !name || !key || !type) {
    return res.status(400).json({ message: 'Missing required fields' })
  }


    const contentField   = await createContentField({contentModelId, name,key,type,required,unique,order,validation,relationType,relationContentModelId})

    return res.json({success : true, data:contentField})


    } catch (err) {
        if(err instanceof Error){
            return res.status(500).json({error : err.message})
        }
    }



}

export async function updateContentField(req:Request, res:Response){
    try {
        const contentFieldId = Number(req.params.contentFieldId)
       const {name,key,type,required,unique,order,validation,relationType,relationContentModelId} = req.body

        const editField = await editContentField({contentFieldId, name, key, type, required, unique, order,validation, relationType,relationContentModelId})

        return res.json({sucess: true, data: editField})
    } catch (err) {
        if(err instanceof Error){
            return res.status(500).json({error : err.message})
        }
    }

}


export async function deleteContentField(req:Request, res:Response){
    try {
         const contentFieldId = Number(req.params.contentFieldId)

         const deleteField=  await destroyContentField({contentFieldId})

         return res.json({success:true, data: deleteField})
    } catch (err) {
        if(err instanceof Error){
            return res.status(500).json({error : err.message})
        }
    }
}