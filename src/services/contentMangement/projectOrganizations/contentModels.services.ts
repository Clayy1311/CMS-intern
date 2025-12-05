import prisma from "../../../db";
import { CreateContentModel } from "../../../types/personalProjects";
import { DetailContentModel } from "../../../types/projects";
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


export async function detailContentModel(data:DetailContentModel){

    const {contentModelId} = data

    const contentModel = await prisma.contentModels.findMany({
        where : {
            id: contentModelId,
           
        }, select:{
            name : true,
            apiKey: true,
            createdAt: true,
            updatedAt:true
        }
    })

    return contentModel
   
}