import prisma from "../../../db";
import { CreateContentEntries, DeleteContentEntries, GetContentEntries, UpdateContentEntries } from "../../../types/projects";

export async function createContentEntry(data: CreateContentEntries){

    const createEntryModel = await prisma.contentEntries.create({
        data : {
            contentModelId : data.contentModelId,
            projectOrgId : data.projectId,
            createdBy : data.createdBy,
            slug: data.slug,
            contentValues : {
                create : data.contentValues.map((v) => ({
                    contentFieldId: v.contentFieldId,
                    valueText: typeof v.contentValue === "string" ? v.contentValue : null,
                    valueNumber: typeof v.contentValue=== "number" ? Number(v.contentValue) : null,
                    valueBool: typeof v.contentValue === "boolean" ? v.contentValue : null,
                    valueDate:  v.contentValue instanceof Date ? v.contentValue : null,
                    valueRefId :  typeof v.contentValue === "object" && v.contentValue?.refId
                ? v.contentValue.refId
                : null,
                }))
            }
        }, include :{
            contentValues: true
        }
    })

    return createEntryModel
}


export async function editContentEntry(data: UpdateContentEntries){

    const updateContentEntry = await prisma.contentEntries.update({
        where : {
            id : data.contentEntryId,
        },data: {
            slug: data.slug,
            status: data.status,
            updatedBy: data.updatedBy
        }
    })
    // Update values if provided
    if (data.contentValues) {
      for (const val of data.contentValues) {
        await prisma.contentValues.upsert({
          where: {
    contentEntryId_contentFieldId: {
      contentEntryId: data.contentEntryId,
      contentFieldId: val.contentFieldId
    }
  },
          update: {
            valueText: typeof val.contentValue === "string" ? val.contentValue : null,
            valueNumber:
              typeof val.contentValue === "number" ? Number(val.contentValue) : null,
            valueBool: typeof val.contentValue === "boolean" ? val.contentValue : null,
            valueDate:
              val.contentValue instanceof Date ? val.contentValue : null,
            valueRefId:
              typeof val.contentValue === "object" && val.contentValue?.refId
                ? val.contentValue.refId
                : null,
          },
          create: {
            contentEntryId: data.contentEntryId,
            contentFieldId: val.contentFieldId,
            valueText: typeof val.contentValue === "string" ? val.contentValue : null,
            valueNumber:
              typeof val.contentValue === "number" ? Number(val.contentValue) : null,
            valueBool: typeof val.contentValue === "boolean" ? val.contentValue : null,
            valueDate:
              val.contentValue instanceof Date ? val.contentValue : null,
            valueRefId:
              typeof val.contentValue === "object" && val.contentValue?.refId
                ? val.contentValue.refId
                : null,
          },
        });
      }
    }

    return updateContentEntry;
  }


  export async function getContentEntry(data: GetContentEntries){

    const indexContentEntry = await prisma.contentEntries.findUnique({
      where: {
        id : data.contentEntryId
      }, include : {
        contentValues: true,
        contentSEO: true
      }
    })

    return indexContentEntry
  }

  export async function destroyContentEntry(data: DeleteContentEntries){
const transaction = await prisma.$transaction([
 prisma.contentValues.deleteMany({
       where : {
        contentEntryId: data.contentEntryId

       },
      
    }),
    prisma.contentEntries.delete({
      where: {
        id : data.contentEntryId
      }
    }),

  
])
    
  return transaction
   
  }