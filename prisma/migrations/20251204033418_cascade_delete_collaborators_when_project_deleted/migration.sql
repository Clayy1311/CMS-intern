-- DropForeignKey
ALTER TABLE "public"."Collaborators" DROP CONSTRAINT "Collaborators_projectId_fkey";

-- AddForeignKey
ALTER TABLE "Collaborators" ADD CONSTRAINT "Collaborators_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
