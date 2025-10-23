import { connect } from "http2"
import prisma from "../db/index"
import { CreateProjects } from "../types/projects"

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