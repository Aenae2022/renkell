/*
  Warnings:

  - A unique constraint covering the columns `[groupId,userId]` on the table `ExerciseAccess` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `ExerciseAccess` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ExerciseAccess_groupId_key";

-- AlterTable
ALTER TABLE "ExerciseAccess" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ExerciseAccess_groupId_userId_key" ON "ExerciseAccess"("groupId", "userId");

-- AddForeignKey
ALTER TABLE "ExerciseAccess" ADD CONSTRAINT "ExerciseAccess_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
