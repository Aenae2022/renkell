/*
  Warnings:

  - Made the column `schoolCity` on table `School` required. This step will fail if there are existing NULL values in that column.
  - Made the column `schoolCp` on table `School` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "School" ALTER COLUMN "schoolCity" SET NOT NULL,
ALTER COLUMN "schoolCp" SET NOT NULL;
