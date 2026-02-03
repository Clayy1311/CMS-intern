import prisma from "../../../db";
import { CreateContentModel } from "../../../types/projects";
import { UpdateContentModel } from "../../../types/projects";
export async function getContentModel(){


}


export async function createContentModel(data: CreateContentModel){

    const {projectId, name, slug } = data
     const contentModel = await prisma.contentModels.create({
          data: {
            name,
            slug,
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
            contentFields : true,
            
        }
    })
    return contentModel
}


export async function detailContentModel(contentModelId:number){

   

    const contentModel = await prisma.contentModels.findMany({
        where : {
            id: contentModelId,
           
        }, include : {
            contentFields : true
        }
    })

    return contentModel
   
}

export async function editContentModel(data:UpdateContentModel){

    const {contentModelId,name, slug} = data

    const contentModel =await prisma.contentModels.update({
        where : {
            id : contentModelId
        }, data : {
            name,
            slug
        }
    })

    return contentModel
}

export async function destroyContentModel(contentModelId:number){

    const contentModel = await prisma.contentModels.update({
        where : {
            id : contentModelId
        },data : {
            deletedAt : new Date(),
            isArchived : true
        }
    })

    return contentModel
}