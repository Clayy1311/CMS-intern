import prisma from "../db";



export async function getDashboardDataService(userId: number){

    const user = await prisma.users.findUnique({
        where : {id : userId}
    })

    if(!user) {
        throw new Error("User Not Found")
    }
    const organizationsCount = await prisma.organizations.count({
        where : {
            OR : [
                {ownerId : userId},
           {    projects : {
                some : {
                    collaborators : {some : {userId}}
                }
            }
        }

            ]
        },
    })


    const personalProjectsCount = await prisma.personalProjects.count({
        where : {
            ownerId : userId
        }
    })

    const projectCount = await prisma.projects.count({
        where : {
            OR : [
              {organization : {ownerId : userId}},
             { collaborators : {
                some : {userId}
            }  
        }
            ]
        
        }
    })

    const collaboratorCount = await prisma.collaborators.count({
        where : {
            OR : [
               {project : {organization : {ownerId : userId}}},
               {
                userId
               }
            ]
        }
    })

    return {
        organizationsCount,
        personalProjectsCount,
        projectCount,
        collaboratorCount
    }

}