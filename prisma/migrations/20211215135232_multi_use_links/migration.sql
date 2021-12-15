/*
  Warnings:

  - You are about to drop the column `used` on the `InviteLinks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "InviteLinks" DROP COLUMN "used",
ADD COLUMN     "remaining" INTEGER NOT NULL DEFAULT 1;
