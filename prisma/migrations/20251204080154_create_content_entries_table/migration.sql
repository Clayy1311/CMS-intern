-- CreateTable
CREATE TABLE "ContentEntries" (
    "id" SERIAL NOT NULL,
    "contentModelId" INTEGER NOT NULL,
    "projectOrgId" INTEGER,
    "projectPersonalId" INTEGER,
    "projectType" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "slug" TEXT,
    "createdBy" INTEGER NOT NULL,
    "updatedBy" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContentEntries_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ContentEntries" ADD CONSTRAINT "ContentEntries_contentModelId_fkey" FOREIGN KEY ("contentModelId") REFERENCES "ContentModels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentEntries" ADD CONSTRAINT "ContentEntries_projectOrgId_fkey" FOREIGN KEY ("projectOrgId") REFERENCES "Projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentEntries" ADD CONSTRAINT "ContentEntries_projectPersonalId_fkey" FOREIGN KEY ("projectPersonalId") REFERENCES "PersonalProjects"("id") ON DELETE SET NULL ON UPDATE CASCADE;
