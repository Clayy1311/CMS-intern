import { contentCreateOrUpdateSEO, getSEO } from "../../../services/contentMangement/personalProjects/contentSEO.services";
import { Request, Response } from "express";

export async function postOrPatchSEO(req:Request, res:Response){


    try {
    const contentEntryId = Number(req.params.contentEntryId)
    const data = req.body
    const createOrUpdate = await contentCreateOrUpdateSEO({
      contentEntryId, ...data
    })

    res.json({
        success: true,
        message : "SEO added",
        data: createOrUpdate
    })
    }  catch (err) {
        if(err instanceof Error){
            return res.status(500).json({error : err.message})
        }
    }
  
}


export async function indexSEOContent(req:Request, res:Response){


    try {
        const contentEntryId = Number(req.params.contentEntryId)

        const indexSEO = await getSEO({
            contentEntryId
        })

        res.json({
            success : true,
            data : indexSEO
        })
     }  catch (err) {
        if(err instanceof Error){
            return res.status(500).json({error : err.message})
        }
    }
}