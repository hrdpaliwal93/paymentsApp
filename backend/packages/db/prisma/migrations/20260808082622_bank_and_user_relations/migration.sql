/*
  Warnings:

  - You are about to drop the column `name` on the `BankDetails` table. All the data in the column will be lost.
  - Added the required column `bankname` to the `BankDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userID` to the `BankDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BankDetails" DROP COLUMN "name",
ADD COLUMN     "bankname" TEXT NOT NULL,
ADD COLUMN     "userID" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "BankDetails" ADD CONSTRAINT "BankDetails_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
