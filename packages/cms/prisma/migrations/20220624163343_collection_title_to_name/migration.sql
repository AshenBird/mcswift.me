/*
  Warnings:

  - You are about to drop the column `title` on the `Collection` table. All the data in the column will be lost.
  - Added the required column `name` to the `Collection` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Collection" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "pid" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Collection" ("createdAt", "id", "pid", "updatedAt") SELECT "createdAt", "id", "pid", "updatedAt" FROM "Collection";
DROP TABLE "Collection";
ALTER TABLE "new_Collection" RENAME TO "Collection";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
