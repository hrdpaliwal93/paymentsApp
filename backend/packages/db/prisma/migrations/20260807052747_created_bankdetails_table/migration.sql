/*
  Warnings:

  - You are about to drop the column `balance` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "balance",
ADD COLUMN     "walletBalance" DECIMAL(65,30) NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "BankDetails" (
    "accountNumber" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 10000,

    CONSTRAINT "BankDetails_pkey" PRIMARY KEY ("accountNumber")
);
