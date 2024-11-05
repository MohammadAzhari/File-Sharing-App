/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `File` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "tag" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "File_name_key" ON "File"("name");
