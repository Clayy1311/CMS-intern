import { connect } from "http2";
import prisma from "../db";
import { AddCollaborators, DeleteCollaborators, EditCollaborators, FindAllCollaborators } from "../types/collaborators";
import { AllUser } from "../types/auth.types";
export async function createResource(data: AddCollaborators) {
  const { projectId, userId, ownerId } = data;


  const existingProject = await prisma.projects.findUnique({
    where: { id: projectId },
    include: { organization: true }
  });

  if (!existingProject) {
    throw new Error("Project not found");
  }

  if (existingProject.organization.ownerId !== ownerId) {
    throw new Error("Unauthorized access");
  }

  const existingCollaborator = await prisma.collaborators.findFirst({
    where: {
      projectId,
      userId
    }
  });

  if (existingCollaborator) {
    throw new Error("User already a collaborator");
  }

 
  const defaultRole = await prisma.roles.findUnique({
    where: { name: "viewer" }
  });

  if (!defaultRole) {
    throw new Error("Default role not found");
  }

 
  const collaborator = await prisma.collaborators.create({
    data: {
      user: { connect: { id: userId } },
      project: { connect: { id: projectId } },
      role: { connect: { id: defaultRole.id } }
    },
    include: {
      user: true,
      role: true
    }
  });

  return collaborator;
}

export async function editResource(data: EditCollaborators) {
  const { projectId, userId, ownerId, collaboratorsId, roleName } = data

  if (!roleName?.trim()) throw new Error("role cannot be empty")

  const existingProject = await prisma.projects.findUnique({
    where: { id: projectId },
    include: { organization: true }
  })

  if (!existingProject) throw new Error("Project Not Found")

  if (existingProject.organization.ownerId !== ownerId) {
    throw new Error("You Dont have authorize")
  }

  const collaborators = await prisma.collaborators.update({
    where: { id: collaboratorsId },
    data: {
      user: { connect: { id: userId } },
      project: { connect: { id: projectId } },
      role: {
        connect: { name: roleName } 
      }
    }
  })

  return collaborators
}

export async function findResource(data:FindAllCollaborators){
    const {projectId, userId} = data

    const existingProject = await prisma.projects.findUnique({
        where : {id:projectId},
        include: {organization:true}
    })

    if(!existingProject) throw new Error("Project Not Found")

    //check if owner
    const isOwner = existingProject.organization.ownerId === userId;

     //check if collaborator
       const isCollaborator = await prisma.projects.findFirst({
        where : {
            collaborators: {
                some: {userId}
            }
        }
       });

       if(!isOwner && !isCollaborator){
           throw new Error("You dont have authorize")
       }

    const collaborators = await prisma.collaborators.findMany({
        where : {projectId: projectId},
       select : { id: true, status:true, role: true,user : {select : {id: true, fullName:true,  }}}
    })

    return collaborators
}


export async function deleteResource(data:DeleteCollaborators){
    const {projectId, userId, ownerId, collaboratorsId} = data

    const existingProject = await prisma.projects.findUnique({
        where : {id:projectId},
        include: {organization:true}
    })

    if(!existingProject) throw new Error("Project Not Found")
    
    if(existingProject.organization.ownerId !== ownerId){
        throw new Error("You don't have to authorize")
    }

    const collaborators = await prisma.collaborators.delete({
        where : {id:collaboratorsId},
         select : {
            userId : true
         }
    })

    return collaborators
}

//get all user for invite

export async function getAllUser(projectId : Number){


   const user = await prisma.users.findMany();
   return user
}