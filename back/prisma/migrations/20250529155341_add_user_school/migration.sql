-- AlterTable
ALTER TABLE "User" ADD COLUMN     "schoolId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("schoolId") ON DELETE SET NULL ON UPDATE CASCADE;
