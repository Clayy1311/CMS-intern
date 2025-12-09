import prisma from "../../../db";
import { contentCreateOrUpdateSEO, getSEO } from "../../../services/contentMangement/projectOrganizations/contentSEO.services";
import { Request, Response } from "express";

export async function upsertSEO(req: Request, res:Response){

    try {
        const contentEntryId = Number(req.params.contentEntryId)
        const data = req.body
        const upsert = await contentCreateOrUpdateSEO({ contentEntryId, ...data})

        res.json({
            success : true,
            message: "SEO content added",
            data : upsert,
            
        })

    } catch (err) {
        if(err instanceof Error){
            return res.status(500).json({error : err.message})
        }
    }
}

export async function getSEOContent(req:Request, res:Response){

    try {
        const contentEntryId = Number(req.params.contentEntryId)

        const contentSEO = await getSEO({contentEntryId})

        res.json({
            success : true,
            data : contentSEO
        })
      } catch (err) {
        if(err instanceof Error){
            return res.status(500).json({error : err.message})
        }
    }
}