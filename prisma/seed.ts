//Buat Test Dummy Data


import prisma from "../src/db/index"
import bcrypt from  "bcrypt";

// async function main(){
//     //buat dummy user
   
//     const hashedPassword =   await bcrypt.hash("hawimaru123", 10)
   
//     const user = await prisma.users.create({

        
//         data: {
//             fullName : "Hawimaru",
//             email  : "hawimaru@example.com",
//             password : hashedPassword,
//             job : "Developer",
//             country : "Indonesia",
//             isVerified : true,
//             company : "Hawimaru Corp"
//                 }

//     })
       
//     //Buat Dummy Data di tabel Organizations
//     const organizations = await prisma.organizations.create({
//         data : {
//             name : "CMS Development Team",
//             ownerId: user.id
//         }
//     })
//     //Buat Dummy Data di tabel Projects
//     const projects = await prisma.projects.create({
//         data : {
//             name : "Internal CMS Platform",
//             organizationId: organizations.id,
//             status: "Progress"
//         }
//     })

//     await prisma.collaborators.create({
//         data : {
//             projectId: projects.id,
//             userId: user.id,
//             role : "owner",
//             status: "active"
//         }
//     })

//     console.log("Seeding Done")

// }


// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

async function main() {
  await prisma.plans.createMany({
    data: [
      {
        code: "free",
        name: "Free / Demo",
        description: "Suitable for individuals to demo and explore CMS",
        price: 0,
        interval: "month",

        maxUsers: 1,
        maxPersonalProjects: 5,
        maxApiCallsPerMonth: 500_000,
        maxMediaAssets: 100,

        seoEnabled: true,
        aiEnabled: false,
        customDomain: false,
      },
      {
        code: "pro",
        name: "Professional",
        description: "Ideal for growing teams with full access",
        price: 155,
        interval: "month",

        maxUsers: 10,
        maxPersonalProjects: 50,
        maxOrganizations: 10,
        maxProjectsPerOrg: 20,
        maxApiCallsPerMonth: 5_000_000,
        maxMediaAssets: 50_000,

        seoEnabled: true,
        aiEnabled: true,
        customDomain: true,
      },
      {
        code: "enterprise",
        name: "Enterprise",
        description: "For companies needing scalability and collaboration",
        price: 200,
        interval: "month",

        maxUsers: 50,
        maxPersonalProjects: null, // unlimited
        maxOrganizations: 50,
        maxProjectsPerOrg: 100,
        maxApiCallsPerMonth: 10_000_000,
        maxMediaAssets: null, // unlimited

        seoEnabled: true,
        aiEnabled: true,
        customDomain: true,
      },
    ],
  });

  console.log(" Plans seeded");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());