import prisma from "../db/index"
import { GetAllOrganizations, Organizations, UpdateOrganizations, DeleteOrganizations} from "../types/organizations"
import { AllUser } from "../types/auth.types";



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


export async function findResources(userId: number) {
  const organizations =  await prisma.organizations.findMany({
    where: {
      OR: [
        { ownerId: userId },
        {
          projects: {
            some: {
              collaborators: { some: { userId } }
            }
          }
        }
      ]
    },
   include: {
    owner: true,
    projects: {
        include: {
            collaborators: {
                include: {
                    user: true,
                    role: true
                }
            }
        }
    }
   }
  });

  return organizations.map(org => {
  const isOwner = org.ownerId === userId;


  let userRole = "viewer"; 

  if (!isOwner) {
    const collab = org.projects
      .flatMap(p => p.collaborators)
      .find(c => c.userId === userId);

    if (collab) {
      userRole = collab.role.name;
    }
  } else {
    userRole = "org_owner";
  }

  const collaborators = org.projects.flatMap(p =>
    p.collaborators.map(c => ({
      id: c.user.id,
      email: c.user.email,
      avatar: c.user.avatar,
      role: c.role.name
    }))
  );

  return {
    id: org.id,
    name: org.name,
    role: userRole,
    collaborators,
    collaboratorCount: collaborators.length
  };
});
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


