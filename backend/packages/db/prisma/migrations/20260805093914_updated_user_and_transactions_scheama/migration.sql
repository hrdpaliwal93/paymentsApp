/*
  Warnings:

  - You are about to drop the column `Method` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `receiverid` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderid` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "transactionStatus" AS ENUM ('fail', 'success');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('food', 'bills', 'personal', 'misc');

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "Method",
DROP COLUMN "category",
DROP COLUMN "userId",
ADD COLUMN     "reason" TEXT,
ADD COLUMN     "receiverid" TEXT NOT NULL,
ADD COLUMN     "senderid" TEXT NOT NULL,
ADD COLUMN     "status" "transactionStatus" NOT NULL,
ADD COLUMN     "type" "Category" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_senderid_fkey" FOREIGN KEY ("senderid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_receiverid_fkey" FOREIGN KEY ("receiverid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
