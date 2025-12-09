import prisma from "../../../db";
import { UpsertSEO, GetSEO } from "../../../types/projects";


export async function contentCreateOrUpdateSEO(data : UpsertSEO){

    const upsert = await prisma.contentSEO.upsert({
        where : {
            contentEntryId : data.contentEntryId
        },update : {
            seoTitle : data.seoTitle,
            metaDesc : data.metaDesc,
            keywords : data.keywords,
            ogImage : data.ogImage,
            twitterImage : data.twitterImage,

        },create : {
            contentEntryId : data.contentEntryId,
            seoTitle : data.seoTitle,
            metaDesc : data.metaDesc,
            keywords : data.keywords,
            ogImage : data.ogImage,
            twitterImage : data.twitterImage
        }
    })

    return upsert
}

export async  function getSEO(data: GetSEO){

    const get = await prisma.contentSEO.findUnique({
        where : {
            contentEntryId : data.contentEntryId
                
            
        }
    })

    return get
}