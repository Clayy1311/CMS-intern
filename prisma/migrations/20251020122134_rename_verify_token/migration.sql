/*
  Warnings:

  - You are about to drop the column `verifytoken` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Users" DROP COLUMN "verifytoken",
ADD COLUMN     "verifyToken" TEXT;
