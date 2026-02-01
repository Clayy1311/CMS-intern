import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const roles = [
    { name: "super_admin", scope: "global", description: "SaaS System Admin" },

    { name: "org_owner", scope: "project", description: "Organization Owner" },
    { name: "editor", scope: "project" },
    { name: "writer", scope: "project" },
    { name: "reviewer", scope: "project" },
    { name: "approver", scope: "project" },
    { name: "viewer", scope: "project" }
  ];

  for (const role of roles) {
    await prisma.roles.upsert({
      where: { name: role.name },
      update: {},
      create: role
    });
  }

  console.log("Roles seeded successfully");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
