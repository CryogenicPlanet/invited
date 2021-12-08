/*
  Warnings:

  - A unique constraint covering the columns `[domain]` on the table `Whitelist` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Whitelist" ADD COLUMN     "domain" TEXT,
ALTER COLUMN "email" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Whitelist_domain_key" ON "Whitelist"("domain");
