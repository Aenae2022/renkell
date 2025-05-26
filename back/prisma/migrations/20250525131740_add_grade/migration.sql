-- AlterTable
ALTER TABLE "User" ADD COLUMN     "gradeId" INTEGER;

-- CreateTable
CREATE TABLE "Grade" (
    "gradeId" SERIAL NOT NULL,
    "gradeName" VARCHAR(50) NOT NULL,

    CONSTRAINT "Grade_pkey" PRIMARY KEY ("gradeId")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_gradeId_fkey" FOREIGN KEY ("gradeId") REFERENCES "Grade"("gradeId") ON DELETE SET NULL ON UPDATE CASCADE;
