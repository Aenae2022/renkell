/*
  Warnings:

  - A unique constraint covering the columns `[schoolName,schoolCp,schoolCity]` on the table `School` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "School" ADD COLUMN     "schoolCity" TEXT,
ADD COLUMN     "schoolCp" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "School_schoolName_schoolCp_schoolCity_key" ON "School"("schoolName", "schoolCp", "schoolCity");
