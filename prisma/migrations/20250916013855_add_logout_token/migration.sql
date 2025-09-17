-- CreateTable
CREATE TABLE "public"."LogoutToken" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogoutToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LogoutToken_token_key" ON "public"."LogoutToken"("token");
