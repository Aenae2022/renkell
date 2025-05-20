/*
  Warnings:

  - You are about to drop the column `classroomName` on the `Classroom` table. All the data in the column will be lost.
  - You are about to drop the `ClassroomLink` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[groupId]` on the table `Classroom` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ClassroomLink" DROP CONSTRAINT "ClassroomLink_classroomId_fkey";

-- DropForeignKey
ALTER TABLE "ClassroomLink" DROP CONSTRAINT "ClassroomLink_linkId_fkey";

-- AlterTable
ALTER TABLE "Classroom" DROP COLUMN "classroomName",
ADD COLUMN     "groupId" INTEGER;

-- DropTable
DROP TABLE "ClassroomLink";

-- CreateIndex
CREATE UNIQUE INDEX "Classroom_groupId_key" ON "Classroom"("groupId");

-- AddForeignKey
ALTER TABLE "Classroom" ADD CONSTRAINT "Classroom_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("groupId") ON DELETE SET NULL ON UPDATE CASCADE;
