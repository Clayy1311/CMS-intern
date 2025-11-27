import prisma from "../db";
import { DeletePersonalProject, StorePersonalProject, UpdatePersonalProject } from "../types/personalProjects";



export async function indexPersonalProjects(ownerId : number){

   const personalProjects = await prisma.personalProjects.findMany({
    where : {
        ownerId  : ownerId
    }
   })
   return personalProjects
}


export async function storePersonalProjects(data : StorePersonalProject){

    const {ownerId, name } = data;

    const addPersonalProjects = await prisma.personalProjects.create({
        data: {
            name,
            owner : {connect: {id: ownerId} }
        },
       
    })

    return addPersonalProjects
     
}


export async function showPersonalProjects(ownerId :number, projectId:number ){

    const existingpersonalProjects = await prisma.personalProjects.findUnique({
        where: {
            id: projectId
        }
    })

    if(!existingpersonalProjects){
        throw new Error("Personal Project Not Found")
    }
    const isOwner =  existingpersonalProjects.ownerId   === ownerId;

    if(!isOwner){
        throw new Error("You dont have authorize")
    }

    const showPersonalProjects = await prisma.personalProjects.findMany({
        where: {
            id: projectId
        },
        select: {
            id  : true,
            name : true,
            lastUpdated : true,
            status: true,
            customDomain: true,
        }
    })

    return showPersonalProjects
}


export async function editPersonalProjects(data: UpdatePersonalProject) {
  const { ownerId, projectId, name, status, customDomain } = data;

  const existingpersonalProjects = await prisma.personalProjects.findUnique({
    where: {
      id: projectId
    }
  });

  if (!existingpersonalProjects) {
    throw new Error("Personal Project not found");
  }

  if (existingpersonalProjects.ownerId !== ownerId) {
    throw new Error("You dont have authorize");
  }

  
  const updateData: any = {};

  if (name !== undefined && name.trim() !== "") {
    updateData.name = name;
  }

  if (status !== undefined && status.trim() !== "") {
    updateData.status = status;
  }

  if (customDomain !== undefined && customDomain.trim() !== "") {
    updateData.customDomain = customDomain;
  }

  const updatePersonalProjects = await prisma.personalProjects.update({
    where: {
      id: projectId
    },
    data: updateData
  });

  return updatePersonalProjects;
}

export async function destroyPersonalProject(data:DeletePersonalProject){

    const {ownerId, projectId} = data;
    const existingpersonalProjects = await prisma.personalProjects.findUnique({
        where: {
            id: projectId
        }
    })

    if(!existingpersonalProjects){
        throw new Error("Personal Project Not Found")
    }

    const isOwner = existingpersonalProjects.ownerId === ownerId;


    if(!isOwner){
        throw new Error("You dont have authorize")
    }

    const deletePersonalProject = await prisma.personalProjects.delete({
        where : {
            id : projectId
        }
    })

    return deletePersonalProject
}