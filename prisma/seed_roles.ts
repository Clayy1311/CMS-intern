import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.roles.upsert({
    where: { name: "super_admin" },
    update: {},
    create: { name: "super_admin", description: "SaaS System Admin" }
  });

  await prisma.roles.upsert({
    where: { name: "org_owner" },
    update: {},
    create: { name: "org_owner", description: "Organization Owner" }
  });

  await prisma.roles.upsert({
    where: { name: "editor" },
    update: {},
    create: { name: "editor" }
  });

  await prisma.roles.upsert({
    where: { name: "writer" },
    update: {},
    create: { name: "writer" }
  });

  await prisma.roles.upsert({
    where: { name: "reviewer" },
    update: {},
    create: { name: "reviewer" }
  });

  console.log(" Roles seeded");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
