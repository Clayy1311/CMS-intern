import { connect } from "http2"
import prisma from "../db/index"
import { CreateProjects, FindProjects, UpdateProjects} from "../types/projects"

export async function createResources(data: CreateProjects){
      const {name, organizationsId, ownerId} = data
       
   const existingOrg = await prisma.organizations.findUnique({where : {id : organizationsId}})
if(!existingOrg) throw new Error("Organizations Not Found");

    if(existingOrg.ownerId !== ownerId) {
        throw new Error("You are not authorized to update this organization");
    }

      const organizations = await prisma.projects.create({
        data : {
            name,
            organization: {connect: {id : organizationsId}}
        }

      })

      return organizations
    
}


export async function findResources(data: FindProjects){

    const {ownerId, organizationsId} = data

    const existingOrg = await prisma.organizations.findUnique({where : {id: organizationsId}})
     
    if(!existingOrg) throw new Error("organization not found")
    
    if(existingOrg.ownerId !== ownerId){
        throw new Error("You dont have authorize")
    }
    const projects = await prisma.projects.findMany({
        where : {id : organizationsId},
        select : {id: true, name: true, lastUpdated: true, collaborators:{ select : {id: true, user: {select : {id: true, email: true, avatar: true} } } }
    }
    })
       
    return projects
    
}

export async function updateResources(data: UpdateProjects){
    const {name, organizationsId, ownerId, id} = data

    const existingOrg = await prisma.organizations.findUnique({where : {id : organizationsId}})
    if(!existingOrg) throw new Error("organization not found")

    if(existingOrg.ownerId !== ownerId){
        throw new Error("you dont have authorize")
    }
      const existingProject = await prisma.projects.findUnique({
    where: { id },
  });
  if (!existingProject) throw new Error("Project not found");

    const project = await prisma.projects.update({
        where : {id},
        data: {
            name
        },
        select : {id : true, name: true}
    })

    return project
}
