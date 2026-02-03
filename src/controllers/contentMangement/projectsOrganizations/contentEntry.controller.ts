import { error } from "console";
import { createContentEntry, editContentEntry, getContentEntry, destroyContentEntry, getContentEntryById} from "../../../services/contentMangement/projectOrganizations/contentEntries.services";
import { Request, Response } from "express";



export async function postContentEntry(req:Request, res:Response){
    try {
      
        const  userId = req.userId
        const projectId = Number(req.params.projectId)
        const contentModelId = Number(req.params.contentModelId);

        const {contentValues, seo} = req.body


        const result = await createContentEntry({projectId, contentModelId, contentValues, seo, userId: Number(userId)})

        return res.json({
            message: "Content Entry created successfully.",
            data: result
        });
    }  catch (err) {
        if(err instanceof Error){
            return res.status(500).json({error : err.message})
        }
    }
}

export async function updateContentEntry(req:Request, res:Response){

    try {
          const projectId = Number(req.params.projectId)
          const contentEntryId = Number(req.params.contentEntryId)
          const userId = req.userId
          const {contentValues, seo} = req.body

          const result = await editContentEntry({projectId, contentEntryId, contentValues, seo, userId: Number(userId)})
            return res.json({
            message: "Content Entry updated successfully.",
            data: result
        });
    } catch (err) {
        if(err instanceof Error){
            return res.status(500).json({error : err.message})
        }
    }
}

export async function getAllContentEntry(req:Request, res:Response) {

    try {
        const contentModelId = Number(req.params.contentModelId)


        if(!contentModelId ){
            return res.status(400).json({error : "Content Model ID is required"})
        }

        const contentEntries = await getContentEntry({contentModelId})

        return res.json({success: true, data: contentEntries})

    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({error : error.message})
        }
    }
}

export async function handleGetContentEntryById(req:Request, res:Response){


     try {
    const contentEntryId = Number(req.params.contentEntryId)

    const contentEntry = await getContentEntryById({contentEntryId})

    res.json({success: true, data: contentEntry})
      
    } catch (err) {
        if(err instanceof Error){
            return res.status(500).json({error : err.message})
        }
    }
    
}

export async function deleteContentEntry(req:Request, res:Response){
    try {
        const contentEntryId = Number(req.params.contentEntryId)

        const contentEntry = await destroyContentEntry({contentEntryId})

        res.json({
            success: true , message : "Entry deleted", data:contentEntry
        })
    } catch (err) {
        if(err instanceof Error){
            return res.status(500).json({error : err.message})
        }
    }
}