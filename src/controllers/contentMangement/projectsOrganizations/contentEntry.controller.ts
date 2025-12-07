import { createContentEntry, editContentEntry,getContentEntry, destroyContentEntry} from "../../../services/contentMangement/projectOrganizations/contentEntries.services";
import { Request, Response } from "express";



export async function postContentEntry(req:Request, res:Response){
    try {
      
        const projectId = Number(req.params.projectId)
        const contentModelId = Number(req.params.contentModelId);

        const data = req.body;

        
        const result = await createContentEntry({projectId, ...data, contentModelId})

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

          const data = req.body

          const result = await editContentEntry({projectId, ...data, contentEntryId})
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

export async function indexContentEntry(req:Request, res:Response){


     try {
    const contentEntryId = Number(req.params.contentEntryId)

    const contentEntry = await getContentEntry({contentEntryId})

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