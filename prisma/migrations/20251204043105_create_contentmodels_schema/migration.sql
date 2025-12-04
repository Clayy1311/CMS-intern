-- AlterTable
ALTER TABLE "PersonalProjects" ALTER COLUMN "lastUpdated" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Projects" ALTER COLUMN "lastUpdated" DROP DEFAULT;

-- CreateTable
CREATE TABLE "ContentModels" (
    "id" SERIAL NOT NULL,
    "projectOrgId" INTEGER,
    "projectPersonalId" INTEGER,
    "projectType" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ContentModels_apiKey_key" ON "ContentModels"("apiKey");

-- AddForeignKey
ALTER TABLE "ContentModels" ADD CONSTRAINT "ContentModels_projectOrgId_fkey" FOREIGN KEY ("projectOrgId") REFERENCES "Projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentModels" ADD CONSTRAINT "ContentModels_projectPersonalId_fkey" FOREIGN KEY ("projectPersonalId") REFERENCES "PersonalProjects"("id") ON DELETE SET NULL ON UPDATE CASCADE;
