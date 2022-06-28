-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Menu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "value" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL DEFAULT '',
    "type" TEXT NOT NULL DEFAULT 'folder',
    "pid" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Menu" ("createdAt", "id", "name", "pid", "type", "updatedAt", "value") SELECT "createdAt", "id", "name", "pid", "type", "updatedAt", "value" FROM "Menu";
DROP TABLE "Menu";
ALTER TABLE "new_Menu" RENAME TO "Menu";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
