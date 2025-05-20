/*
  Warnings:

  - You are about to drop the `LinkClassroom` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `linkTitleFr` on table `Link` required. This step will fail if there are existing NULL values in that column.
  - Made the column `linkTitleBr` on table `Link` required. This step will fail if there are existing NULL values in that column.
  - Made the column `linkFullNameFr` on table `Link` required. This step will fail if there are existing NULL values in that column.
  - Made the column `linkFullNameBr` on table `Link` required. This step will fail if there are existing NULL values in that column.
  - Made the column `linkDescriptionFr` on table `Link` required. This step will fail if there are existing NULL values in that column.
  - Made the column `linkDescriptionBr` on table `Link` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "LinkClassroom" DROP CONSTRAINT "LinkClassroom_classroomId_fkey";

-- DropForeignKey
ALTER TABLE "LinkClassroom" DROP CONSTRAINT "LinkClassroom_linkId_fkey";

-- AlterTable
ALTER TABLE "Classroom" ADD COLUMN     "classroomName" VARCHAR(50);

-- AlterTable
ALTER TABLE "Link" ALTER COLUMN "linkTitleFr" SET NOT NULL,
ALTER COLUMN "linkTitleBr" SET NOT NULL,
ALTER COLUMN "linkFullNameFr" SET NOT NULL,
ALTER COLUMN "linkFullNameBr" SET NOT NULL,
ALTER COLUMN "linkDescriptionFr" SET NOT NULL,
ALTER COLUMN "linkDescriptionBr" SET NOT NULL;

-- DropTable
DROP TABLE "LinkClassroom";

-- CreateTable
CREATE TABLE "Group" (
    "groupId" SERIAL NOT NULL,
    "groupName" VARCHAR(255) NOT NULL,
    "groupLanguage" VARCHAR(50) NOT NULL,
    "principal" BOOLEAN NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("groupId")
);

-- CreateTable
CREATE TABLE "GroupLink" (
    "groupId" INTEGER NOT NULL,
    "linkId" INTEGER NOT NULL,

    CONSTRAINT "GroupLink_pkey" PRIMARY KEY ("groupId","linkId")
);

-- CreateTable
CREATE TABLE "ClassroomLink" (
    "classroomId" INTEGER NOT NULL,
    "linkId" INTEGER NOT NULL,

    CONSTRAINT "ClassroomLink_pkey" PRIMARY KEY ("classroomId","linkId")
);

-- AddForeignKey
ALTER TABLE "GroupLink" ADD CONSTRAINT "GroupLink_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("groupId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupLink" ADD CONSTRAINT "GroupLink_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link"("linkId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassroomLink" ADD CONSTRAINT "ClassroomLink_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom"("classroomId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassroomLink" ADD CONSTRAINT "ClassroomLink_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link"("linkId") ON DELETE CASCADE ON UPDATE CASCADE;
