import prisma from "../../../db";
import { CreateContentEntries, DeleteContentEntries, GetContentEntries, GetContentEntriesByModel, UpdateContentEntries } from "../../../types/projects";

export async function createContentEntry(data: CreateContentEntries){

    const createEntry = await prisma.contentEntries.create({
        data : {
            contentModelId : data.contentModelId,
            projectOrgId : data.projectId,
            createdBy  : data.userId,
           status : "DRAFT"
        }, 
      
    })

    const fields = await prisma.contentFields.findMany({
      where : {
        contentModelId : data.contentModelId
      }
    })
  const contentValues: { [key: string]: any } = data.contentValues || {};
  const seo = data.seo;

  for (const field of fields) {
    const value = contentValues[field.key];
    if (value === undefined) continue;

    await prisma.contentValues.create({
      data: {
        contentEntryId: createEntry.id,
        contentFieldId: field.id,
        ...(field.type === 'TEXT' && { valueText: value }),
        ...(field.type === 'RICHTEXT' && { valueText: value }),
        ...(field.type === 'NUMBER' && { valueNumber: Number(value) }),
        ...(field.type === 'BOOLEAN' && { valueBool: Boolean(value) }),
        ...(field.type === 'DATE' && { valueDate: new Date(value) })
      }
    });
  }

  if (seo) {
    await prisma.contentSEO.create({
      data: {
        contentEntryId: createEntry.id,
        ...seo
      }
    });
  }

  return  {
    createEntry, contentValues, seo
  };
}


export async function editContentEntry(data: UpdateContentEntries){
     
      const entry = await prisma.contentEntries.findUnique({
        where : {
          id : data.contentEntryId,
        },include : {
          contentValues : true
        }
      })

      if(!entry){
        throw new Error("Content Entry not found")
      }

      const fields = await prisma.contentFields.findMany({
        where : {
          contentModelId : entry.contentModelId
        }
      })

const contentValues: { [key: string]: any } = data.contentValues || {};
  const seo = data.seo;

  for (const field of fields) {
    const value = contentValues[field.key];
    if (value === undefined) continue;

    await prisma.contentValues.upsert({
      where: {
        contentEntryId_contentFieldId: {
          contentEntryId: entry.id,
          contentFieldId: field.id
        }
      },
     
      update: {
        valueText: field.type === 'TEXT' || field.type === 'RICHTEXT' ? value : null,
        valueNumber: field.type === 'NUMBER' ? Number(value) : null,
        valueBool: field.type === 'BOOLEAN' ? Boolean(value) : null,
        valueDate: field.type === 'DATE' ? new Date(value) : null
      
      },
      create: {
        contentEntryId: entry.id,
        contentFieldId: field.id,
        valueText: field.type === 'TEXT' || field.type === 'RICHTEXT' ? value : null,
        valueNumber: field.type === 'NUMBER' ? Number(value) : null,
        valueBool: field.type === 'BOOLEAN' ? Boolean(value) : null,
        valueDate: field.type === 'DATE' ? new Date(value) : null,
        
      }, include : {
          contentEntry : {
            select : {
              updatedBy : true
            }
          }
      }
    })
    
    const  contentEntries = await prisma.contentEntries.update({
         where : {
          id : data.contentEntryId
         
         }, data : {
          updatedBy : data.userId,
          updatedAt : new Date()
         }
})
    if (seo) {
      await prisma.contentSEO.upsert({
        where: { contentEntryId: entry.id },
        update: seo,
        create: { contentEntryId: entry.id, ...seo }
      })
    }
  
      return {
        entry, contentValues, seo, contentEntries
      }
  }


}


  export async function getContentEntry(data: GetContentEntriesByModel){

    const entries = await prisma.contentEntries.findMany({
      where : {
        contentModelId : data.contentModelId, 
        deletedAt : null
      },include : {
        contentValues : {
          include : {
            contentField : true
          }
        },
        contentSEO : true
      },
      orderBy : {
        createdAt : "desc"
      }
    })
      const result = entries.map(entry => {
    const values: Record<string, any> = {}
    entry.contentValues.forEach(v => {
      values[v.contentField.key] =
        v.valueText ??
        v.valueNumber ??
        v.valueBool ??
        v.valueDate
    })
    return {
      ...entry,
      contentValues: values,
      contentSEO : entry.contentSEO
    }
  })
  return result
}

  export async function getContentEntryById(data: GetContentEntries){

    const indexContentEntry = await prisma.contentEntries.findUnique({
      where: {
        id : data.contentEntryId
      }, include : {
        contentValues: {
          include : {
            contentField : true
          }
        },
        contentSEO: true
      }
    })
    
   const values: Record<string, any> = {}
  indexContentEntry?.contentValues.forEach(v => {
    values[v.contentField.key] =
      v.valueText ??
      v.valueNumber ??
      v.valueBool ??
      v.valueDate
  })

    return indexContentEntry
  }

  export async function destroyContentEntry(data: DeleteContentEntries){

  const contentEntries = await   prisma.contentEntries.update({
      where: {
        id : data.contentEntryId,
        
      },data :{
        deletedAt : new Date()
      }
    })

  
    
  return contentEntries
   
  }