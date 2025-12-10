import prisma from "../../../db";
import { CreateContentModel } from "../../../types/projects";
import { UpdateContentModel } from "../../../types/projects";
export async function getContentModel(){


}


export async function createContentModel(data: CreateContentModel){

    const {projectId, name, apiKey} = data
     const contentModel = await prisma.contentModels.create({
          data: {
            name,
            apiKey,
            projectOrgId : projectId
          }
     })

     return contentModel
}

export async function showContentModel(projectId: number){

    const contentModel = await prisma.contentModels.findMany({
        where: {
            projectOrgId: projectId

        },
        include: {
            contentFields : true
        }
    })
    return contentModel
}


export async function detailContentModel(contentModelId:number){

   

    const contentModel = await prisma.contentModels.findMany({
        where : {
            id: contentModelId,
           
        }, select:{
            name : true,
            apiKey: true,
            createdAt: true,
           
        }
    })

    return contentModel
   
}

export async function editContentModel(data:UpdateContentModel){

    const {contentModelId, apiKey,name} = data

    const contentModel =await prisma.contentModels.update({
        where : {
            id : contentModelId
        }, data : {
            name,
            apiKey
        }
    })

    return contentModel
}

export async function destroyContentModel(contentModelId:number){

    const contentModel = await prisma.contentModels.delete({
        where : {
            id : contentModelId
        }
    })

    return contentModel
}