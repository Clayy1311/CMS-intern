import prisma from "../db/index"
import { GetAllOrganizations, Organizations, UpdateOrganizations, DeleteOrganizations} from "../types/organizations"



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
      projects: {
            select: {
                name: true, 
                collaborators: {
                    select: {
                        id: true,
                        role: true,
                        status: true,
                        user: {
                            select: {
                                id: true,
                                email: true,
                                avatar: true
                            }
                        }
                    }
                }
            }
        }
    }
});

     return organizations
}


export async function updateResources(data: UpdateOrganizations){
      
    const {id, name, ownerId} = data
     
    const existingOrg = await prisma.organizations.findUnique({ where: { id } });
    if(!existingOrg) throw new Error("Organizations Not Found");

    if(existingOrg.ownerId !== ownerId) {
        throw new Error("You are not authorized to update this organization");
    }
    const organizations = await prisma.organizations.update({
        where : {id},
        data: { name },
        select: {id: true, name: true, ownerId: true, updatedAt:true}

    })

    return organizations
    
}


export async function deleteResources(data: DeleteOrganizations){

    const {id, ownerId} = data
     
    const existingOrg = await prisma.organizations.findUnique({  where: { id },
    select: { id: true, ownerId: true },})

    if(!existingOrg) throw new Error("Organizations Not Found")
    if(existingOrg.ownerId !== ownerId){
         throw new Error("You are not authorized to update this organization");
    }
    const organizations = await prisma.organizations.delete({
        where: {id},
    })

    return organizations
}


