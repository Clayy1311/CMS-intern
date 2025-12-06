import prisma from "../../../db";
import { CreateContentField, UpdateContentField, DeleteContentField } from "../../../types/projects";


export async function createContentField(data: CreateContentField){
     const {contentModelId, name, key, type} = data

     const contentField = await prisma.contentFields.create({
        data : {
            contentModelId,
            name,
            key,
            type,
            required: data.required ?? false,
            unique:data.unique?? false,
            order: data.order?? 0,
            validation : data.validation ?? null,
            relationType:data.relationType ?? null,
            relationContentModelId: data.relationContentModelId ??null
        }
     })

     return contentField
}

export async function editContentField(data: UpdateContentField){

    const updateField = await prisma.contentFields.update({
        where : {
            id :data.contentFieldId
        },data: {
    
            name : data.name,
            key : data.key,
            type : data.type,
            required: data.required ?? false,
            unique:data.unique?? false,
            order: data.order?? 0,
            validation : data.validation ?? null,
            relationType:data.relationType ?? null,
            relationContentModelId: data.relationContentModelId ??null
        }
    })
    return updateField
}

export async function destroyContentField(data: DeleteContentField){
    const contentField = await prisma.contentFields.delete({
        where: {
            id : data.contentFieldId
        }
    })
    return contentField
}