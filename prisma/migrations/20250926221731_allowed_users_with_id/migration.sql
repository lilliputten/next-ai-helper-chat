/*
  Warnings:

  - Added the required column `id` to the `allowed_users` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_allowed_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL DEFAULT 'EMAIL',
    "value" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_allowed_users" ("type", "value") SELECT "type", "value" FROM "allowed_users";
DROP TABLE "allowed_users";
ALTER TABLE "new_allowed_users" RENAME TO "allowed_users";
CREATE UNIQUE INDEX "allowed_users_type_value_key" ON "allowed_users"("type", "value");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
