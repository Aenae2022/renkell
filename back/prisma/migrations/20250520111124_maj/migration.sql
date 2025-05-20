/*
  Warnings:

  - Made the column `classroomName` on table `Classroom` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Classroom" ALTER COLUMN "classroomName" SET NOT NULL;
