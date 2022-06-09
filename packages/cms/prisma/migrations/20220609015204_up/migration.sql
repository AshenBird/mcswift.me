/*
  Warnings:

  - Added the required column `path` to the `Passage` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Passage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "publishedAt" DATETIME,
    "title" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "path" TEXT NOT NULL
);
INSERT INTO "new_Passage" ("createdAt", "id", "published", "publishedAt", "title", "updatedAt") SELECT "createdAt", "id", "published", "publishedAt", "title", "updatedAt" FROM "Passage";
DROP TABLE "Passage";
ALTER TABLE "new_Passage" RENAME TO "Passage";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
