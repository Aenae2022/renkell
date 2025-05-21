/*
  Warnings:

  - A unique constraint covering the columns `[classroomRef]` on the table `Classroom` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[classroomRef,schoolId]` on the table `Classroom` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[schoolRef]` on the table `School` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Classroom" ADD COLUMN     "classroomRef" TEXT;

-- AlterTable
ALTER TABLE "School" ADD COLUMN     "schoolRef" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Classroom_classroomRef_key" ON "Classroom"("classroomRef");

-- CreateIndex
CREATE UNIQUE INDEX "Classroom_classroomRef_schoolId_key" ON "Classroom"("classroomRef", "schoolId");

-- CreateIndex
CREATE UNIQUE INDEX "School_schoolRef_key" ON "School"("schoolRef");
