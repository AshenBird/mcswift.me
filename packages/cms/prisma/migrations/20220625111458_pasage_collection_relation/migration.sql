-- CreateTable
CREATE TABLE "_CollectionToPassage" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CollectionToPassage_A_fkey" FOREIGN KEY ("A") REFERENCES "Collection" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CollectionToPassage_B_fkey" FOREIGN KEY ("B") REFERENCES "Passage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_CollectionToPassage_AB_unique" ON "_CollectionToPassage"("A", "B");

-- CreateIndex
CREATE INDEX "_CollectionToPassage_B_index" ON "_CollectionToPassage"("B");
