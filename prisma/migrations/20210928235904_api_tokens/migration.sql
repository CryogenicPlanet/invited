/*
  Warnings:

  - A unique constraint covering the columns `[apiToken]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `apiToken` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InviteLinks" ADD COLUMN     "used" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "apiToken" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Project_apiToken_key" ON "Project"("apiToken");
