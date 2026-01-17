/*
  Warnings:

  - The `status` column on the `ContentEntries` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('DRAFT', 'IN_REVIEW', 'APPROVED', 'PUBLISHED', 'REJECTED');

-- AlterTable
ALTER TABLE "ContentEntries" ADD COLUMN     "approvedById" INTEGER,
ADD COLUMN     "reviewerId" INTEGER,
DROP COLUMN "status",
ADD COLUMN     "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "roleId" INTEGER;

-- CreateTable
CREATE TABLE "Roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "permission" JSONB,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkflowLogs" (
    "id" SERIAL NOT NULL,
    "entryId" INTEGER NOT NULL,
    "fromStatus" "ContentStatus" NOT NULL,
    "toStatus" "ContentStatus" NOT NULL,
    "changedBy" INTEGER NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkflowLogs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Roles_name_key" ON "Roles"("name");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentEntries" ADD CONSTRAINT "ContentEntries_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentEntries" ADD CONSTRAINT "ContentEntries_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowLogs" ADD CONSTRAINT "WorkflowLogs_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "ContentEntries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkflowLogs" ADD CONSTRAINT "WorkflowLogs_changedBy_fkey" FOREIGN KEY ("changedBy") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
