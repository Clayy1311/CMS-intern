-- AlterTable
ALTER TABLE "ContentModels" ADD CONSTRAINT "ContentModels_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "ContentFields" (
    "id" SERIAL NOT NULL,
    "contentModelId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "unique" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "validation" JSONB,
    "relationType" TEXT,
    "relationContentModelId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContentFields_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ContentFields" ADD CONSTRAINT "ContentFields_contentModelId_fkey" FOREIGN KEY ("contentModelId") REFERENCES "ContentModels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentFields" ADD CONSTRAINT "ContentFields_relationContentModelId_fkey" FOREIGN KEY ("relationContentModelId") REFERENCES "ContentModels"("id") ON DELETE SET NULL ON UPDATE CASCADE;
