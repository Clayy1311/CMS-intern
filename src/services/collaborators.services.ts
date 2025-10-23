import { connect } from "http2";
import prisma from "../db";
import { AddCollaborators, EditCollaborators, FindAllCollaborators } from "../types/collaborators";

export async function createResource(data:AddCollaborators){
     const {projectId, userId, ownerId}  = data


    const existingProject = await prisma.projects.findUnique({
        where: {id: projectId},
        include: {organization: true}
    })

    if(!existingProject) throw new Error("Project Not Found")

    if(existingProject.organization.ownerId !== ownerId){
        throw new Error("You Dont Have Authorize")
    }

    const collaborators = await prisma.collaborators.create({
        data : {
            user : {connect : {id: userId}},
            project : {connect: {id: projectId}}
        }
    })

    return collaborators
}


export async function editResource(data:EditCollaborators){
    const {projectId, userId, ownerId, collaboratorsId, role} = data

    const existingProject = await prisma.projects.findUnique({
        where : {id : projectId},
        include: {organization: true}
    })

    if(!role?.trim()) throw new Error("role cannot be empty")
    if(!existingProject) throw new Error("Project Not Found")
    
    if(existingProject.organization.ownerId !== ownerId){
        throw new Error("You Dont have authorize")
    }

    const collaborators = await prisma.collaborators.update({
        where : {id : collaboratorsId},
          data :{
            user : {connect : {id:userId}},
            project : {connect : {id:projectId}},
            role
          }
    })

    return collaborators
}


export async function findResource(data:FindAllCollaborators){
    const {projectId, ownerId} = data

    const existingProject = await prisma.projects.findUnique({
        where : {id:projectId},
        include: {organization:true}
    })

    if(!existingProject) throw new Error("Project Not Found")

    if(existingProject.organization.ownerId !== ownerId){
        throw new Error("you don't have to authorize")
    }

    const collaborators = await prisma.collaborators.findMany({
        where : {projectId: projectId},
       select : {status:true, role: true,user : {select : {id: true, fullName:true,  }}}
    })

    return collaborators
}