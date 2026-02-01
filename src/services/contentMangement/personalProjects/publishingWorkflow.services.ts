import prisma from "../../../db";
import { Publish, Unpublish, Review, SchedulePublish } from "../../../types/publishingWorkflow";



export async function updatePublish(data: Publish){

    const publish = await prisma.contentEntries.update({
        where : {
            id : data.contentEntryId
        }, data : {
            status : "PUBLISHED",
            publishedAt : new Date()
        }
    })

    return publish
}

export async function updateUnpublish(data: Unpublish){

    const unpublish = await prisma.contentEntries.update({
        where : {
            id : data.contentEntryId
        }, data : {
            status : "DRAFT",
            publishedAt : null,
            updatedBy : data.userId
        }
    })
    return unpublish
}

export async function updateReview(data:Review){

    const review = await prisma.contentEntries.update({
        where : {
            id : data.contentEntryId
        }, data :{
            status : "IN_REVIEW",
            updatedBy : data.userId
        }
    })
    return review
}

export async function updateSchedule(data: SchedulePublish){

    const schedule = await prisma.contentEntries.update({
        where : {
            id : data.contentEntryId
        }, data : {
            status : "scheduled",
            scheduledAt : new Date(data.scheduledAt),
            updatedBy : data.userId

        }
    })
    return schedule
}