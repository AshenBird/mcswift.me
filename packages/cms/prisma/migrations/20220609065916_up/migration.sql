/*
  Warnings:

  - A unique constraint covering the columns `[path]` on the table `Passage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Passage_path_key" ON "Passage"("path");
