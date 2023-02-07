-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Vote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "linkId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Vote_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Vote" ("id", "linkId", "userId") SELECT "id", "linkId", "userId" FROM "Vote";
DROP TABLE "Vote";
ALTER TABLE "new_Vote" RENAME TO "Vote";
CREATE UNIQUE INDEX "Vote_linkId_userId_key" ON "Vote"("linkId", "userId");
CREATE TABLE "new_Link" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "postedById" INTEGER,
    CONSTRAINT "Link_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Link" ("createdAt", "description", "id", "postedById", "url") SELECT "createdAt", "description", "id", "postedById", "url" FROM "Link";
DROP TABLE "Link";
ALTER TABLE "new_Link" RENAME TO "Link";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
