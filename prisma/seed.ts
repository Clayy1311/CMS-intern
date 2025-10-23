//Buat Test Dummy Data


import prisma from "../src/db/index"
import bcrypt from  "bcrypt";

async function main(){
    //buat dummy user
   
    const hashedPassword =   await bcrypt.hash("hawimaru123", 10)
   
    const user = await prisma.users.create({

        
        data: {
            fullName : "Hawimaru",
            email  : "hawimaru@example.com",
            password : hashedPassword,
            job : "Developer",
            country : "Indonesia",
            isVerified : true,
            company : "Hawimaru Corp"
                }

    })
       
    //Buat Dummy Data di tabel Organizations
    const organizations = await prisma.organizations.create({
        data : {
            name : "CMS Development Team",
            ownerId: user.id
        }
    })
    //Buat Dummy Data di tabel Projects
    const projects = await prisma.projects.create({
        data : {
            name : "Internal CMS Platform",
            organizationId: organizations.id,
            status: "Progress"
        }
    })

    await prisma.collaborators.create({
        data : {
            projectId: projects.id,
            userId: user.id,
            role : "owner",
            status: "active"
        }
    })

    console.log("Seeding Done")

}


main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });