/*
  Warnings:

  - You are about to drop the column `apiKey` on the `ContentModels` table. All the data in the column will be lost.
  - You are about to drop the column `valueRefId` on the `ContentValues` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `ContentModels` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `type` on the `ContentFields` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `slug` to the `ContentModels` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FieldType" AS ENUM ('TEXT', 'RICHTEXT', 'NUMBER', 'BOOLEAN', 'DATE', 'IMAGE', 'RELATION', 'JSON');

-- DropIndex
DROP INDEX "public"."ContentModels_apiKey_key";

-- DropIndex
DROP INDEX "public"."ContentValues_contentEntryId_contentFieldId_key";

-- AlterTable
ALTER TABLE "ContentFields" ADD COLUMN     "isSystem" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "type",
ADD COLUMN     "type" "FieldType" NOT NULL;

-- AlterTable
ALTER TABLE "ContentModels" DROP COLUMN "apiKey",
ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ContentValues" DROP COLUMN "valueRefId";

-- CreateTable
CREATE TABLE "ContentRelations" (
    "id" SERIAL NOT NULL,
    "sourceEntryId" INTEGER NOT NULL,
    "targetEntryId" INTEGER NOT NULL,
    "contentFieldId" INTEGER NOT NULL,

    CONSTRAINT "ContentRelations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContentModels_slug_key" ON "ContentModels"("slug");

-- AddForeignKey
ALTER TABLE "ContentRelations" ADD CONSTRAINT "ContentRelations_sourceEntryId_fkey" FOREIGN KEY ("sourceEntryId") REFERENCES "ContentEntries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentRelations" ADD CONSTRAINT "ContentRelations_targetEntryId_fkey" FOREIGN KEY ("targetEntryId") REFERENCES "ContentEntries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentRelations" ADD CONSTRAINT "ContentRelations_contentFieldId_fkey" FOREIGN KEY ("contentFieldId") REFERENCES "ContentFields"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
