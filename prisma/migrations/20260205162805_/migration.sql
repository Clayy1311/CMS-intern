/*
  Warnings:

  - Made the column `name` on table `Projects` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Projects" ALTER COLUMN "name" SET NOT NULL;
