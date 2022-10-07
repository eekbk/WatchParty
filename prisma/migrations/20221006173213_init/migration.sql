/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[googleId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `googleId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User_Party` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Party" ALTER COLUMN "likes_count" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
ADD COLUMN     "googleId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User_Party" ADD COLUMN     "role" "Role" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");
