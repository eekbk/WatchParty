/*
  Warnings:

  - You are about to drop the `Usr` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Usr";

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "user_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "follows" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Relation" (
    "relation_id" SERIAL NOT NULL,
    "related_id" INTEGER NOT NULL,

    CONSTRAINT "Relation_pkey" PRIMARY KEY ("relation_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
