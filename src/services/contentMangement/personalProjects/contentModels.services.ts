import prisma from "../../../db";
import { CreateContentModel,GetContentModel, UpdateContentModel, DeleteContentModel } from "../../../types/personalProjects";


export async function createContentModel(data: CreateContentModel){

    const createModel = await prisma.contentModels.create({
        data : {
            name : data.name,
            apiKey : data.apiKey,
            projectPersonalId: data.personalProjectId
            
        }
    })

    return createModel
}

export async function showContentModel(data: GetContentModel){
 
    const getModel = await prisma.contentModels.findMany({
        where : {
            projectPersonalId : data.personalProjectId
        }, include : {
            contentFields : true
        }
    })

    return getModel

}

export async function editContentModel(data:UpdateContentModel){

    const contentModel = await prisma.contentModels.update({
        where : {
            id : data.contentModelId
        }, data : {
            name : data.name,
            apiKey : data.apiKey
        }
    })


    return contentModel
}


export async function destroyContentModel(data:DeleteContentModel ){

    const contentModel = await prisma.contentModels.delete({
       where : {
        id : data.contentModelId
       }
    })

    return contentModel
}

