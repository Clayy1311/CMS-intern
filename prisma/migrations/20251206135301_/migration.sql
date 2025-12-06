-- DropForeignKey
ALTER TABLE "public"."Projects" DROP CONSTRAINT "Projects_organizationId_fkey";

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
