/*
  Warnings:

  - A unique constraint covering the columns `[contentEntryId,contentFieldId]` on the table `ContentValues` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ContentValues_contentEntryId_contentFieldId_key" ON "ContentValues"("contentEntryId", "contentFieldId");
