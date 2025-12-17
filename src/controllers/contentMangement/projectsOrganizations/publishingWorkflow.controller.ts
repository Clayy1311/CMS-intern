import { updatePublish, updateUnpublish, updateReview, updateSchedule } from "../../../services/contentMangement/projectOrganizations/publishingWorkflow.services";
import { Request, Response } from "express";

export async function publishContent(req:Request, res:Response){


    try {
        const contentEntryId = Number(req.params.contentEntryId)
        const userId = req.userId
        const publish = await updatePublish({contentEntryId, userId : Number(userId)})

        res.json({
            success : true,
            data : publish
        })
     } catch (err) {
        if(err instanceof Error){
            return res.status(500).json({error : err.message})
        }
    }
}

export async function unpublishContent(req:Request, res:Response){

    try {
        const contentEntryId = Number(req.params.contentEntryId)
        const userId = req.userId
        const unpublish = await updateUnpublish({contentEntryId, userId:Number(userId) })

        res.json({
            success : true,
            data : unpublish
        })
    }  catch (err) {
        if(err instanceof Error){
            return res.status(500).json({error : err.message})
        }
    }
}

export async function reviewContent(req:Request, res:Response){
    try {
        const contentEntryId = Number(req.params.contentEntryId)
        const userId = req.userId
        const review = await updateReview({contentEntryId, userId: Number(userId)})

        res.json({
            success : true,
            data : review
        })
    }  catch (err) {
        if(err instanceof Error){
            return res.status(500).json({error : err.message})
        }
    }
}

export async function scheduleContent(req:Request, res:Response){
    try {
        const contentEntryId = Number(req.params.contentEntryId)
       const {scheduledAt} = req.body
       const userId = req.userId
        const schedule = await updateSchedule({contentEntryId, scheduledAt, userId : Number(userId) })

          res.json({
            success : true,
            data : schedule
        })
    }  catch (err) {
        if(err instanceof Error){
            return res.status(500).json({error : err.message})
        }
    }
}