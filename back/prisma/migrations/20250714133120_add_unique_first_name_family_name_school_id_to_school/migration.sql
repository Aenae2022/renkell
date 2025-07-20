/*
  Warnings:

  - A unique constraint covering the columns `[userFirstName,userFamilyName,schoolId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_userFirstName_userFamilyName_schoolId_key" ON "User"("userFirstName", "userFamilyName", "schoolId");
