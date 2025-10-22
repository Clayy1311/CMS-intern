import prisma from "../db/index"
import { Organizations } from "../types/organizations"


export async function createResource(data : Organizations){

    const {name, ownerId} = data;
     
    
    
   const organizations =  await prisma.organizations.create({
          data : {
            name,
           owner: {
        connect: { id: ownerId }, 
      },
          }
    })
    return organizations

}