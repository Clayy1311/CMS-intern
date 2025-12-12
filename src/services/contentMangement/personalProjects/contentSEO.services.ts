import prisma from "../../../db";
import { UpsertSEO, GetSEO } from "../../../types/projects";

export async function contentCreateOrUpdateSEO(data: UpsertSEO){

    const createOrUpdateSEO = await prisma.contentSEO.upsert({
        where : {
            contentEntryId :data.contentEntryId
        }, update : {
            seoTitle : data.seoTitle,
            metaDesc : data.metaDesc,
            keywords : data.keywords,
            ogImage : data.ogImage,
            twitterImage : data.twitterImage
        }, create: {
             contentEntryId : data.contentEntryId,
             seoTitle : data.seoTitle,
             metaDesc : data.metaDesc,
             keywords : data.keywords,
             ogImage : data.ogImage,
             twitterImage : data.twitterImage
        }
    })

    return createOrUpdateSEO
}

export async function getSEO(data:GetSEO){
    const getContentSEO = await prisma.contentSEO.findMany({
        where : {
            contentEntryId : data.contentEntryId
        }
    })

    return getContentSEO
}
