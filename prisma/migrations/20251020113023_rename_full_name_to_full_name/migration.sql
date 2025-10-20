/*
  Warnings:

  - You are about to drop the column `full_name` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the `Column` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Model` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Record` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Column" DROP CONSTRAINT "Column_modelId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Model" DROP CONSTRAINT "Model_projectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Project" DROP CONSTRAINT "Project_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Record" DROP CONSTRAINT "Record_modelId_fkey";

-- AlterTable
ALTER TABLE "public"."Users" DROP COLUMN "full_name",
ADD COLUMN     "fullName" TEXT NOT NULL DEFAULT 'Unknown';

-- DropTable
DROP TABLE "public"."Column";

-- DropTable
DROP TABLE "public"."Model";

-- DropTable
DROP TABLE "public"."Project";

-- DropTable
DROP TABLE "public"."Record";
