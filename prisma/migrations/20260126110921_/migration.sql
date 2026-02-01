/*
  Warnings:

  - You are about to drop the column `permission` on the `Roles` table. All the data in the column will be lost.
  - Added the required column `scope` to the `Roles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Roles" DROP COLUMN "permission",
ADD COLUMN     "permissions" JSONB,
ADD COLUMN     "scope" TEXT NOT NULL;
