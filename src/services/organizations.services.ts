import prisma from "../db/index"
import { GetAllOrganizations, Organizations, UpdateOrganizations} from "../types/organizations"


export async function createResource(data : Organizations){

    const {name, ownerId} = data;
     
    
    
   const organizations =  await prisma.organizations.create({
          data : {
            name,
           owner: {connect: { id: ownerId }, 
      },
          }
    })
    return organizations

}


export async function findResources(data: GetAllOrganizations ){
     const {ownerId} = data;
      
     const organizations = await prisma.organizations.findMany({
       where : {ownerId},
       select : {
        id : true,
        name: true,
        projects: {select: {collaborators: {select : {id : true, role: true, status:true,
            user : {
                select : {
                    id: true,
                    email: true,
                    avatar: true
                }
            }
        }}}}
       }
     })

     return organizations
}


export async function updateResources(data: UpdateOrganizations){
      
    const {id, name, ownerId} = data

    const organizations = await prisma.organizations.update({
        where : {id},
        data: {
            ownerId,
            name
        }

    })

    return organizations
    
}