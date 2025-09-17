-- AlterTable
ALTER TABLE "public"."Users" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verifytoken" TEXT;
