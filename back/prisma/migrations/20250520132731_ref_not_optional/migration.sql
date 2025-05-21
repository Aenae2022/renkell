/*
  Warnings:

  - Made the column `classroomRef` on table `Classroom` required. This step will fail if there are existing NULL values in that column.
  - Made the column `schoolRef` on table `School` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Classroom" ALTER COLUMN "classroomRef" SET NOT NULL;

-- AlterTable
ALTER TABLE "School" ALTER COLUMN "schoolRef" SET NOT NULL;
