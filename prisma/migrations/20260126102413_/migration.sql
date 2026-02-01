/*
  Warnings:

  - You are about to drop the column `role` on the `Collaborators` table. All the data in the column will be lost.
  - Added the required column `roleId` to the `Collaborators` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Collaborators" DROP COLUMN "role",
ADD COLUMN     "roleId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Collaborators" ADD CONSTRAINT "Collaborators_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
