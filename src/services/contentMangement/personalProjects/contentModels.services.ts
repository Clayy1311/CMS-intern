import prisma from "../../../db";
import { CreateContentModel,GetContentModel, UpdateContentModel, DeleteContentModel } from "../../../types/personalProjects";


export async function createContentModel(data: CreateContentModel){

    const createModel = await prisma.contentModels.create({
        data : {
            name : data.name,
            slug : data.slug,
            projectPersonalId: data.personalProjectId
            
        }
    })

    return createModel
}

export async function showContentModel(data: GetContentModel){
 
    const getModel = await prisma.contentModels.findMany({
        where : {
            projectPersonalId : data.personalProjectId, 
            deletedAt : null,
        }, include : {
            contentFields : true
        }
    })

    return getModel

}

export async function detailContentModel(contentModelId:number){

    const getModelById = await prisma.contentModels.findMany({
        where : {
            id : contentModelId
        }, include : {
            contentFields : true
        }
    })
    return getModelById
}

export async function editContentModel(data:UpdateContentModel){

    const contentModel = await prisma.contentModels.update({
        where : {
            id : data.contentModelId
        }, data : {
            name : data.name,
           slug : data.slug
        }
    })


    return contentModel
}


export async function destroyContentModel(data:DeleteContentModel ){

    const contentModel = await prisma.contentModels.update({
       where : {
        id : data.contentModelId
       }, data : {
           deletedAt : new Date(),
           isArchived : true
       }
    })

    return contentModel
}

