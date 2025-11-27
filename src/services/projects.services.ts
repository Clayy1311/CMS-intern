import { connect } from "http2"
import prisma from "../db/index"
import { CreateProjects, FindProjects, UpdateProjects, DeleteProject} from "../types/projects"

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

        const {userId, organizationId} = data

        const existingOrg = await prisma.organizations.findUnique({where : {id: organizationId}})
        
        if(!existingOrg) throw new Error("organization not found")
        //check if owner 
       const isOwner = existingOrg.ownerId === userId;

       //check if collaborator
       const isCollaborator = await prisma.projects.findFirst({
        where : {
            organizationId,
            collaborators: {
                some: {userId}
            }
        }
       });

       if(!isOwner && !isCollaborator){
        throw new Error("You dont have authorize")
       }

        const projects = await prisma.projects.findMany({
            where : {organizationId: organizationId},
            select : {id: true, name: true, lastUpdated: true, collaborators: { select : {id: true, role: true, user: {select : {id: true, email: true, avatar: true} } }
        }
        },
        
        })
    
      // format response
  return projects.map(project => ({
    id: project.id,
    name: project.name,
    lastUpdated: project.lastUpdated,
    collaborators: project.collaborators.map(c => ({
      id: c.user.id,
      email: c.user.email,
      avatar: c.user.avatar,
      role: c.role,
    })),
    collaboratorCount: project.collaborators.length
  }));


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

export async function deleteResources(data: DeleteProject){
    const {id, ownerId, organizationsId} = data

    const existingOrg = await prisma.organizations.findUnique({where : {id : organizationsId}})

   if(!existingOrg) throw new Error("organizations not found")

   if(existingOrg.ownerId !== ownerId){
    throw new Error("You dont have Authorize")
   }

   const projects = await prisma.projects.delete({
    where : {id},
   })

   return projects
}
