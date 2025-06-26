/*
  Warnings:

  - You are about to drop the column `groupId` on the `Periodlibrary` table. All the data in the column will be lost.
  - Added the required column `groupIdProp` to the `Periodlibrary` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Periodlibrary" DROP CONSTRAINT "Periodlibrary_groupId_fkey";

-- AlterTable
ALTER TABLE "Periodlibrary" DROP COLUMN "groupId",
ADD COLUMN     "groupIdProp" INTEGER NOT NULL;
