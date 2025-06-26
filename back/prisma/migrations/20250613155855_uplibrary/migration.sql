/*
  Warnings:

  - You are about to drop the column `groupIdProp` on the `Periodlibrary` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Periodlibrary" DROP COLUMN "groupIdProp",
ADD COLUMN     "groupId" INTEGER;

-- AddForeignKey
ALTER TABLE "Periodlibrary" ADD CONSTRAINT "Periodlibrary_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("groupId") ON DELETE SET NULL ON UPDATE CASCADE;
