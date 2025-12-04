-- CreateTable
CREATE TABLE "ContentValues" (
    "id" SERIAL NOT NULL,
    "contentEntryId" INTEGER NOT NULL,
    "contentFieldId" INTEGER NOT NULL,
    "valueText" TEXT,
    "valueNumber" DOUBLE PRECISION,
    "valueBool" BOOLEAN,
    "valueDate" JSONB,
    "valueRefId" INTEGER,

    CONSTRAINT "ContentValues_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ContentValues" ADD CONSTRAINT "ContentValues_contentEntryId_fkey" FOREIGN KEY ("contentEntryId") REFERENCES "ContentEntries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentValues" ADD CONSTRAINT "ContentValues_contentFieldId_fkey" FOREIGN KEY ("contentFieldId") REFERENCES "ContentFields"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
