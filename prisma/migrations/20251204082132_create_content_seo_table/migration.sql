-- CreateTable
CREATE TABLE "ContentSEO" (
    "id" SERIAL NOT NULL,
    "contentEntryId" INTEGER NOT NULL,
    "seoTitle" TEXT,
    "metaDesc" TEXT,
    "keywords" TEXT,
    "ogImage" TEXT,
    "twitterImage" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContentSEO_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContentSEO_contentEntryId_key" ON "ContentSEO"("contentEntryId");

-- AddForeignKey
ALTER TABLE "ContentSEO" ADD CONSTRAINT "ContentSEO_contentEntryId_fkey" FOREIGN KEY ("contentEntryId") REFERENCES "ContentEntries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
